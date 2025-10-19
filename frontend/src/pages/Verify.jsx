import React from 'react'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');


    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + '/api/orders/verifyStripe', { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartItems({})
                
                navigate('/orders')
            } else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in payment verification")
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])


    return (
        <div>

        </div>
    )
}

export default Verify
