import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/Layout/UserMenu'

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
    <div className='container-fluid p-3' style={{width:"auto"}}>
      <div className='row'>
         <div className='col-md-3'>
           <UserMenu/>
         </div>
         <div className='col-md-9'>
           <div className='card w-75 p-3'>
            <h1>Name: {auth?.user?.name}</h1>
            <h1>Email: {auth?.user?.email}</h1>
            <h1>Address: {auth?.user?.address}</h1>
           </div>
         </div>
      </div>

    </div>
    </Layout>
  )
}

export default AdminDashboard