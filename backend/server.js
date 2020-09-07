const express = require("express")
const mongoose = require("mongoose")
const Albums = require("./schema")
// import bodyParser from "body-parser"

const dbUrl="mongodb+srv://mern123:mern123@cluster0.j6fsj.mongodb.net/music?retryWrites=true&w=majority"

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))


const connectDB = async()=>{
    try {
        await mongoose.connect(dbUrl,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify:false
        })
        console.log("mongoDB is Connect")
    } catch (error) {
        console.log(error)   
    }
}
connectDB()

app.get("/",(req,res)=>{
    res.send()
})

app.get("/api/albums", async(req,res)=>{
    try {
        const albums = await Albums.find();
        res.json({albums})
    } catch (error) {
        console.log(error)
    }  
})
app.get("/api/albums/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        const album = await Albums.find({ _id : req.params.id })
        album && res.send(album) 
    } catch (error) {
        console.log(error)
    }  
})

app.post("/api/add", async(req,res)=>{
    try {
        await Albums.create({
        name : req.body.name,
        artist : req.body.artist,
        image : req.body.image,
        country : req.body.country,
        total_rating:0,
        amount_review:0,
            })       
        res.json({
            message :"Add Successfully"
        })
    } catch (error) {
        res.status(401).send({ message: 'Invalid User Data.' });
    }
})

app.put('/api/albums/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body
        const album = await Albums.findByIdAndUpdate(id, { $set : data })
        res.json({message : "Uodate Successfully"})
    } catch (error) {
        res.send({error})
    }
  })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));