import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';

function ItemCard({productName, addedBy, quantity}){

    const [intial, setIntial] = useState('');

    useEffect(() => {
        const letters = [...addedBy];
        setIntial(letters[0]);
    }, []);

    return (
        <div className='bg-white p-12 rounded-2xl flex justify-between border border-gray-200'>
            <div className='flex gap-5'>
                <div id='avatar-circle' className='bg-fuchsia-500 w-10 h-10 rounded-full flex items-center justify-center'>
                {intial}
                </div>
                <div className='flex-col'>
                    <h3>{productName}</h3>
                    <p>Added by: {addedBy} <span id='quantity'>{quantity}</span></p>
                </div>
            </div>
            <div className='bg-green-100 px-5 rounded-2xl flex items-center justify-center'>
                <p className='text-green-600 '>needed</p>
            </div>
        </div>
    )
}