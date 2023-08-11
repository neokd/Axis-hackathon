import { useEffect, useState } from 'react'
import Form from '../Form/Form'
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Upload from "./Upload"

function CreateProfile() {
    const [data, setData] = useState([])

    const fetchProfile = async () => {
        const user_id = localStorage.getItem("user_id")
        const response = await fetch("/api/userautofill", {
            method: "GET",
            headers: {
                "X-User-ID": user_id,
                'content-type': 'application/json'
            },
        })
        const data = await response.json()
        setData(data)
    }

    useEffect(() => {
        fetchProfile()
    },[])

    return (
        <div className='flex '>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <Navbar />
                <div className="text-xl bg-white/90 dark:bg-neutral-900 duration-300 min-h-screen  font-semibold p-4 ">
                    <h1 className="text-3xl dark:text-white mx-8 mt-4 font-semibold">Welcome User </h1>
                    <div className="flex justify-center">
                        <Upload className="mt-12" />
                    </div>
                    {data.length !== 0 && <Form data={data} /> }
                </div>
            </div>
        </div>
    )
}

export default CreateProfile
