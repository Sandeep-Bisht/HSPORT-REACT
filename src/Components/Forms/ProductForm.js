import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Utils/Service";
import { useNavigate , useLocation} from "react-router-dom";
import "../Admin/Dashboard.css"
import axios from "axios";




const ProductForm = (props) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [products, Setproducts] = useState([]);
  const [shwoTable, setShowTable] = useState(false);
  const [formErrors, setFormErrors] = useState({});
//   const [editableData] = useState(props.history.location.state);
  let [data, Setdata] = useState({
    name: "",
    description: "",
    sortDescription:"",
    warehouse: "",
    category: "",
    subcategory: "",
    quantity: "",
    inrMrp: "",
    inrDiscount: "",
    brand: "",
    type: "",
    image: [],
    otherImage: [],
    gender:"",
    height:"",
    width:"",
    weight:"",
    reorderQuantity:"",
    maximumOrder:""
  });

  const location = useLocation();
  const navigate = useNavigate();

  const [editableData] = useState(location?.state); 
console.log(editableData,"editableData v editableData")

  const validateForm = (Value) => {
    const error = {};
    if (!Value.name) {
      error.name = "This field is required";
    }
    if (!Value.warehouse) {
      error.warehouse = "This field is required";
    }
    if (!Value.category) {
      error.category = "This field is required";
    }
    if (!Value.subcategory) {
      error.subcategory = "This field is required";
    }
    if (!Value.inrMrp) {
      error.inrMrp = "This field is required";
    }
    if (!Value.inrDiscount) {
      error.inrDiscount = "This field is required";
    }
    if (!Value.quantity) {
      error.quantity = "This field is required";
    }
    if (!Value.brand) {
      error.brand = "This field is required";
    }
    if (Value.image.length === 0) {
      error.image = "This field is required";
    }
    if (Value.otherImage.length === 0) {
      error.otherImage = "This field is required";
    }
    if(!Value.height)
    {
      error.height = "This field is required";
    }
    if(!Value.width)
    {
      error.width = "This field is required";
    }
    if(!Value.weight)
    {
      error.weight = "This field is required";
    }
    if(!Value.reorderQuantity)
    {
      error.reorderQuantity = "This field is required";
    }
    if(!Value.maximumOrder)
    {
      error.maximumOrder = "This field is required";
    }
    if(!Value.gender)
    {
      error.gender = "This field is required";
    }
    return error;
  };
   const submitData = async (e) => {
    e.preventDefault();
    const errors =  validateForm(data);
     setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("sortDescription",data.sortDescription);
      formData.append("name", data.name);
      formData.append("warehouse", data.warehouse);
      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory);
      formData.append("quantity", data.quantity);
      formData.append("height", data.height);
      formData.append("width", data.width);
      formData.append("weight", data.weight);
      formData.append("inrMrp", data.inrMrp);
      formData.append("reorderQuantity", data.reorderQuantity);
      formData.append("maximumOrder", data.maximumOrder);
      formData.append("gender", data.gender);
      formData.append("inrDiscount", data.inrDiscount);
      formData.append("brand", data.brand);
      formData.append("type", data.type);
      formData.append("image", data.image);
      for (let item of data.otherImage) {
        formData.append("otherImage", item);
      }
      const url = `${baseUrl}/api/product/add_product`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          res.json();
          navigate("/dashboard/configuration/all-prdoucts");
        })
        .then((res) => {
          // GetData();
          this.getAddOn();
        })
        .catch((err) => console.log(err));
    } else {
    }
  };

  const UpdateProduct = async (e, _id) => {
    e.preventDefault();
    const Errors =  validateForm(data);
    setFormErrors(Errors);
    if (Object.keys(Errors).length === 0) {
    const formData = new FormData();
     formData.append("_id", data._id);
     formData.append("description", data.description);
     formData.append("name", data.name);
     formData.append("warehouse", data.warehouse);
     formData.append("category", data.category);
     formData.append("subcategory", data.subcategory);
     formData.append("quantity", data.quantity);
     formData.append("inrMrp", data.inrMrp);
     formData.append("inrDiscount", data.inrDiscount);
     formData.append("manufacturer", data.manufacturer);
     formData.append("type", data.type);
     formData.append("image", data.image);
    for (let item of data.otherImage) {
       formData.append("otherImage", item);
    }
    try {
      const response = await axios.put(
        `${baseUrl}/api/product/update_product_by_id`,
        formData
      );
      if (response.status === 200) {
        // await GetData();
        setTimeout(() => {
          navigate("/dashboard/configuration/all-prdoucts");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }
  else {
    console.log("Form has errors. Please correct them.");
  }
  };


  useEffect(() => {
    // Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetBrand();
    GetCategory()
    GetSubCategory();
    // GetData();
    if (editableData) {
      let {
        category,
        subcategory,
        manufacturer,
        type,
        ...restData
      } = editableData;
      {
        category
          ? (restData.category = category._id)
          : (restData.category = "");
      }
      {
        subcategory
          ? (restData.subcategory = subcategory._id)
          : (restData.subcategory = "");
      }
      {
        manufacturer
          ? (restData.manufacturer = manufacturer._id)
          : (restData.manufacturer = "");
      }
      {
        type ? (restData.type = type._id) : (restData.type = "");
      }
      Setdata(restData);
    }
  }, []);

  const GetCategory = async () => {
    await fetch(`${baseUrl}/api/category/all_category`)
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const GetSubCategory = async () => {
    await fetch(`${baseUrl}/api/subcategory/all_subcategory`)
      .then((res) => res.json())
      .then(async (data) => {
        setSubCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
 
  const GetBrand = async () => {
    await fetch(`${baseUrl}/api/brands/all_brands`)
      .then((res) => res.json())
      .then(async (data) => {
        setBrands(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    Setdata({
      ...data,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: '' // clear error message for the current input field
    });
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const errors = { ...formErrors };

    // Validate the input field on blur
    if (!value) {
      errors[name] = `This is required`;
    }
    setFormErrors(errors);
  };

 
  return (
    <>
      <section className="allProducts-section">
        <div className="container-fluid">
          <div className="row px-0 dashboard-container">            
            <div className="col-12 px-0">
            
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4  product-form">
                        <h5>Product Creation</h5>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2 form-floating">
                          <div className="">
                          <span className="category-select-div">Product Name</span>
                            <input
                              type="text"
                              id="floatingform"
                              name="name"
                              className="form-control Dashborad-search"
                              value={data.name}
                              onChange={(e) => {
                                Setdata({ ...data, name: e.target.value });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            <p className="formerror mb-0">{formErrors.name}</p>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 image-main-div">
                              <div className="row image-second-div">
                          {
                            editableData   ?
                            <div className="d-flex">
                            <div className="col-10">
                            <div>
                              <span className="category-select-div">Image</span>
                              <input
                                type="file"
                                name="image"
                                className="form-control Dashborad-search"
                                onChange={(e) => {
                                  Setdata({ ...data, image: e.target.files[0] });
                                  // handleInputChange(e);
                                }}
                              />
                            </div>
                            <p className="formerror mb-0">{formErrors.image}</p>
                            </div>
                            <div className="col-2 p-2 d-flex align-items-end edit-images">
                            <img src={`${baseUrl}/${data?.image[0]?.path}`} alt="all-product-image" style={{width:"70px", height:"40px"}} alt=""/>
                          </div>
                          </div>:
                          <div className="col-lg-12 p-2 col-md-12 col-sm-12 col-12 choose-images-input">
                          <div>
                            <span className="category-select-div">Image</span>
                            <input
                              type="file"
                              name="image"
                              className="form-control Dashborad-search"
                              onChange={(e) => {
                                Setdata({ ...data, image: e.target.files[0] });
                                // handleInputChange(e);
                              }}
                            />
                          </div>
                          <p className="formerror mb-0">{formErrors.image}</p>
                        </div>
                          }
                          </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2">
                          <div className="">
                          <span className="category-select-div">Other Image</span>
                            <input
                              type="file"
                              className="form-control Dashborad-search"
                              multiple
                              name="otherImage"
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  otherImage: e.target.files,
                                });
                              }}
                            />
                            </div>
                            <p className="formerror mb-0">{formErrors.otherImage}</p>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2 required">
                          <div className="">
                            <span className="category-select-div">Category</span>
                            <select
                              className="form-control Dashborad-search custom-select "
                              value={data.category}
                              name="category"
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  category: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            >
                              <option value="" hidden defaultChecked>
                                Select Category
                              </option>
                              {categories.map((el, ind) => (
                                <option value={el._id} key={ind}>{el.name}</option>
                              ))}
                            </select>
                            </div>
                            <p className="formerror mb-0">{formErrors.category}</p>
                          </div>
                          {
                            editableData  &&
                           <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2">
                           <div className="row">
                             {
                               editableData ? 
                               editableData.otherImage.map((item,index)=>{
                                 return (
                                   <>
                                   <div className="col-2 p-2 d-flex align-items-end edit-images" key={index}>
                             <img src={`${baseUrl}/${item.path}`} alt="all-product-image" style={{width:"60px", height:"50px"}} alt=""/>
                          </div>
                                   </>
                                 )
                               }):""
                             }
                           </div>
                         </div>
                          }
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2 required">
                          <div className="mt-2">
                            <span className="category-select-div">SubCategory</span>
                            <select
                              className="form-control Dashborad-search custom-select"
                              value={data.subcategory}
                              name="subcategory"
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  subcategory: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            >
                              <option value="" disabled hidden>
                                Select Sub Category
                              </option>
                              {subcategories.map((el, ind) => (
                                <option value={el._id} key={ind}>{el.name}</option>
                              ))}
                            </select>
                            </div>
                            <p className="formerror mb-0">
                              {formErrors.subcategory}
                            </p>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2 required">
                          <div className="mt-2">
                            <span className="category-select-div">Brand</span>
                            <select
                              className="form-control Dashborad-search custom-select"
                              value={data.brand}
                              name="brand"
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  brand: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            >
                              <option value="" disabled hidden>
                                Select Brands
                              </option>
                              {brands.map((el, ind) =>
                                (
                                  <option value={el._id} key={ind}>{el.name}</option>
                                ) 
                              )}
                            </select>
                            </div>
                            <p className="formerror mb-0">
                              {formErrors.brand}
                            </p>
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2 required">
                          <div className="mt-2">
                            <span className="category-select-div">warehouse</span>
                            <select
                              className="form-control Dashborad-search custom-select"
                              value={data.warehouse}
                              name="warehouse"
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  warehouse: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            >
                              <option value="" disabled hidden>
                                Select warehouse
                              </option>
                              {/* {warehouse.map((el, ind) =>
                                (
                                  <option value={el._id} key={ind}>{el.name}</option>
                                ) 
                              )} */}
                              <option>
                              Hindustan Sports Dehradun
                              </option>
                            </select>
                            </div>
                            <p className="formerror mb-0">{formErrors.warehouse}</p>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2 required">
                          <div className="mt-2">
                            <span className="category-select-div">Gender</span>
                            <select
                              className="form-control Dashborad-search custom-select"
                              value={data.gender}
                              name="gender"
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  gender: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            >
                              <option value="" disabled hidden>
                                Select Gender
                              </option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Unisex</option>
                            </select>
                            </div>
                            <p className="formerror mb-0">
                              {formErrors.gender}
                            </p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">
                              Quantity
                            </span>
                            <input
                              type="number"
                              id="floatingform"
                              name="quantity"
                              className="form-control Dashborad-search"
                              defaultValue={data.quantity}
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  quantity: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            
                            <p className="formerror mb-0">{formErrors.quantity}</p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">Height</span>
                            <input
                              type="text"
                              id="floatingform"
                              name="height"
                              className="form-control Dashborad-search"
                              defaultValue={data.height}
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  height: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            <p className="formerror mb-0">{formErrors.inrMrp}</p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">Width</span>
                            <input
                              type="text"
                              id="floatingform"
                              name="width"
                              className="form-control Dashborad-search"
                              defaultValue={data.width}
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  width: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            <p className="formerror mb-0">{formErrors.width}</p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">MRP In Rupees</span>
                            <input
                              type="number"
                              id="floatingform"
                              name="inrMrp"
                              className="form-control Dashborad-search"
                              defaultValue={data.inrMrp}
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  inrMrp: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            <p className="formerror mb-0">{formErrors.inrMrp}</p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">MRP after Discount</span>
                            <input
                              type="number"
                              id="floatingform"
                              name="inrDiscount"
                              className="form-control Dashborad-search"
                              defaultValue={data.inrDiscount}
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  inrDiscount: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            <p className="formerror mb-0">{formErrors.inrDiscount}</p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">Re-Order Quantity</span>
                            <input
                              type="number"
                              id="floatingform"
                              name="reorderQuantity"
                              className="form-control Dashborad-search"
                              defaultValue={data.reorderQuantity}
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  reorderQuantity: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            <p className="formerror mb-0">{formErrors.reorderQuantity}</p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">Maximum Order</span>
                            <input
                              type="number"
                              id="floatingform"
                              name="maximumOrder"
                              className="form-control Dashborad-search"
                              defaultValue={data.maximumOrder}
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  maximumOrder: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            <p className="formerror mb-0">{formErrors.maximumOrder}</p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">Weight</span>
                            <input
                              type="text"
                              id="floatingform"
                              name="weight"
                              className="form-control Dashborad-search"
                              defaultValue={data.weight}
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  weight: e.target.value,
                                });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            <p className="formerror mb-0">{formErrors.weight}</p>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2">
                          <div className="mt-2">
                            <span className="category-select-div">Product Type</span>
                            <select
                              className="form-control Dashborad-search custom-select"
                              value={data.type}
                              name="type"
                              onChange={(e) => {
                                Setdata({ ...data, type: e.target.value });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            >
                              <option value="" hidden defaultChecked>
                                Select Product Type
                              </option>
                              <option value="Trending Product">
                                Trending Product
                              </option>
                            </select>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">Product Sort Description</span>
                            <textarea
                              className="form-control textarea h-100"
                              id="floatingform"
                              defaultValue={data.sortDescription}
                              rows="3"
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  sortDescription: e.target.value,
                                });
                              }}
                            ></textarea>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2 form-floating">
                            <div className="mt-2">
                            <span className="category-select-div">Product Description</span>
                            <textarea
                              className="form-control textarea h-100"
                              id="floatingform"
                              defaultValue={data.description}
                              rows="3"
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  description: e.target.value,
                                });
                              }}
                            ></textarea>
                            </div>
                          </div>

                          <div className="row">
                           {editableData ? (
                              <div className="col-6 p-2">
                                <button
                                  className="btn btn-registration"
                                  onClick={(e) => UpdateProduct(e, data._id)}
                                >
                                  Update
                                </button>
                              </div>
                            )  
                            :
                             ( 
                              <div className="col-6 p-2">
                                <button
                                  className="btn btn-primary submit"
                                  type="submit"
                                  onClick={(e) => submitData(e)}
                                >
                                  Submit
                                </button>
                              </div>
                            )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>               
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductForm;
