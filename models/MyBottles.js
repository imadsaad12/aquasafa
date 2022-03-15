const mongoose=require('mongoose')
const myBottleSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    numberofbottles:{
        type:Number,
        required:true
    },
   
})
const MyBottles=mongoose.model('MyBottles',myBottleSchema);
module.exports=MyBottles;