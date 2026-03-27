import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';

function HouseholdSetupPage() {

    useEffect(() => {

    }, [])

    const [showCreate, setShowCreate] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [houseName, setHouseName] = useState('');
    const [joinCode, setJoinCode] = useState('');

    const showCreateField = () => {
        setShowCreate(true);
    }

    const showJoinField = () => {
        setShowJoin(true);
    }
    
    const returnBack = () => {
        setShowCreate(false);
        setShowJoin(false);
    }

    

    return (
        <div className='min-h-screen bg-green-50 flex items-center justify-center'> 
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md"> 
                <h1 className='text-center text-2xl font-bold tracking-tight text-green-900'>Household Setup</h1>
                { (!showCreate && !showJoin) &&
                <div className='flex flex-col items-center gap-0.5 my-2'>
                    <button onClick={showCreateField} className='w-1/2 my-2 p-2.5 justify-center rounded-md bg-green-600 text-white hover:bg-green-500 focus-visible:outline-2'>Create new Household</button>
                    <button onClick={showJoinField}className='w-1/2 my-2 p-2.5 justify-center rounded-md bg-green-600 text-white hover:bg-green-500 focus-visible:outline-2'>Join existing Household</button>
                </div>
                }
                
                { showCreate &&
                    <form>
                        <label htmlFor='house-name'>Enter house name</label>
                        <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-0.5'
                        type='text'
                        id="house-name"
                        name='house-name'
                        placeholder='household name here'
                        onChange={(e) => {
                            setHouseName(e.target.value);
                        }}
                        required
                        />
                        <button className='w-full my-2 p-2.5 justify-center rounded-md bg-green-600 text-white hover:bg-green-500 focus-visible:outline-2' type="submit">Submit</button>
                    </form>
                }
                {   showJoin &&                
                    <form>
                        <label htmlFor='join-code'>Enter join code</label>
                        <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-0.5'
                        type='text'
                        id="join-code"
                        name='join-code'
                        placeholder='XXXXXX'
                        maxLength={6}
                        onChange={(e) => {
                            setJoinCode(e.target.value);
                        }}
                        required
                        />
                        <button className='w-full my-2 p-2.5 justify-center rounded-md bg-green-600 text-white hover:bg-green-500 focus-visible:outline-2' type="submit">Submit</button>
                    </form>
                    
                }
                <div className='flex justify-center'>
                {
                    (showCreate || showJoin) && 
                    <button onClick={returnBack} className='w-1/3 my-2 p-2.5 justify-center rounded-md bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-2'>Return</button>
                    
                }
                </div>
            </div>
        </div>
    )
}

export default HouseholdSetupPage;