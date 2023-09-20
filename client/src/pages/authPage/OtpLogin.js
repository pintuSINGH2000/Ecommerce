import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
// import { NavLink, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useAuth } from "../../context/auth";

function OtpLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      // Step 1: Send email to request OTP
      try {
        setLoading(true);
        const res = await axios.post(
          `/api/v1/forgetpassword/sendOtp`,
          { email,isOtpLogin:true  }
        );
        setLoading(false);
        if (res.data.success) {
          setMessage("");
          toast.success(res.data.message);
          setStep(2);
        }
      } catch (error) {
        setLoading(false);
        setMessage("Error sending OTP.");
      }
    } else if (step === 2) {
      // Step 2: Verify OTP
      try {
        setLoading(true);
        const res = await axios.post(
          `/api/v1/forgetpassword/otp-verify`,
          { email, otp, isOtpLogin:true }
        );
        setLoading(false);
        if (res.data.success) {
          toast.success(res.data.message);
          setMessage("");
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        setLoading(false);
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <Layout title={"OtpLogin - Ecommerce app"}>
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
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div>
                      <p class="card-title fs-3 fw-bold mb-3">Login with OTP</p>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
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
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <p class="card-title fs-3 fw-bold mb-3">Verify OTP</p>
                      <div className="mb-3">
                      <label htmlFor="exampleInputOTP" className="form-label">
                        Enter OTP:
                      </label>
                      <input
                        type="password"
                        value={otp}
                        className="form-control"
                        id="exampleInputOTP"
                        placeholder="Enter your OTP..."
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                      </div>
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary my-2" style={{ minWidth : 110 }}>

                    { loading ? (
                      <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                      </div> ) : ( "Submit" )
                   }
                  </button>
                </form>
                <p style={{ color : 'red'}}>{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OtpLogin;
