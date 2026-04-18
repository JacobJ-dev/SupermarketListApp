import { useState, useEffect } from 'react';

function QuantityPicker({itemQuantity, updateQuantity}){

    const [disableDec, setDisableDec] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setQuantity(itemQuantity);
    }, []);

    const increment = () => {
        const newQuantity = quantity + 1;

        if(newQuantity > 1){
            setDisableDec(false);
        }

        setQuantity(newQuantity);
        updateQuantity(newQuantity);
    }

    const decrement = () => {
        const newQuantity = quantity - 1;

        if (newQuantity > 0){
            setQuantity(newQuantity);
            updateQuantity(newQuantity);
        }

        if (newQuantity === 1){
            setDisableDec(true);
        }
    }

    const baseBtn = "h-full w-12 text-2xl bg-gray-100 text-gray-400 border-0 text-center cursor-pointer select-none outline-none focus:outline-none";
    const hoverBtn = "hover:bg-gray-300 hover:text-gray-600";
    const disabledBtn = "text-gray-200 hover:!bg-gray-100 hover:!text-gray-200";

    return (
        <div className='inline-flex items-center border border-gray-200 rounded align-middle'>
            <button className={`${baseBtn} ${disableDec ? disabledBtn : hoverBtn} rounded-l`} onClick={decrement}>&ndash;</button>
            <span className="w-16 text-2xl text-center select-none">{quantity}</span>
            <button className={`${baseBtn} ${hoverBtn} rounded-r`} onClick={increment}>&#xff0b;</button>
        </div>
    )

}

export default QuantityPicker;