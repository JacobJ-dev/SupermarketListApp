import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useState } from 'react';
import { ItemCard } from './components/ItemCard'

function ListPage() {

    const [itemName, setItemName] = useState();
    const [items, setItems] = useState<ItemCard>([]);

    const updateItem = (event) => {
        setItemName(event.target.value);
    }

    const handleItemEntry = () => {

    }

    const loadItems = () => {
        try {
            
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
                            {items.map((itemCard) => (
                                <li key={itemCard.id}>
                                    
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