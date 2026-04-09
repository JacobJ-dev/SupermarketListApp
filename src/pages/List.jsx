import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';
import  ItemCard  from './components/ItemCard'


function ListPage() {

    const navigate = useNavigate();

    const [itemName, setItemName] = useState('');
    const [items, setItems] = useState([]);
    
  


    


    const[loading, setLoading] = useState(true);

    const [member, setMember] = useState(null);
    const [houseMembers, setHouseMembers] = useState(null);

    useEffect(() => {
        (async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if(user === null){
                navigate("/");
                return;
            }
            await loadItems();
        })();
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
                    .insert({name:itemName, household_id:member.household_id, added_by:member.id, quantity:"1" });

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
            //Select the household member where the user matches the member
            const {data:member} = await supabase
                .from('household_member')
                .select('*, household(name)')
                .eq('user_id',user.id);
            
            //Only one row should be returned, so save the row results for easy access
            setMember(member[0]);

            const {data: householdMembers} = await supabase
                .from('household_member')
                .select()
                .eq('household_id', member[0].household_id);
            
            setHouseMembers(householdMembers);

            //Select all items where household_id matches
            const {data: itemData} = await supabase
                .from('item')
                .select()
                .eq('household_id',member[0].household_id)
                .order('created_at', {ascending:true});
            //Add these into our item
            setItems(itemData);
        } catch (error){
            console.error('Data failed: ', error);
        } finally {
            setLoading(false);
        }
    }

    const updateCheckedItems = (checkedID) => {
        const newItems = items.map((item) => {
            if(item.id === checkedID){
                return { ...item, is_done: !item.is_done}
            }
            return item;
        })
        setItems(newItems);
    }


    if(loading){
        return (
            <div className='min-h-screen bg-green-50 flex items-center justify-center'>
                <p className='text-green-600 font-medium'>Loading...</p>
            </div>
        )
    }
    return (
        <div className='min-h-screen bg-green-50 flex items-center justify-center'>
            <div className='bg-slate-50 rounded-2xl shadow-sm w-full max-w-4xl overflow-hidden'>
                <div className='bg-green-600 rounded-t-2xl p-8'>
                    <h1 className='text-2xl font-bold tracking-tight text-white'>
                        Welcome {member.household.name}!
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
                            <button className='bg-green-600 text-white px-4 rounded-xl font-extrabold hover:bg-green-500 focus-visible:outline-2'>+</button>
                        </form>
                    </div>

                    
                </div>
                <div className='px-8 pb-8'>
                    <h3>THIS WEEK</h3>

                    <div id='item-holder' className='p-6 flex flex-col gap-3'>
                        <ul className='flex flex-col gap-3'>
                            {items?.map((groceryItem) => (
                                <li key={groceryItem.id}>
                                    {<ItemCard productName={groceryItem.name} productID={groceryItem.id} quantity={groceryItem.quantity} addedBy={houseMembers.find(m => m.id === groceryItem.added_by)} userRole={member.role} isDone={groceryItem.is_done} onDelete={loadItems} onChecked={updateCheckedItems}></ItemCard>}
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