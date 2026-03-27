import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';

function HouseholdSetupPage() {

    const navigate = useNavigate();
    

    useEffect(() => {
        (async () => {
            try{
                //Get the current user
                const { data: { user } } = await supabase.auth.getUser()

                //Check if they already have a household
                const { data } = await supabase
                    .from('household_member')
                    .select()
                    .eq('user_id', user.id)

                if(data && data.length > 0){
                    navigate("/home");
                }
            } catch (error){
                console.error("Error fetching data:", error);
            }
        } )();
        
    }, [])

    
    const [showCreate, setShowCreate] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [houseName, setHouseName] = useState('');
    const [joinCode, setJoinCode] = useState(''); //For existing households

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

    const handleCreate = async(event) => {
        event.preventDefault();

        var code = await getUniqueCode();
        
        try {
            const {data} = await supabase
                .from('household')
                .insert({name: houseName, join_code: code})
                .select();

            
            console.log('household data:', data)
            console.log('calling addCurrentUserToHouseHold with:', data[0].id, 'head')

            addCurrentUserToHouseHold(data[0].id, 'head');
        } catch (error) {
            console.error('Error inserting data:', error);
        }
       
    }

    const addCurrentUserToHouseHold = async(householdId, role) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()

            const {data} = await supabase
                .from('household_member')
                .insert({role: role,household_id:householdId,user_id:user.id})
                .select();

            console.log('Data inserted successfully:', data);

            navigate("/home");
        } catch (error) {
            
        }
    }

    const getUniqueCode = async() => {
        while(true){
            var houseCode = generateCode();
            try{
                const {data} = await supabase
                    .from('household')
                    .select()
                    .eq('join_code', houseCode);

                //If the data returns and there is no rows returned
                if(data && data.length === 0){
                    //return this valid household join code
                    return houseCode;
                }

            } catch (error){
                console.error("Error fetching data:", error);
            }
        }
    }

    function generateCode(){
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let houseCode = "";

        for(let i=0; i < 6; i++){
            //Retrieve a random character and add it to the household code
            houseCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return houseCode;
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
                    <form onSubmit={handleCreate}>
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