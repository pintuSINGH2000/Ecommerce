import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth,setAuth] = useAuth();

  useEffect(()=>{
    const {email,name,phone,address} = auth?.user
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  },[auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if(res.data.success){
        setAuth({...auth,user:res?.data?.updateUser});
        let ls= localStorage.getItem("auth");
        ls=JSON.parse(ls);
        ls.user = res?.data?.updateUser;
        localStorage.setItem('auth',JSON.stringify(ls));
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Profile"}>
        <div className='container-fluid p-3' style={{width:"auto"}}>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu />
            </div>
            <div className='col-md-9'>
                <div className='container form-control w-50 p-5'>
                <form onSubmit={handleSubmit}>
                  <h4 className='title text-center'>User Profile</h4>
                  <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Enter your name..."
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter your Email..."
                      required
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter password..."
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPhone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder="Enter your phone no..."
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="exampleInputAddress"
                      placeholder="Enter your address..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
                </div>
            </div>
        </div>
        </div>
    </Layout>

  )
}

export default Profile;