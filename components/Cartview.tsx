
import Link from 'next/link'
import React, { useMemo } from 'react'
import OrderCard from './OrderCard'
import toast from 'react-hot-toast'
import { useAppSelector } from '@/store/hooks/hooks'

const CartView = () => {

    
    const cart = useAppSelector((state) => state.cart.cartItems)

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

    const sumItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
    const subTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart])
    const taxRate = 7
    const taxFee = useMemo(() => (subTotal * (taxRate / 100)).toFixed(2), [subTotal, taxRate])
    const total = useMemo(() => (subTotal + Number(taxFee)).toFixed(2), [subTotal, taxFee])
    
    const handleCreateOrder = async () => {
        const CheckoutData= cart
        console.log(CheckoutData);
        toast.success("Checkout Completed!")
    }

  return (

    <div className='p-2'>
        <h2 className="scroll-m-20 text-2xl pb-2 font-semibold tracking-tight first:mt-0">
            View Cart ({totalItems ?? 0}) 
        </h2>
        {cart ? (
          cart.map((item, index) => {
            return (
              <OrderCard key={index} product={item}/>
            )
          })
        ) : (
          <p>No items in the cart</p>
        )}
        {
            cart && cart.length > 0 ? (
                <div className='mt-2'>
                    <h2 className="scroll-m-20 border-b pb-2 text-2xl 
                    font-semibold tracking-tight first:mt-0"
                    >
                        Order Summary
                    </h2>
                    <div className='py-2 border-b'>
                        <div className='flex justify-between'>
                            <h3 className='text-muted-foreground'>Total Items:</h3>
                            <h3 className=' font-medium text-muted-foreground'>{sumItems} items</h3>
                        </div>
                        <div className='flex justify-between'>
                            <h3 className='text-muted-foreground'>Subtotal:</h3>
                            <h3 className='font-medium text-muted-foreground'>$ {subTotal.toFixed(2)}</h3>
                        </div>
                        <div className='flex justify-between'>
                            <h3 className='text-muted-foreground'>Tax {taxRate}%:</h3>
                            <h3 className='font-medium text-muted-foreground'>$ {taxFee}</h3>
                        </div>
                    </div>
                    <div className='py-2 flex justify-between items-end'>
                        <h2 className="scroll-m-20 text-2xl text-muted-foreground 
                        font-semibold tracking-tight first:mt-0"
                        >
                            Total
                        </h2>
                        <h3 className="scroll-m-20 text-xl text-muted-foreground 
                        font-semibold tracking-tight first:mt-0"
                        >
                            $ {total}
                        </h3>
                    </div>
                    <div className='w-full py-4'>
                        <button 
                            type="button"
                            onClick={handleCreateOrder}
                            className='bg-sky-500 px-3 py-2 rounded-lg text-slate-50 w-full'
                        >
                            Place an Order
                        </button>
                    </div>
                </div>
        ) : ("")}
    </div>


  )
}

export default CartView