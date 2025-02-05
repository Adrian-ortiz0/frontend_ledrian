import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import AxiosConfiguration from '../AxiosConfiguration';

export const SignIn = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: "",
        username: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.repeatPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        
        const usuario = {
            name: formData.name,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password,
            username: formData.username,
        };

        AxiosConfiguration
            .post("/register", usuario)
            .then((response) => {
                console.log("Usuario creado:", response.data);
                alert("Usuario creado con éxito!");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error al registrar usuario:", error.response?.data || error.message);
                alert("Error al registrar usuario. Inténtalo nuevamente.");
            });
    };

    return (
        <div className='bg-gradient-to-r from-black via-gray-900 to-black bg-[length:200%_200%] h-screen flex justify-center items-center'>
            <aside className=' hidden md:flex bg-gradient-to-b from-gray-900 via-gray-800 to-gray-600 animate-gradient w-1/2 justify-center items-center h-screen border border-black/10'>
                <h1 className='text-white text-4xl'>Ledrian</h1>
            </aside>
            <main className='w-screen md:w-1/2 flex justify-around items-center h-screen flex-col bg-white'>
                <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-6">
                    Sign in
                </h2>

                <form className='sign_form w-full flex flex-col items-center gap-5' onSubmit={handleSubmit}>
                    <div className='flex gap-5 w-4/5'>
                        <input name='name' type="text" placeholder="Name" className="border border-gray-300 p-2 rounded-lg w-1/2" value={formData.name} onChange={handleChange} required />
                        <input name='lastname' type="text" placeholder="Lastname" className="border border-gray-300 p-2 rounded-lg w-1/2" value={formData.lastname} onChange={handleChange} required />
                    </div>
                    <input name='email' type="email" placeholder="Email" className="border border-gray-300 p-2 rounded-lg w-4/5" value={formData.email} onChange={handleChange} required />
                    <input name='username' type="text" placeholder="Username" className="border border-gray-300 p-2 rounded-lg w-4/5" value={formData.username} onChange={handleChange} required />
                    <input name='password' type="password" placeholder="Password" className="border border-gray-300 p-2 rounded-lg w-4/5" value={formData.password} onChange={handleChange} required />
                    <input name='repeatPassword' type="password" placeholder="Repeat Password" className="border border-gray-300 p-2 rounded-lg w-4/5" value={formData.repeatPassword} onChange={handleChange} required />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg w-4/5">Register</button>
                </form>

                <p className="mt-4">Do you already have an account? <a href="#" className="text-blue-500 hover:underline" onClick={() => navigate("/login")}>Go login</a></p>
            </main>
        </div>
    );
};
