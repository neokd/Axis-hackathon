import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Highlighter from 'react-highlight-words';

function Searchbar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='w-full flex flex-row relative'>
            <FiSearch className='absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none w-11 h-11 p-3 dark:text-white/60 ' />
            <input
                type="text"
                className="bg-slate-200 dark:bg-neutral-800 border border-slate-800 outline-1  dark:outline-slate-800  focus:outline-sky-600 dark:focus:outline-sky-600 p-2 w-1/2 rounded-xl dark:text-white pl-8"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="mt-2">
                {searchTerm && (
                    <div className="bg-white dark:bg-neutral-900 border border-slate-800 rounded-md p-2">
                        <Highlighter
                            searchWords={[searchTerm]}
                            autoEscape={true}
                            textToHighlight="Your content here with matching search term."
                            highlightStyle={{
                                backgroundColor: 'yellow',
                                padding: '0.3rem',
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Searchbar;
