import React, { useState, useEffect } from "react";
import { BsBagHeart } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AllProducts.css";
import { baseUrl } from "../../Utils/Service";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import Cookies from "js-cookie";
import Loader from "../Loader/Loader"

function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedAlphabetic, setSelectedAlphabetic] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [userdata, setUserdata] = useState();
  const location = useLocation();
  const [isLoading,setIsLoading] = useState(true);

  let allCategoryState = useSelector((state) => state.UserCartReducer);

  let navegate = useNavigate();

  useEffect(() => {
    if (location?.state) {
      getProductByCategoryId(location.state.categoryId,location.state.slugName);
    }
  },[location.state]);

  useEffect(() => {
    if (Cookies.get("userdata")) {
      let userdata = JSON.parse(decodeURIComponent(Cookies.get("userdata")));
      setUserdata(userdata);
    }
    window.scroll(0,0)
  }, []);

  useEffect(() => {
    if (allCategoryState?.allCategoryList) {
      setCategoryList(allCategoryState.allCategoryList);
    }
  }, [allCategoryState]);

  useEffect(() => {
    sortedAccordingPrice();
    },[selectedPrice]);

    useEffect(() => {
      sortedAccordingName();
      },[selectedAlphabetic]); 


  const getProductByCategoryId = (category,slugName) => {
    setIsLoading(true);
    setSelectedCategory(category)
    let url = "http://localhost:8080/api/product/product_by_category";
    try {
      axios
        .post(url, { category })
        .then((response) => {
          // Use the data in your frontend logic
          if (response) {
            navegate(`/allproducts/${slugName}`)
            if(selectedAlphabetic==="AtoZ" || selectedAlphabetic==="ZtoA")
            {
              setSelectedAlphabetic("");
            }
            else if(selectedPrice==="lowToHigh" || selectedPrice==="highToLow"){
              setSelectedPrice("");
            }
            setAllProducts(response.data.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle any errors that occur during the request
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sortedAccordingPrice=()=>{
    if(selectedPrice==="lowToHigh")
    {
      if(allProducts)
      {
        const sortedPriceProducts=[...allProducts].sort((a,b)=>{
          return (a.inrDiscount-b.inrDiscount)
        })
        setAllProducts(sortedPriceProducts);
      }
    }
    else if(selectedPrice==="highToLow"){
      if(allProducts)
      {
        const sortedPriceProducts = [...allProducts].sort((a,b)=>{
          return (b.inrDiscount-a.inrDiscount)
        })
        setAllProducts(sortedPriceProducts);
      }
    }
  }

  const sortedAccordingName = () => {
    if (selectedAlphabetic === "AtoZ") {
      if (allProducts) {
        const sortedNameProducts = [...allProducts].sort((a, b) => {
          return a.slug.localeCompare(b.slug);
        });
        setAllProducts(sortedNameProducts);
      }
    } else if (selectedAlphabetic === "ZtoA") {
      if (allProducts) {
        const sortedNameProducts = [...allProducts].sort((a, b) => {
          return b.slug.localeCompare(a.slug);
        });
        setAllProducts(sortedNameProducts);
      }
    }
  };

  const handleCheckboxCategory = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleCheckboxPrice = (event) => {
    if(selectedAlphabetic==="AtoZ" || selectedAlphabetic==="ZtoA")
    {
      setSelectedAlphabetic("");
    }
    setSelectedPrice(event.target.value);
  };
  const handleCheckboxAlphabetic = (event) => {
    if(selectedPrice==="lowToHigh" || selectedPrice==="highToLow"){
      setSelectedPrice("");
    }
    setSelectedAlphabetic(event.target.value);
  };

  const getAllProducts = async () => {
    setIsLoading(true);
    setSelectedCategory("allproducts")
    let url = "http://localhost:8080/api/product/all_product";
    let response = await axios.get(url);
    try {
      if (response) {
        navegate('/allproducts')
        if(selectedAlphabetic==="AtoZ" || selectedAlphabetic==="ZtoA")
        {
          setSelectedAlphabetic("");
        }
        else if(selectedPrice==="lowToHigh" || selectedPrice==="highToLow"){
          setSelectedPrice("");
        }
        setAllProducts(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row sidebar-filter">
        <div className="col-lg-2 col-md-2 col-sm-3 col-4 ps-4 sidebar-category">
          <div className="sidebar-filter-heading">
            <h4 className="filter-top-heading">Filters</h4>
          </div>
          <div class="accordion" id="accordionExample">
            <div className="sidebar-category-filter p-1">
              <div class="accordion-item accordion-items">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button accordion-buttons"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <div className="sidebar-category-heading">
                      <span className="category-main-div">Category</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body accordion-bodies">
                    <div className="filter-category">
                      <div className="d-flex filter-checkbox">
                        <label
                          htmlFor="alproducts"
                          className="filter-category-name pt-1"
                        >
                          All Products
                        </label>
                        <input
                          type="checkbox"
                          id="outdoorSports"
                          name="category"
                          value="allproducts"
                          className="pt-1"
                          onChange={() => getAllProducts()}
                          checked={selectedCategory === "allproducts"}
                        />
                      </div>
                    </div>
                  </div>
                  {categoryList &&
                    categoryList.map((item, index) => {
                      return (
                        <div
                          class="accordion-body accordion-bodies"
                          key={index}
                        >
                          <div className="filter-category">
                            <div className="d-flex filter-checkbox">
                              <label
                                htmlFor="allproducts"
                                className="filter-category-name pt-1"
                              >
                                {item.name}
                              </label>
                              <input
                                type="checkbox"
                                id={item._id}
                                name="category"
                                value="allproducts"
                                className="pt-1"
                                onChange={()=>getProductByCategoryId(item._id,item.slug) }
                                checked={selectedCategory === item._id}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="sidebar-category-filter p-1">
              <div className="sidebar-category-heading">
                <span className="category-main-div">Price</span>
              </div>
              <div className="filter-category">
                <div className="d-flex filter-checkbox">
                <label
                  htmlFor="lowToHigh"
                  className="filter-category-name pt-1"
                >
                  Low to High
                </label>
                <input
                  type="checkbox"
                  id="lowToHigh"
                  name="price"
                  value="lowToHigh"
                  onChange={handleCheckboxPrice}
                  checked={selectedPrice === "lowToHigh"}
                />
                </div>
                <div className="d-flex filter-checkbox">
                <label
                  htmlFor="highToLow"
                  className="filter-category-name pt-1"
                >
                  High to Low
                </label>
                <input
                  type="checkbox"
                  id="highToLow"
                  name="price"
                  value="highToLow"
                  onChange={handleCheckboxPrice}
                  checked={selectedPrice === "highToLow"}
                />
                </div>
              </div>
            </div>
            <div className="sidebar-category-filter p-1">
              <div className="sidebar-category-heading">
                <span className="category-main-div">Allphabetically sort</span>
              </div>
              <div className="filter-category">
                <div className="d-flex filter-checkbox">
                <label htmlFor="AtoZ" className="filter-category-name pt-1">
                  A to Z
                </label>
                <input
                  type="checkbox"
                  id="AtoZ"
                  name="alphabeticSort"
                  value="AtoZ"
                  onChange={handleCheckboxAlphabetic}
                  checked={selectedAlphabetic === "AtoZ"}
                />
                </div>
                <div className="d-flex filter-checkbox">
                <label htmlFor="ZtoA" className="filter-category-name pt-1">
                  Z to A
                </label>
                <input
                  type="checkbox"
                  id="ZtoA"
                  name="alphabeticSort"
                  value="ZtoA"
                  onChange={handleCheckboxAlphabetic}
                  checked={selectedAlphabetic === "ZtoA"}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-10 col-md-10 col-sm-9 col-8">
            <ProductCard productList={isLoading ? isLoading : allProducts} />
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
