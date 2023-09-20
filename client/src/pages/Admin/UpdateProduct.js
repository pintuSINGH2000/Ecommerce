import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import  axios  from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
const {Option} = Select;

const UpdateProduct = () => {
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] =useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [shipping,setShipping] = useState("");
    const [photo,setPhoto] = useState("");
    const [id,setId] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const categories= useCategory();
  
    //get Single Product
    const getSingleProduct = async () => {
      try{
        const res=await axios.get(`/api/v1/product/get-product/${params.slug}`);
        if(res?.data?.success){
          setName(res.data.product.name);
          setDescription(res.data.product.description);
          setQuantity(res.data.product.quantity);
          setPrice(res.data.product.price);
          setId(res.data.product._id);
          setCategory(res.data.product.category._id);
          setShipping(res.data.product.shipping);
        }
        
      }catch(error){
        console.log(error);
      }
    }
    useEffect(() => {
      getSingleProduct();
       //eslint-disable-next-line 
    },[])
  
    //create product
    const handleUpdate = async (e) => {
      e.preventDefault();
      try{
        const productData = new FormData();
        productData.append("name",name);
        productData.append("description",description);
        productData.append("price",price);
        productData.append("quantity",quantity);
        photo && productData.append("photo",photo);
        productData.append("category",category);
        productData.append("shipping",shipping);
        
     const res = await axios.put(`/api/v1/product/update-product/${id}`,productData);
     if(res?.data?.success){
      toast.success(`product is Updated Successfully`);
      setTimeout(() => {
        navigate("/dashboard/admin/product");
      }, 1000);
     }else{
       toast.error(res?.data?.message)
     }
      }catch(error){
        toast.error("something went wrong");
      }
    }
    const handleDelete = async (e) => {
      try{
        let answer = window.prompt("Are you sure want to delete this product ?");
        if(!answer) return;
        const res = await axios.delete(`/api/v1/product/delete-product/${id}`);
        if(res?.data?.success){
          toast.success(`product is Deleted Successfully`);
          setTimeout(() => {
            navigate("/dashboard/admin/product");
          }, 1000);
        }
      }catch(err){

      }
    }
  return (
    <Layout title={"Dashboard - Update Product"}>
        <div className='container-fluid p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu />
            </div>
            <div className='col-md-9'>
                <h1>Update Product</h1>
                <div className='m-1 w-75'>
                  <Select
                   bordered={false}
                   placeholder="Select a Category"
                   size="large" 
                   showSearch 
                   className='form-select mb-3' onChange={(value) => {setCategory(value)}} value={category}>
                   {categories?.map(c => (
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                   ))}
                  </Select>
                  <div className='mb-3'>
                   <label className='btn btn-outline-secondary col-md-12'>
                    {photo ? photo.name : "Upload Photo"}
                    <input type='file' name="photo" accept='images/*' onChange={(e) => setPhoto(e.target.files[0])} hidden/>
                   </label>
                  </div>
                  <div className='mb-3'>
                    {photo ? (<div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt="prdouct_photo" height={'200px'} className='img img-responsive'/>
                      </div>
                      ):
                      (<div className='text-center'>
                      <img src={`/api/v1/product/product-photo/${id}`} alt="prdouct_photo" height={'200px'} className='img img-responsive'/>
                      </div>
                      )}
                  </div>
                  <div className='mb-3'>
                    <input type='text'
                    value={name}
                    placeholder='Write a name'
                    className='form-control'
                    onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <textarea type='text'
                    value={description}
                    placeholder='Write a description'
                    className='form-control'
                    onChange={(e) => setDescription(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <input type='Number'
                    value={price}
                    placeholder='Write a Price'
                    className='form-control'
                    onChange={(e) => setPrice(e.target.value)}/>
                  </div>
                  
                  <div className='mb-3'>
                    <input type="Number"
                    value={quantity}
                    placeholder='Write a Quantity'
                    className='form-control'
                    onChange={(e) => setQuantity(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <Select 
                    bordered={false}
                    placeholder="Select Shipping"
                    showSearch
                    size='large'
                    className='form-select mb-3'
                    onChange={(value)=> {setShipping(value)}}
                    value={shipping ? "Yes" : "No"}>
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
                  </div>
                </div>

            </div>
        </div>
        </div>
    </Layout>
  )
}

export default UpdateProduct