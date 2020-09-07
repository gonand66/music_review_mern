const mongoose = require("mongoose")

const albumSchema = new mongoose.Schema({
    name : {type : String,},
    artist : {type: String},
    country:{type: String},
    image:{type:String},
    total_rating:{type: Number},
    amount_review:{type: Number},
})

const Albums = mongoose.model("album",albumSchema)

module.exports = Albums