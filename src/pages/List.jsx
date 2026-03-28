import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';
import  ItemCard  from './components/ItemCard'
import { use } from 'react';

function ListPage() {

    const [itemName, setItemName] = useState();
    const [items, setItems] = useState([]);

    const [householdID, setHouseholdID] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [memberID, setMemberID] = useState(null);

    useEffect(() => {
        loadItems();
    }, []);

    const updateItem = (event) => {
        setItemName(event.target.value);
    }

    const handleItemEntry = async(event) => {
        event.preventDefault();
        if (itemName.trim() !== ''){
            try {
                const {data} = await supabase
                    .from('item')
                    .insert({name:itemName, household_id:householdID, added_by:memberID, quantity:"1" });

                console.log('Data inserted successfully:', data);
                await loadItems();
            } catch (error) {
                console.log("Error while inserting: ", error);
            }
        }
    }

    const loadItems = async() => {
        try {
            //Get the current user
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user);
            //Select the household where the user matches the member
            const {data:house} = await supabase
                .from('household_member')
                .select('household_id, id')
                .eq('user_id',user.id);
            
            setHouseholdID(house[0].household_id);
            setMemberID(house[0].id);
            //Select all items where household_id matches
            const {data: itemData} = await supabase
                .from('item')
                .select()
                .eq('household_id',house[0].household_id);
            //Add these into our item
            setItems(itemData);
        } catch (error){
            console.error('Data failed: ', error);
        }
    }



    return (
        <div className='min-h-screen bg-green-50 flex items-center justify-center'>
            <div className='bg-slate-50 rounded-2xl shadow-sm w-full max-w-4xl overflow-hidden'>
                <div className='bg-green-600 rounded-t-2xl p-8'>
                    <h1 className='text-2xl font-bold tracking-tight text-white'>
                        Welcome Family!
                    </h1>
                    <p className='text-sm tracking-wide text-green-200'>
                        Weekly list
                    </p>
                </div>
                <div className='p-8 flex items-center'>
                    
                    <div className='w-2/3 mx-auto'>
                        <form className='flex gap-2' onSubmit={handleItemEntry}>
                            <input className='w-full bg-white p-2 rounded-xl border border-gray-200'
                            type='text'
                            id="item"
                            name='item'
                            placeholder='Add an item..'
                            onChange={updateItem}
                            required
                            />
                            <button className='bg-green-600 text-white px-4 rounded-xl hover:bg-green-500 focus-visible:outline-2'>+</button>
                        </form>
                    </div>

                    
                </div>
                <div className='px-8 pb-8'>
                    <h3>THIS WEEK</h3>

                    <div id='item-holder' className='p-6 flex flex-col gap-3'>
                        <ul>
                            {items?.map((groceryItem) => (
                                <li key={groceryItem.id}>
                                    {<ItemCard productName={groceryItem.name} quantity={groceryItem.quantity} addedBy={groceryItem.added_by}></ItemCard>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ListPage;