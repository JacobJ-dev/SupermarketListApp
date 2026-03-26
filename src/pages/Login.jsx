import { Link } from 'react-router-dom'

function LoginPage() {
  return (
  <div className='min-h-screen bg-green-50 flex items-center justify-center'>
    <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm">
      

      <h1 className='text-center text-2xl font-bold tracking-tight text-green-900' >Welcome back!</h1>
      <p className='text-center text-sm text-slate-400 my-1.5'>Sign in to your household</p>

      <form>
        <label htmlFor='email'>Email</label>
        <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-0.5 mb-1'
        type='text'
        id="email"
        name='email'
        placeholder='You@email.com'
        required
        />

        <label htmlFor='password'>Password</label>
        <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-0.5'
        type='password'
        id="password"
        name='password'
        placeholder='Enter password here'
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