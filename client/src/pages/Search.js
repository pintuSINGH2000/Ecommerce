import { Layout } from 'antd'
import React from 'react'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues] = useSearch();
  return (
    <Layout title={'Search results'}>
    <div className='container'>
         <div className='text-center'>
           <h1>Search results</h1>
           <h6>{values?.results.length<1 ? "No Result Found" : `found ${values?.results.length}`}</h6>
           <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  style={{ height: "12rem" }}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{p.name}</h5>
                  <p className="card-text text-truncate">{p.description}</p>
                  <p className="card-text">${p.price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
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
  )
}

export default Search