import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./config/dbConfig.js";
import {erroHandling} from "./middlewares/errorHanding.js"
import wineRouter from "./routs/wine.js";
import userRouter from "./routs/user.js";
import orderRouter from "./routs/order.js";  
import {sendEmail} from "./routs/nodeMailer.js";
config(); 
connectToDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('images'))

app.use("/api/wines", wineRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/sendEmail", sendEmail);
app.use(erroHandling);

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
