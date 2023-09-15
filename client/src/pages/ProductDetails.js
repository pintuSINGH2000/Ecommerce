import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);

  //get Product
  useEffect(() => {
    if (params.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
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
        `${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`
      );
      setSimilarProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            style={{ height: "15rem" }}
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ${product.price}</h6>
          <h6>Category: {product?.category?.name}</h6> 
          <button className="btn btn-secondary ms-1">Add To Cart</button>
        </div>
      </div>
      <hr/>
      <div className="row container">
        <h4>Similar Product</h4>
        {similarProduct.length < 1 && <p className="text-center">No Similar Product Found</p>}
        <div className="d-flex flex-wrap">
          {similarProduct?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                style={{ height: "12rem" }}
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title text-truncates">{p.name}</h5>
                <p className="card-text text-truncate">{p.description}</p>
                <p className="card-text">${p.price}</p>
                <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                <button className="btn btn-secondary ms-1">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
