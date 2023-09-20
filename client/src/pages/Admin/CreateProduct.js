import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import  axios  from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
const {Option} = Select;

const CreateProduct = () => {
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] =useState("");
  const [price,setPrice] = useState("");
  const [quantity,setQuantity] = useState("");
  const [shipping,setShipping] = useState("");
  const [photo,setPhoto] = useState("");
  const navigate = useNavigate();
  const categories = useCategory();

  //create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      productData.append("category",category);
      productData.append("shipping",shipping);
      
   const res = await axios.post(`/api/v1/product/create-product`,productData);
   if(res?.data?.success){
    toast.success(`product is Created`);
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
  return (
    <Layout title={"Dashboard - Create Product"}>
        <div className='container-fluid p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu />
            </div>
            <div className='col-md-9'>
                <h1>Create Product</h1>
                <div className='m-1 w-75'>
                  <Select
                   bordered={false}
                   placeholder="Select a Category"
                   size="large" 
                   showSearch 
                   className='form-select mb-3' onChange={(value) => {setCategory(value)}}>
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
                    {photo && (<div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt="prdouct_photo" height={'200px'} className='img img-responsive'/>
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
                    onChange={(value)=> {setShipping(value)}}>
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                  </div>
                </div>

            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct