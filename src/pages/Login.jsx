import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useState } from 'react';
import { use } from 'react';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const HandleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log(event.target.value);
    };

    const HandlePasswordChange = (event) => {
        setPassword(event.target.value);

    };

    const HandleSubmit = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if(error){
            console.error('Sign-in error: ', error.message);
            return;
        }

        console.log("user signed in: ", data.user);

        if (data.session) {
            console.log('User session:', data.session);
            navigate("/setup");
        }


    } 

    return (
    <div className='min-h-screen bg-green-50 flex items-center justify-center'>
        <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm">
        

        <h1 className='text-center text-2xl font-bold tracking-tight text-green-900' >Welcome back!</h1>
        <p className='text-center text-sm text-slate-400 my-1.5'>Sign in to your household</p>

        <form onSubmit={HandleSubmit}>
            <label htmlFor='email'>Email</label>
            <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-0.5 mb-1'
            type='text'
            id="email"
            name='email'
            placeholder='You@email.com'
            onChange={HandleEmailChange}
            required
            />

            <label htmlFor='password'>Password</label>
            <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-0.5'
            type='password'
            id="password"
            name='password'
            placeholder='Enter password here'
            onChange={HandlePasswordChange}
            required
            />

            <button className='w-full my-2 p-2.5 justify-center rounded-md bg-green-600 text-white hover:bg-green-500 focus-visible:outline-2' type="submit">Submit</button>
        </form>
        <p>Don't have an account? <Link to="/register" className='text-blue-500 hover:text-blue-400'>Register here</Link></p>
        </div>
    </div>
    )
}

export default LoginPage;