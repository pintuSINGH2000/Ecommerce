import axios from "axios";
import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect (()=>{
    if(params.slug) getProductByCat();
  },[params.slug]);
  return (
    <Layout>
      <div className="container">
        <h4 className="text-center">Category - {category.name}</h4>
        <h6 className="text-center"> {products?.length} result found</h6>
        <div className="row">
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
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
                  <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
