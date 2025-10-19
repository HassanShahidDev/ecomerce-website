import express from 'express'
import {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe} from '../controllers/orderController.js'
import adminAuth from'../middlewear/adminAuth.js'

import authUser from '../middlewear/auth.js'


const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


//payment featues
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)


//user featue

orderRouter.post('/userorders', authUser,userOrders)

/// verify payment 
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter