import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import seedRouter from "./routes/seedRouter.js"
import productRoutes from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"
import orderRouter from "./routes/OrderRoutes.js"
//import path from "path"
const port=process.env.PORT || 5000

dotenv.config()
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to the database")
})
.catch(err=>{
    console.log(err.message)
})



const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/api/keys/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use("/api/seed",seedRouter)
app.use("/api/products",productRoutes)
app.use("/api/users",userRouter)
app.use("/api/orders",orderRouter)

// const __dirname=path.resolve()
// app.use(express.static(path.join(__dirname, "/Client/build")))
// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname, "/Client/build/index.html"))
// })


app.use((err,req,res,next)=>{
res.status(500).send({err:err.message})
})

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
