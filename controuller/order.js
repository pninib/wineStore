import { Order, orderValidator } from "../modul/order.js";
import mongoose from "mongoose";

export const getAllOrderes = async (req, res) => {

    let { search, address } = req.query;
    try {
        let allorders;
        let serachObject = {};
        if (search)
            serachObject.name = new RegExp(search, "i");
        if (address)
            serachObject.address = address
        allorders = await Order.find(serachObject)

        res.json(allorders)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את כל ההזמנות" + err.message)
    }
}

export const getOrderById = async (req, res) => {
    try {

        let order = await Order.findById(req.user._id)
        if (!order)
            return res.status(404).send("לא קיימת הזמנה למשתמש הנוכחי  ")
        res.json(order)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את ההזמנה " + err.message)
    }
}

export const deleteOrder = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id");


    let deletedorder = await Order.findByIdAndDelete(id)
    if (!deletedorder)
        return res.status(404).send("לא נמצא הזמנה עם כזה קוד למחיקה")
    return res.json(deletedorder);


}


export const addOrder = async (req, res) => {
    let { orderDate, toDate, address, orderCode, product, isCare } = req.body;
    let validate = orderValidator(req.body);
    if (validate.error)
        return res.status(400).send(validate.error[0])


    try {
        let sameorders = await Order.find({ orderCode, address });
        if (sameorders.length > 0)
            return res.status(409).send("כבר קיימת הזמנה בשם כזה עם אותו כתובת ")
        let neworder = await Order.create({ orderDate, toDate, address, orderCode, product, isCare: isCare || false })
        return res.status(201).json(neworder)
    }
    catch (err) {
        res.status(400).send("זה אא להוסיף" + err)
    }
}



export const updateOrder = async (req, res) => {



    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id");
    try {

        
        let orderToUpdate = await Order.findById(id);

        if (!orderToUpdate)
            return res.status(404).send("לא נמצא הזמנה עם קוד כזה")
        orderToUpdate.orderCode = req.body.orderCode || orderToUpdate.orderCode;
        orderToUpdate.toDate = req.body.toDate || orderToUpdate.toDate;
        orderToUpdate.isCare = req.body.isCare || orderToUpdate.isCare;
        orderToUpdate.orderDate = req.body.orderDate || orderToUpdate.orderDate;
        orderToUpdate.address = req.body.address || orderToUpdate.address;
       

        await orderToUpdate.save();
        res.json(orderToUpdate);
    } catch (err) {
        res.status(400).send("אא לעדכן" + err)
    }


}

