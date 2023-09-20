import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  const [cart,setCart] = useCart();

  //get Product
  useEffect(() => {
    if (params.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/similar-product/${pid}/${cid}`
      );
      setSimilarProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
      <h1 className="text-center ff-Pd text-secondary">Product Details</h1>
        <div className="col-md-4 me-5">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            style={{ height: "15rem" }}
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6 style={{color:"green"}}>Price: ${product.price}.00</h6>
          <h6>Category: {product?.category?.name}</h6> 
          <button className="btn btn-secondary ms-1"
           onClick={() => {
                      setCart([...cart,product]);
                      localStorage.setItem('cart',JSON.stringify([...cart,product]))
                      toast.success("Item Added to Cart");}}
                      >Add To Cart</button>
        </div>
      </div>
      <hr/>
      <div className="row container">
        <h4 className="text-center ff-Pd text-secondary">Similar Product</h4>
        {similarProduct.length < 1 && <p className="text-center">No Similar Product Found</p>}
        <div className="d-flex flex-wrap">
            {similarProduct?.map((p) => (
              <div className="card m-2 col-12 col-md-3 bg-light" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top p-1 p-img"
                  style={{ height: "20rem" }}
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                  <h5 className="card-title text-truncates">{p.name}</h5>
                  <h5 className="card-title fw-bold" style={{color:"green"}}>${p.price}.00</h5>
                  </div>
                  <p className="card-text text-truncate">{p.description}</p>
                  <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary ms-1 pe-3 text-uppercase fw-medium text-black"
                    style={{backgroundColor: "#00f2ff"}}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1 pe-3 text-uppercase fw-medium bg-black"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to Cart");
                    }}
                  >
                    Add To Cart
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
