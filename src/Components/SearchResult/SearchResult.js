import React,{useState,useEffect} from 'react'
import ProductCard from '../ProductCard/ProductCard'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

function SearchResult() {
    const [allProducts,setAllProducts]=useState([]);
    // const [searchData,setSearchData]=useState("");
    const location=useLocation();
   

    useEffect(()=>{   
        console.log(location,"location")
        if(location && location.state)
        {
        getAllProducts(location.state);
        }
    },[]);

    const getAllProducts = async (searchData) => {
      try {
        const url = "http://localhost:8080/api/product/all_product";
        const response = await axios.get(url);
        console.log(response.data.data, "response of products");
    
        if (response && response.data.data) {
          console.log(searchData,"searchData")
          const filterData = response.data.data.filter((el) => el.slug.includes(searchData));
          console.log(filterData, "filtedata");
          setAllProducts(filterData);
        }
      } catch (error) {
        console.log(error);
      }
    };    
      

  return (
<ProductCard  productList={allProducts}/>  )
}

export default SearchResult