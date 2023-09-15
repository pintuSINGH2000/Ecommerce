import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Layout/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart,setCart] = useCart();


  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked, radio]);

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (res?.data?.success) {
        setCategories(res?.data?.category);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

   //get Total Count
   const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async() =>{
    try{
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setProducts([...products,...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if(page === 1) return;
     loadMore();
  },[page])

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
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Product -Best Offer"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
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
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column p-lg-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column p-lg-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className="text-center">All Product</h1>
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
                  <button className="btn btn-secondary ms-1" onClick={() => {
                      setCart([...cart,p]);
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success("Item Added to Cart");
                  }} >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
           {products && products.length <total && (
            <button className="btn btn-warning" onClick={(e) => {
              e.preventDefault();
              setPage(page+1);
            }}>
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
