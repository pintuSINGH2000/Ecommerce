import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setinstance] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //remove tiem
  const removeCartItem = (pid) => {
    try {
     
        let myCart = [...cart];
        let index = myCart.findIndex((item) => item._id === pid);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      
    } catch (error) {
      console.log(error);
    }
  };

  //payment
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment =async () => {
   try{
    setLoading(true);
     const {nonce} = await instance.requestPaymentMethod();
     
     const {data} = await axios.post(
      `/api/v1/product/braintree/payment`, { nonce, cart }
    );
    toast.success("Payment Completed Successfully")
    setLoading(false);
    localStorage.removeItem("cart");
    setCart([]);
    setTimeout(() => {
      navigate("/dashboard/user/order");
    }, 1000);
   }catch(err){
    setLoading(false);
    console.log(err);
   }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2">
              {`Hello ${auth?.token ? auth?.user?.name : "My Friend"}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart?.length} item in your cart. ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {cart?.map((p) => (
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
                  <div className="col-md-8 d-md-flex">
                    <div className="w-50">
                    <h4 className="text-truncate">{p.name}</h4>
                    <p className="text-truncate">{p.description}</p>
                    <p style={{color:"green"}}>${p.price}.00</p>
                    <p>{p?.category?.name}</p>
                    </div>
                    <div className="margin-auto">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 text-center my-2">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div>
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!auth?.token  || !clientToken || !cart?.length ? (""): (
                <>
                <DropIn
                options={{
                  authorization: clientToken,
                  //  paypal: {
                  //   flow: 'vault',
                  //  },
                }}
                onInstance = {instance => setinstance(instance)}
              />
              <button className="btn btn-primary"
               onClick={handlePayment}
               disabled = { loading || !instance || !auth?.user?.address}>
               { loading ? "processing ..." : "Make Payment"}
              </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
