import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import {Link} from "react-router-dom";

const Product = () => {
  const [products, setProduct] = useState([]);

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        '/api/v1/product/get-product'
      );

      if (res?.data?.success) {
        setProduct(res?.data?.products);
      }
    } catch (error) {
      toast.error("Some thing went wrong in getting product");
    }
  };
  useEffect(() => {
    getAllProduct();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Product List</h1>
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
                <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link">
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img src={`/api/v1/product/product-photo/${p._id}`}  style={{height:"10rem"}} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{p.name}</h5>
                  <p className="card-text text-truncate">
                    {p.description}
                  </p>
                </div>
              </div>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
