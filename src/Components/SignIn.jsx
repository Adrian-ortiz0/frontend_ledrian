import React from 'react'
import { useNavigate } from 'react-router';

export const SignIn = () => {

    const navigate = useNavigate();
    return (
        <div className='bg-gradient-to-r from-black via-gray-900 to-black bg-[length:200%_200%] h-screen flex justify-center items-center'>
            <aside className='bg-gradient-to-b from-gray-900 via-gray-800 to-gray-600 animate-gradient w-1/2 bg-blue-500 flex justify-center items-center h-screen border border-black/10'>
                <div>
                    <h1 className='text-white text-4xl'>Ledrian</h1>
                </div>
            </aside>
            <main className='w-1/2 flex justify-around items-center h-screen flex-col bg-white'>
                <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-6">
                    Sign in
                </h2>

                <form className='sign_form w-full flex flex-col items-center gap-5'>
                    <div className='flex gap-5 w-4/5'>
                        <input type="text" placeholder="name" className="border border-gray-300 p-2 rounded-lg w-1/2" />
                        <input type="text" placeholder="lastname" className="border border-gray-300 p-2 rounded-lg w-1/2" />
                    </div>
                    <input type="email" placeholder="email" className="border border-gray-300 p-2 rounded-lg w-4/5" />
                    <input type="text" placeholder="username" className="border border-gray-300 p-2 rounded-lg w-4/5" />
                    <input type="password" placeholder="password" className="border border-gray-300 p-2 rounded-lg w-4/5" />
                    <input type="password" placeholder="repeatPassword" className="border border-gray-300 p-2 rounded-lg w-4/5" />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-4/5">Login</button>
                </form>

                <p className="mt-4">Do you already have an account? <a href="#" className="text-blue-500 hover:underline" onClick={() => navigate("../login")}>Go login</a></p>
            </main>
        </div>
    )
}
