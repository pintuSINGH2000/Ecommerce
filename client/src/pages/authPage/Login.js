import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const locaiton = useLocation();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/auth/login`,
        { email, password }
      );
      
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(locaiton.state || "/");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login - Ecommerce app"}>
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
            <div className="col-md-5 margin-auto">
              <div className="card-body m-lg-5">
                <p class="card-title fs-3 fw-bold mb-3">Login</p>
                <form onSubmit={handleSubmit}>
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
                  <button type="submit" className="btn btn-primary my-2">
                    Submit
                  </button>
                </form>
                <div className="flexbox flex-dir-col">
                <NavLink type="button" to="/otplogin" className="btn btn-primary my-2"  style={{ width: 150 }}>
                  Login With OTP
                </NavLink>
                <NavLink type="button" to="/forgetpassword" className="btn btn-primary my-2"  style={{ width: 150 }}>
                  Forget Password 
                </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
