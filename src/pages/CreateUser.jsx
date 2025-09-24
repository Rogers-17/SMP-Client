import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../helpers/AuthContext';
import background from '../assets/background.jpg'
import { toast } from 'react-toastify';

const Login = () => {

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
      e.preventDefault();

        const data = { fullName: fullName, username: username, password: password };
        await axios.post("http://localhost:4000/api/auth/", data).then((response) => {
            if(response.data.error) {
                toast.error(response.data.error);
            } else{
                navigate("/admin/login");
                toast.success('User Created successfully!', {
                position: 'top-right',
                autoClose: 1000,
                });
                console.log(data)
            }
            console.log('Response:', response.data);
          }); 
    }

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
         <div className='relative w-full md:w-1/2 h-64 md:h-auto'>
            <img src={background} alt='background'
            className='absolute inset-0 w-full h-full object-cover'/>
            <div className='absolute inset-0 bg-blue-800 opacity-80'></div>
            <div className='relative flex flex-col justify-center z-10 h-full p-8 text-white'>
              <h1 className='text-3xl md:text-4xl font-bold mb-4'>Welcome</h1>
              <h1 className='text-2xl md:text-3xl font-medium mb-4'>Create An Account</h1>
              <p className=' text-base md:text-lg max-w-md opacity-85'>Speed up accessing and securing students data with our
                powerful dashboard. Access all your tools and data.
              </p>
            </div>
         </div>

         <div className='w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gray-50'>
            <div className='w-full max-w-md'>
              <div className='text-center mb-8'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>Create a new account</h1>
              </div>
              <form className='space-y-6'>
              <div>
                <label htmlFor='fullName' className='block text-sm font-medium text-gray-700 mb-1'>Full Name:</label>       
                  <input type="text" 
                  placeholder='fullName'
                  id='fullName'
                  name='fullName'
                  onChange={(event) => setFullName(event.target.value)}
                  value={fullName}
                  className="w-full border-[2px] rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                </div>
                <div>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-1'>Username:</label>       
                  <input type="text" 
                  placeholder='Username'
                  id='username'
                  name='username'
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                  className="w-full border-[2px] rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                </div>
                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>Password:</label>
                  <input type="password" 
                  placeholder='Password'
                  id='password'
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  name='password'
                  className="w-full border-[2px] rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    Remember Me
                  </div>
                  <Link to='/admin/login' className='flex items-center'> 
                    have an account? <span className='text-blue-600'> Login </span>
                    </Link>
                </div>
                  <button type='submit' onClick={login} className='mt-2 px-8 py-2.5 rounded text-white bg-blue-500 font-medium'>Login</button>
                </form>
            </div>
         </div>
    </div>
  )
}

export default Login
