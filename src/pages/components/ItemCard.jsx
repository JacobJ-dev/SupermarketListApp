import { supabase } from '../../supabaseClient';

function ItemCard({productName, productID, addedBy, quantity, userRole, isDone, iconColour, onDelete, onChecked}){

    const handleDelete = async() => {
        try {
            const {data} = await supabase
                .from('item')
                .delete()
                .eq('id',productID);

            onDelete();
        } catch (error) {
            console.error("Error deleting from table ",error);
        }
    }

    const handleIsDone = async() => {
        try {
            const {data} = await supabase
                .from('item')
                .update({is_done: !isDone})
                .eq('id', productID);

            onChecked(productID);
            console.log(data);
            console.log(iconColour);
        } catch (error) {
            console.error("Error updating from table ",error);
        }
    }

    
    return (
        <div className='bg-white p-12 rounded-2xl flex justify-between border border-gray-200'>
            <div className='flex gap-5'>
                <div id='avatar-circle' className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColour}`}>
                {addedBy.name[0]}
                </div>
                <div className='flex-col'>
                    <h3>{productName}</h3>
                    <p>Added by: {addedBy.name} : <span id='quantity'>{quantity}</span></p>
                </div>
            </div>
            {userRole !== 'head' && <div>
            {isDone ? <div className='bg-red-100 px-5 rounded-2xl flex items-center justify-center'>
                    <p className='text-red-600'>ordered</p>
                </div>
                : <div className='bg-green-100 px-5 rounded-2xl flex items-center justify-center'>
                    <p className='text-green-600 '>needed</p>
                </div>}
                

                
            </div>}
            {userRole === 'head' && <div className='flex items-center gap-3'>
                <input type="checkbox" name="isDone" checked={isDone} onChange={handleIsDone} className='w-9 h-9 rounded-md accent-green-600 cursor-pointer'></input>
                <button type="button" onClick={handleDelete}  className='w-9 h-9 rounded-md bg-red-600 hover:bg-red-500 focus-visible:outline-2'>
                    {/* <img src='../src/assets/bin.svg' className='w-9 h-9'></img> */}
                    <p className='text-white'>X</p>
                </button>
            </div>}
        </div>
    )

}

export default ItemCard;