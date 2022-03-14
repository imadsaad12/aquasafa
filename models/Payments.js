const mongoose=require("mongoose");
const paymentsSchema=new mongoose.Schema({
    description:{
        type:String
    },
    cost:{
        type:String
    },
    date:{
        type:String
    },
})
const Payments=mongoose.model("Payments",paymentsSchema);
module.exports=Payments