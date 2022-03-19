import jwt from 'jsonwebtoken'
import Cookies from "universal-cookie";
const RequireAuth=()=>{
    const cookie=new Cookies()
    const token=cookie.get('token')  
        if(!token)
        {
           return false;
        }
        jwt.verify(token,"XYZABC3366",(err:any,decodedToken:any)=>{
            if(err){
               return false
            }
            else{
                return true;
            }
        }
        )
    
}
export default RequireAuth