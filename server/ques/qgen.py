from nltk import FreqDist
from nltk.corpus import stopwords
from nltk.corpus import brown
import numpy as np
import pandas as pd
import nltk
import requests
import string
import random
import spacy
from sense2vec import Sense2Vec
import os
import json
import time
import torch
from transformers import T5ForConditionalGeneration,T5Tokenizer
import zipfile
from nltk.tokenize import sent_tokenize

from similari
from mcq import tokenize_sentences,get_keywords,get_sentences_for_keyword,generate_questions_mcq,generate_normal_questions

try: 
    nltk.download('brown')
    nltk.download('stopwords')
    nltk.download('popular')
except:
    print("===== ERROR OCCURED =====")
finally:
    print("===== NLTK DOWNLOADED =====")


class QGen:
    def __init__(self):
        self.tokenizer = T5Tokenizer.from_pretrained('flan-t5-base')
        model = T5ForConditionalGeneration.from_pretrained('Parth/result')
        if torch.cuda.is_available():
            device = torch.device('cuda')
        elif torch.device('cpu'):
            device = torch.device('cpu')
        elif torch.backends.mps.is_available():
            device = torch.device('mps')
        model.to(device)
        self.device = device
        self.model = model
        try:
            self.nlp = spacy.load('en_core_web_trf')
        except:
            os.system('python -m spacy download en_core_web_trf')
            self.nlp = spacy.load('en_core_web_trf')
        try:
            self.s2v = Sense2Vec().from_disk('s2v_reddit_2019_lg')
        except:
            os.system('wget https://github.com/explosion/sense2vec/releases/download/v1.0.0/s2v_reddit_2019_lg.tar.gz.001')
            
        self.fdist = FreqDist(brown.words())
        self.normalized_levenshtein = normalized_levenshtein()
        self.set_seed(42)

    def set_seed(self,seed):
        np.random.seed(seed)
        torch.manual_seed(seed)
        if torch.cuda.is_available():
            torch.cuda.manual_seed_all(seed)


    def predict_mcq(self, payload):
        start = time.time()
        inp = {
            "input_text": payload.get("input_text"),
            "max_questions": payload.get("max_questions", 10)
        }

        text = inp['input_text']
        sentences = tokenize_sentences(text)
        joiner = " "
        modified_text = joiner.join(sentences)


        keywords = get_keywords(self.nlp,modified_text,inp['max_questions'],self.s2v,self.fdist,self.normalized_levenshtein,len(sentences) )


        keyword_sentence_mapping = get_sentences_for_keyword(keywords, sentences)

        for k in keyword_sentence_mapping.keys():
            text_snippet = " ".join(keyword_sentence_mapping[k][:3])
            keyword_sentence_mapping[k] = text_snippet

   
        final_output = {}

        if len(keyword_sentence_mapping.keys()) == 0:
            return final_output
        else:
            try:
                generated_questions = generate_questions_mcq(keyword_sentence_mapping,self.device,self.tokenizer,self.model,self.s2v,self.normalized_levenshtein)

            except:
                return final_output
            end = time.time()

            final_output["statement"] = modified_text
            final_output["questions"] = generated_questions["questions"]
            final_output["time_taken"] = end-start
            
            if torch.device=='cuda':
                torch.cuda.empty_cache()
                
            return final_output


if __name__ == '__main__':
    qgen = QGen()
    payload = {
            "input_text": "Sachin Ramesh Tendulkar is a former international cricketer from India and a former captain of the Indian national team. He is widely regarded as one of the greatest batsmen in the history of cricket. He is the highest run scorer of all time in International cricket."
        }
    print(qgen.predict_mcq(payload))
