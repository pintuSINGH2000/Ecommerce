import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState();
  const [auth] = useAuth();

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        '/api/v1/auth/all-users'
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);
  return (
    <Layout title={"Dashboard - All Users"}>
        <div className='container-fluid p-3' style={{width:"auto"}}>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All users</h1>
                <div className="d-flex flex-wrap">
            {users?.map((p) => (
              <div className="card m-2" style={{ width: "27rem" }} key={p._id}>
                <div className="card-body">
                  <p className="card-title">{p.name}</p>
                  <p className="card-text">{p.email}</p>
                  <p className="card-text">{p.phone}</p>
                  <p className="card-text">{p.address}</p>
                </div>
              </div>
            ))}
            </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users