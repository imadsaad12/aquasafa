const mongoose=require('mongoose')
const adminsSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
})
const Admins=mongoose.model('Admins',adminsSchema);
module.exports=Admins;