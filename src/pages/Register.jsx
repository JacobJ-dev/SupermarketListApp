import { Link } from 'react-router-dom'

function RegisterPage(){
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
        required
        />

        <label htmlFor='password'>Password</label>
        <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-1.5'
        type='password'
        id="password"
        name='password'
        placeholder='Enter password here'
        required
        />

        <label htmlFor='password'>Confirm Password</label>
        <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-1.5'
        type='password'
        id="password-confirm"
        name='password-confirm'
        placeholder='Enter password again'
        required
        />

        <button className='w-full my-2 p-2.5 justify-center rounded-md bg-green-600 text-white hover:bg-green-500 focus-visible:outline-2' type="submit">Submit</button>
      </form>
      <p>Already have an account? <Link to="/" className='text-blue-500 hover:text-blue-400'>Login here</Link></p>
    </div>
  </div>
  )
}

export default RegisterPage;