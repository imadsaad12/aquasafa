import React from 'react';
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import Home from "./components/Home/Index"
import Layout from "./components/Layout/index"
import NewCustomer from "./components/NewCustomer/index"
import MainTable from "./components/MainTable/index"
import CustomerInfo from "./components/CustomerInfo/index"
import CreateBill from "./components/CreateBill/index"
import Payments from "./components/Payments/index"
import MyBottles from "./components/MyBottles/index"
import Login from "./components/Login/index"
import jwt from 'jsonwebtoken'
import Cookies from "universal-cookie";

// const RequireAuth=()=>{
//     const cookie=new Cookies()
//     const token=cookie.get('token')  
//         if(!token)
//         {
//            return false;
//         }
//         jwt.verify(token,"XYZABC3366",(err:any,decodedToken:any)=>{
//             if(err){
//                return false
//             }
//             else{
//                 return true;
//             }
//         }
//         )
    
// }
function App() {
  const cookie=new Cookies();
  const token = cookie.get("token")
  return (
   <BrowserRouter>
   <Layout>
      <Routes>
        <Route path={token ? '/' : '/'} element={token ?<Login />:<Login />} />
        <Route path={token ? '/home' : '/'} element={token ?<Home />:<Login />}/>
        <Route path={token ? '/customers' : '/'} element={token ?<NewCustomer />:<Login />} />
        <Route path={token ? '/customers:id' : '/'} element={token ?<CustomerInfo />:<Login />}/>
        <Route path={token ? '/maintable' : '/'} element={token ?<MainTable />:<Login />}/>
        <Route path={token ? '/bills' : '/'} element={token ?<CreateBill />:<Login />}/>
        <Route path={token ? '/payments' : '/'} element={token ?<Payments />:<Login />}/>
        <Route  path={token ? '/mybottles' : '/'} element={token ?<MyBottles />:<Login />}/>
      </Routes>
   </Layout>
   </BrowserRouter>
  );
}
export default App;
function PrivateRoute({path,element}:any) {
  //let auth = RequireAuth();
  const cookie=new Cookies();
  const token = cookie.get("token")
  return (
    <Route path={token ? path : "/"} element={token ?element:<Login />} />
  );
}
