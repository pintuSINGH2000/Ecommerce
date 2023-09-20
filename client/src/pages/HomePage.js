import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Layout/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import useCategory from '../hooks/useCategory'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const categories=useCategory();

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length && !radio.length){
      getAllProduct();
    } 
  }, [checked.length, radio.length]);

  useEffect(() => {
    getTotal();
  }, []);

  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/product/product-count`,{ checked, radio }
        );
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/api/v1/product/product-filters/${page}`,
        { checked, radio }
      );
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //filter api
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filter
  const filterProduct = async () => {
    try {
      
      const { data } = await axios.post(
        `/api/v1/product/product-filters/${page}`,
        { checked, radio}
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length){
      setPage(1);
      getTotal();
      filterProduct();
    } 
  }, [checked, radio]);

  return (
    <Layout title={"All Product - Best Offer"}>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/Untitled.png" style={{maxHeight:"20vw"}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/Untitle2.png" style={{maxHeight:"20vw"}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/Untitled3.png" style={{maxHeight:"20vw"}} className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>

      <div className="row mt-3 margin-auto">
        <div className="col-md-2">
          <h4 className="text-center ff-Pd text-secondary text-md-start ms-4">Filter By Category</h4>
          <div className="d-flex flex-column p-lg-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, c._id);
                }}
                className="p-2"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4 ff-Pd text-secondary text-md-start ms-4">Filter By Price</h4>
          <div className="d-flex flex-column p-lg-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column p-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className="text-center ff-Pd text-secondary">All Product</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card mx-lg-5 mx-md-3 my-3 col-12 col-lg-3 col-md-5 bg-light" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top p-1 p-img"
                  style={{ height: "20rem" }}
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                  <h5 className="card-title text-truncate">{p.name}</h5>
                  <h5 className="card-title fw-bold" style={{color:"green"}}>${p.price}.00</h5>
                  </div>
                  <p className="card-text text-truncate">{p.description}</p>
                  <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary ms-1 text-uppercase fw-medium text-black"
                    style={{backgroundColor: "#00f2ff"}}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1 text-uppercase fw-medium bg-black"
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
          <div className="m-2 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ... " : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
