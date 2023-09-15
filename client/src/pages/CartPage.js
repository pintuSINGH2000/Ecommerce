import Layout from "../components/Layout/Layout";
import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  const totalPrice = () => {
    try{
      let total = 0;
      cart?.map(item => { total = total + item.price })
      return total.toLocaleString("en-us",{
        style:"currency",
        currency: "USD"
      })
    }catch(error){
        console.log(error);
    }
  }

  //remove tiem
  const removeCartItem = (pid) => {
     try{
        let myCart = [...cart];
        let index = myCart.findIndex(item => item._id === pid)
        myCart.splice(index,1);
        setCart(myCart);
        localStorage.setItem('cart',JSON.stringify(myCart));
     }catch(error){
        console.log(error);
     }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart?.length} items in your cart ${
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
                <div className="row card flex-row mb-2 p-3" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top p-2"
                      style={{ height: "12rem" }}
                      width="18rem"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-8">
                  <h4 className="text-truncates">{p.name}</h4>
                  <p className="text-truncate">{p.description}</p>
                  <p >${p.price}</p>
                  <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr/>
            <h4>Total : {totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
