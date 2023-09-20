import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

const Order = () => {
  const [orders,setOrders] = useState();
  const [auth] =useAuth();

  const getOrders = async () => {
    try{
     const {data} = await axios.get(`/api/v1/auth/orders`);
     setOrders(data);
    }catch(error){
    console.log(error);
    }
  }

  useEffect(() => {
    if(auth?.token) getOrders();
  },[auth?.token])
  return (
    <Layout title={"Dashboard - Order"}>
        <div className='container-fluid p-3' style={{width:"auto"}}>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu />
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Orders</h1>
                {orders?.map((o,i) => {
                  return (
                    <div className='box shadow'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Buyer</th>
                            <th scope='col'>Order Date</th>
                            <th scope='col'>Payment</th>
                            <th scope='col'>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{i+1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createdAt).fromNow()}</td>
                            <td>{o?.payment.success ? "Success":"Failed"}</td>
                            <td>{o?.products.length}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className='container'>
                      {o?.products?.map((p) => (
                <div className="row card flex-row mb-2 p-3" >
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top p-2"
                      style={{ height: "12rem" }}
                      width="18rem"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <h4 className="text-truncates">{p.name}</h4>
                    <p className="text-truncate">{p.description}</p>
                    <p style={{color:"green"}}>${p.price}.00</p>
                  </div>
                </div>
              ))}

                      </div>
                    </div>
                  )
                })}
            </div>
        </div>
        </div>
    </Layout>

  )
}

export default Order;