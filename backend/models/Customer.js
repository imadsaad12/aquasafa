const mongoose=require('mongoose')
const customerSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:"true"
    },
    tag:{
        type:String,
        required:true
    },
    turn:{
        type:Number,
        required:true
    },
    day:{
        type:String
    }
})
const Customer=mongoose.model('Customers',customerSchema);
module.exports=Customer;