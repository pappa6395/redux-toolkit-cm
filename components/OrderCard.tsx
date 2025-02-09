
import React from 'react'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartItem, decrementQty, incrementQty, removeProductFromCart } from '@/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'

const OrderCard = ({product}: {product: CartItem}) => {

    const cartItems = useAppSelector((state) => state.cart.cartItems)
    const dispatch = useAppDispatch()

    const handleIncrement = (cartItemId: number) => {
        dispatch(
            incrementQty(cartItemId)
        );
        localStorage.setItem("cartItem", JSON.stringify(cartItems.map(
            (item) => item.id === cartItemId ? {...item, qty: item.quantity + 1 } : item)));
    };

    const handleDecrement = (cartItemId: number) => {
        dispatch(
            decrementQty(cartItemId)
        );
        localStorage.setItem("cartItem", JSON.stringify(cartItems.map(
            (item) => item.id === cartItemId? {...item, qty: item.quantity - 1 } : item)));
    };

    const handleRemove = (cartItemId: number) => {
        dispatch(
            removeProductFromCart(cartItemId)
        );
        localStorage.setItem("cartItem", JSON.stringify(cartItems.filter(
            (item) => item.id !== cartItemId)));
    };

  return (

    <div>
        <div className='flex items-center justify-between p-2 gap-2'>
            <div className='flex gap-2'>
                <Image
                src={product?.image ?? "/StockOnline.png"}
                alt="product"
                width={200}
                height={280}
                className='h-16 w-14 object-contain' 
                />
                <div>
                    <div className='py-2'>
                        <h3 className='font-bold text-md line-clamp-2'>{product.title}</h3>
                    </div>
                    <div className='flex justify-between'>
                        <Badge 
                            variant={"outline"} 
                            className='text-sm font-semibold shadow-sm 
                            text-indigo-500 rounded-lg'
                        >
                            ${product.price}
                        </Badge>
                    </div>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='flex justify-end items-end'>
                    <button  
                        type={"button"} 
                        onClick={() => handleDecrement(product.id)} 
                        className='size-6 rounded-full'
                    >
                        <Minus className='size-4'/>
                    </button>
                </div>
                <div className='flex justify-end items-end'>
                    <button disabled type={"button"} className='size-6 rounded-full'>
                        <span className='text-primary'>{product.quantity}</span>
                    </button>
                </div>
                <div className='flex justify-end items-end'>
                    <button 
                        type={"button"} 
                        onClick={() => handleIncrement(product.id)} 
                        className='size-6 rounded-full'
                    >
                        <Plus className='size-4'/>
                    </button>
                </div>
            </div>
        </div>
        <div className='flex justify-end items-end'>
            <button  
                type={"button"} 
                onClick={() => handleRemove(product.id)} 
                className='bg-destructive px-2 py-2 gap-2 flex text-white rounded-xl'
            >
                <Trash2 className='size-4'/>
            </button>
        </div>
    </div>

  )
}

export default OrderCard