const express = require("express");
const { OrderModel } = require("../models/order.model");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const orderRouter = express.Router();
orderRouter.use(express.json());

orderRouter.get("/", async (req, res) => {
       // const product = await OrderModel.find();
       // res.json(product);

       const query = req.query;
       const searchTerm = query.q;
       const page = query.page;
       const limit = query.limit;
       const sort = query.sort;
       try {
              if (sort == "asc" && searchTerm) {
                     const product = await OrderModel.find({ title: { $regex: searchTerm, $options: "i" } }).sort({ price: 1 });
                     res.json(product);
              }
              else if (sort == "desc" && searchTerm) {
                     const product = await OrderModel.find({ title: { $regex: searchTerm, $options: "i" } }).sort({ price: -1 });
                     res.json(product);
              }
              else if (sort == "cr" && searchTerm) {
                     const product = await OrderModel.find({ title: { $regex: searchTerm, $options: "i" } }).sort({ rating: 1 });
                     res.json(product);
              }
              else if (sort == "bs" && searchTerm) {
                     const product = await OrderModel.find({ title: { $regex: searchTerm, $options: "i" } }).sort({ rating: 1, reviews: 1 });
                     res.json(product);
              }
              else if (searchTerm) {
                     // const product = await OrderModel.find({ $or: [{ productname: { $regex: searchTerm, $options: "i" } }, { email: { $regex: searchTerm, $options: "i" } }, { role: { $regex: searchTerm, $options: "i" } }, { location: { $regex: searchTerm, $options: "i" } }, { phone: { $regex: searchTerm, $options: "i" } }] });
                     const product = await OrderModel.find({ title: { $regex: searchTerm, $options: "i" } });
                     res.json(product);
              }
              else if (page) {
                     const product = await OrderModel.find().skip((page - 1) * limit).limit(limit);
                     res.json(product);
              }

              else {
                     const product = await OrderModel.find(query);
                     console.log(product);
                     res.json(product);
              }

       } catch (error) {
              console.log(error);
              res.json({ "msg": "Error in getting products" });

       }
})


orderRouter.post("/add", async (req, res) => {
       const product = req.body;
       try {
              const newProduct = new OrderModel(product);
              await newProduct.save();
              // await OrderModel.insertMany(product);
              res.send("Order placed successfully");
       } catch (error) {
              console.log(error);
              res.sendStatus(500).send("error: Something went wrong");
       }
})

orderRouter.patch("/update/:id", async (req, res) => {
       const status = req.body;
       const orderId = req.params.id;
       try {
              await OrderModel.findByIdAndUpdate(orderId, status)
              res.send("Status updated successfully");
       } catch (error) {
              console.log(error);
              res.sendStatus(500).send("error: Something went wrong");
       }
})

module.exports = {
       orderRouter
}