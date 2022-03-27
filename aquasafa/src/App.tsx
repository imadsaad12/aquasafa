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
        <Route  path={'/'} element={<Login />} />
        <Route path={'/home' } element={<Home />}/>
        <Route path={'/customers'} element={<NewCustomer />} />
        <Route path={'/customers/:id'} element={<CustomerInfo />}/>
        <Route path={'/maintable'} element={<MainTable />}/>
        <Route path={'/bills'} element={<CreateBill />}/>
        <Route path={'/payments'} element={<Payments />}/>
        <Route  path={ '/mybottles'} element={<MyBottles />}/>
      </Routes>
   </Layout>
   </BrowserRouter>
  );
}
export default App;


