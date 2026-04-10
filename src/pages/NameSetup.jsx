import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function NameSetupPage(){

    const [name, setName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
            (async () => {
                try{
                    //Get the current user
                    const { data: { user } } = await supabase.auth.getUser();
    
                    //if no user logged in
                    if(user === null){
                        navigate("/");
                        return;
                    }

                } catch (error){
                    console.error("Error fetching data:", error);
                }
            } )();
            
        }, [])

    const handleSubmit = async(event) => {
        event.preventDefault();

        //Get current user
        const { data: { user } } = await supabase.auth.getUser();

        try {
            //Update the household member tied to this user
            const {data} = await supabase
                .from('household_member')
                .update({name:name})
                .eq('user_id', user.id);
        } catch (error) {
            console.log("error updating user name: ",error);           
        }   

        navigate("/home");

    }

    return (
         <div className='min-h-screen bg-green-50 flex items-center justify-center'> 
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md"> 
                <h1 className='text-center text-2xl font-bold tracking-tight text-green-900'>Household Setup</h1>
                <form onSubmit={handleSubmit}>
                        <label htmlFor='name'>Enter name</label>
                        <input className='w-full border border-gray-300 rounded-xl p-1.5 mt-0.5'
                        type='text'
                        id="name"
                        name='name'
                        placeholder='Jane Juliet'
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        required
                        />
                        <button className='w-full my-2 p-2.5 justify-center rounded-md bg-green-600 text-white hover:bg-green-500 focus-visible:outline-2' type="submit">Submit</button>
                    </form>
            </div>
        </div>
    )
}

export default NameSetupPage;