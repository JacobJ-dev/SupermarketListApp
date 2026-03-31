import { Link, useNavigate } from 'react-router-dom'

import { useState, useEffect } from 'react';

function ItemCard({productName, productID, addedBy, quantity, userRole}){

    const [intial, setIntial] = useState('');

    

    useEffect(() => {
        addedBy = "Jacob" //For testing purposes
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
                    <p>Added by: {"Jacob"} : <span id='quantity'>{quantity}</span></p>
                </div>
            </div>
            {userRole !== 'head' && <div className='bg-green-100 px-5 rounded-2xl flex items-center justify-center'>
                <p className='text-green-600 '>needed</p>

                
            </div>}
            {userRole === 'head' && <div className='flex items-center gap-3'>
                <input type="checkbox" name="isDone" className='w-9 h-9 accent-green-600 cursor-pointer'></input>
                <button type="button" onClick={alert('button clicked')} className='w-9 h-9'>
                    <img src='../src/assets/bin.svg' className='w-9 h-9'></img>
                    {/* dummy comment */}
                </button>
            </div>}
        </div>
    )
}

export default ItemCard;