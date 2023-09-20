import Layout from '../components/Layout/Layout';
import React from 'react'
import { useSearch } from '../context/search'
import { toast } from 'react-toastify';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values,setValues] = useSearch();
    const [cart,setCart] = useCart();
    const navigate = useNavigate();
  return (
    <Layout title={'Search results'}>
    <div className='container'>
         <div className='text-center'>
           <h1>Search results</h1>
           <h6>{values?.results.length<1 ? "No Result Found" : `${values?.results.length} items found for ${values?.keyword}`}</h6>
           <div className="d-flex flex-wrap justify-content-evenly">
            {values?.results?.map((p) => (
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
  )
}

export default Search