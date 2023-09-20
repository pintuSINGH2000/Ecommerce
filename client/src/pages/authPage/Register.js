import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/auth/register`,
        { name, email, password, phone, address }
      );
      if(res.data.success){
        toast.success(res.data.message);
        
        setTimeout(() => {
          navigate('/login');
        }, 1000); 
      }else{
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="register">
        <div className="card mb-3 ">
          <div className="row g-0">
            <div className="col-md-7">
              <img
                src="/images/ohmedia-ecommerce.jpg"
                className="img-fluid rounded-start height-100"
                alt="..."
              />
            </div>
            <div className="col-md-5">
              <div className="card-body m-lg-3">
                <p class="card-title fs-3 fw-bold mb-3">Sign up</p>
                <form onSubmit={handleSubmit}>
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
                      required
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
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
