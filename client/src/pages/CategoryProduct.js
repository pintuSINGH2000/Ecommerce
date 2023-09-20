import axios from "axios";
import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [cart,setCart] = useCart();

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/category-product/${params.slug}`
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
        <div className="d-flex flex-wrap justify-content-evenly">
            {products?.map((p) => (
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
      </div>
    </Layout>
  );
};

export default CategoryProduct;
