const express=require('express')
const mongoose=require('mongoose')
const path=require('path')

const app=express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/ams')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb Connected Successfully");
})

const userSchema=new mongoose.Schema({
    Customer_Name:String,
    Customer_Mobile_No:Number,
    products:String,
    product_detail:String,
    date:String
},{ versionKey: false })

const Users=mongoose.model("CustomerDetails",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'forms.html'))
})

app.post('/post',async(req,res)=>{
    const {Customer_Name,Customer_Mobile_No,products,product_detail,date}=req.body
    const user=new Users({
        Customer_Name,
        Customer_Mobile_No,
        products,
        product_detail,
        date
    })
    await user.save()
    console.log(user);
    res.send("Form Submitted Successfully")
})
app.listen(4300,()=>{
    console.log("Server is running successfully on port 4300");
})