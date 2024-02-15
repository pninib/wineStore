import mongoose from "mongoose";


export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION || "mongodb+srv://b99524:gf3j2TuGJcLQMfzl@winestore.ydvm4ct.mongodb.net/";
    mongoose.connect(mongoURI)
        .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
        .catch(err => {
            console.log("cannot connect mongoDB")
            console.log(err)
            process.exit(1);//סוגר את התכונית שאנחנו מתחילים להריץ בכישלון
        })


}