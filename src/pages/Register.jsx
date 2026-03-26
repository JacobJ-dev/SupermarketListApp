import { Link } from 'react-router-dom'
import { useState } from 'react';



function RegisterPage(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const HandlePasswordChange = (event) => {
        setPassword(event.target.value);


    };

    const HandlePasswordConfirmChange = (event) => {
        var confirmPWvalue = event.target.value;
        if(confirmPWvalue === password){
            setPasswordError(false);
            
        } else {
            setPasswordError(true);
        }
        setConfirmPassword(event.target.value);
    };

    const HandleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log(event.target.value);
    };
    

    return (
        <div className='min-h-screen bg-green-50 flex items-center justify-center'>
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm">
            

            <h1 className='text-center text-2xl font-bold tracking-tight text-green-900' >Welcome!</h1>
            <p className='text-center text-sm text-slate-400 my-1.5'>Register an account to join your household</p>

            <form>
                <label htmlFor='email'>Email</label>
                <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-0.5'
                type='text'
                id="email"
                name='email'
                placeholder='You@email.com'
                onChange={HandleEmailChange}
                required
                />

                <label htmlFor='password'>Password</label>
                <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-1.5'
                type='password'
                id="password"
                name='password'
                placeholder='Enter password here'
                onChange={HandlePasswordChange}
                required
                />

                <label htmlFor='password'>Confirm Password</label>
                <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-1.5'
                type='password'
                id="password-confirm"
                name='password-confirm'
                placeholder='Enter password again'
                onChange={HandlePasswordConfirmChange}
                required
                />

                <div className='py-2'>
                    {passwordError && <p id='error-text' className='text-red-500 text-sm'>Passwords do not match</p>}
                </div>

                <button className='w-full my-2 p-2.5 justify-center rounded-md bg-green-600 text-white hover:bg-green-500 focus-visible:outline-2' type="submit">Submit</button>
            </form>
            <p>Already have an account? <Link to="/" className='text-blue-500 hover:text-blue-400'>Login here</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage;