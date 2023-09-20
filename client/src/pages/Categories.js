import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className='container'>
        <div className='row'>
        <div className="d-flex flex-wrap justify-content-evenly">
            {categories?.map((c)=>(
                   <div className='col-md-3 mt-5 mb-3 gx-3 gy-3 mx-3 ' style={{height:"10vw"}} key={c._id}>
                    <Link to={`/category/${c.slug}`} className='card justify-content-center align-items-center bg-secondary fs-3 categories'>{c.name}</Link>
                   </div>
            ))}
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Categories