import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Button, Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("");
  const [visible,setVisible] = useState(false);
  const [selected,setSelected] = useState(null);
  const [updatedName,setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
   const res = await axios.post(`/api/v1/category/create-category`,{name});
   if(res.data.success){
    toast.success(`${name} is Created`);
    setName("");
    getAllCategory();
   }else{
    toast.error(res.data.message)
   }
    }catch(error){
      toast.error("something went wrong in input form");
    }
  }

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`api/v1/category/get-category`);
      if (res?.data?.success) {
        setCategories(res?.data?.category);
      }
    } catch (error) {
      toast.error("Some thing went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
     //eslint-disable-next-line 
  }, []);
  //Edit category
  const handleUpdate = async (e) =>{
    e.preventDefault();
    try{
      const res = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
      if(res.data.success){
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }else{
        toast.error(res.data.message);
      }
    }catch(error){
      toast.error('SomeThing went wrong');
    }
  }
//handle delte category
  const handleDelete = async (id) =>{
    try{
      const res = await axios.delete(`/api/v1/category/delete-category/${id}`,{name:updatedName})
      if(res.data.success){
        toast.success(`Category is Deleted`);
        getAllCategory();
      }else{
        toast.error(res.data.message);
      }
    }catch(error){
      toast.error('SomeThing went wrong');
    }
  }

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="p-3">Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {categories?.map((c) => (
                  <>
                  <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                      <button className="btn btn-primary ms-2" onClick={()=> {setVisible(true);setUpdatedName(c.name);setSelected(c)}}>Edit</button>
                      <button className="btn btn-danger ms-2"  onClick={()=> {handleDelete(c._id)}}>Delete</button>
                      </td>
                  </tr>
                  </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <h3>Edit Category</h3>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
