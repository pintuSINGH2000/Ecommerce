import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
    const [values,setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
         const res =await axios.get(`/api/v1/product/search/${values.keyword}`);
         setValues({...values,results:res?.data});
         navigate('/search');
        }catch(error){
          
        }
    }
  return (
      <div>
      <form className="d-flex mt-1 me-5" role="search" onSubmit={handleSubmit} >
        <input
          className="form-control rounded-0"
          type="search"
          placeholder="search..."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({...values, keyword: e.target.value})}
          style={{width:"15rem",height:"3rem"}}
        />
        <button className="btn btn-dark rounded-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
