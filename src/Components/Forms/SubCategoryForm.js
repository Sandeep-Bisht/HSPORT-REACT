import React, { useEffect, useState } from "react";
import "../Admin/Dashboard.css"
import { baseUrl } from "../../Utils/Service";
import { useNavigate } from "react-router";
import {useLocation} from "react-router-dom"
import axios from "axios";

var Userdata;
const SubCategoryForm = (props) => {
  const [categories, setCategories] = useState([]);
  const [formerror, Setformerror] = useState({});
  const [editableArray,setEditableArray]=useState([]);
  const [data, Setdata] = useState({
    name: "",
    description: "",
    category: "",
    image: [],
  });

const location=useLocation();
const [editableData]=useState(location?.state);
  const history = useNavigate();

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetSubCategory();
    GetCategory();
    if (editableData) {
      let { category, ...restData } = editableData;
      {
        category
          ? (restData.category = category)
          : (restData.category = "");
      }
      Setdata(restData);
    }
  }, []);

  useEffect(()=>{
    const arr=[];
    if (editableData) {
      arr.push(editableData)
      }
      setEditableArray(arr)
  },[])

  const ValidationFrom = (value) => {
    const error = {};
    if (!value.category) {
      error.category = "This field is required";
    }
    if (!value.name) {
      error.name = "This field is required";
    }
    
    return error;
  };
  const submitData = async (e) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    Setformerror(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
       formData.append("description", data.description);
       formData.append("category", data.category);
       formData.append("name", data.name);
      formData.append("image", data.image);
      const url = `${baseUrl}/api/subcategory/add_subcategory`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          res.json();
          history("/dashboard/configuration/all-sub-categories");
        })
        .then((res) => {
          GetSubCategory();

          this.getAddOn();
        })
        .catch((err) => console.log(err));
    }
  };

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
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const UpdateSubCategory = async (e, _id) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    Setformerror(errors);
    if (Object.keys(errors).length === 0) {
    const formData = new FormData();
    await formData.append("_id", data._id);
    await formData.append("name", data.name);
    await formData.append("description", data.description);
    await formData.append("category", data.category);
    await formData.append("image", data.image);
    const response = await axios.put(
      `${baseUrl}/api/subcategory/update_subcategory_by_id`,
      formData
    );
    if (response.status === 200) {
      await GetSubCategory();
      setTimeout(() => {
        history("/dashboard/configuration/all-sub-categories");
      }, 1500);
    }
  }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    Setdata({
      ...data,
      [name]: value
    });
    Setformerror({
      ...formerror,
      [name]: '' // clear error message for the current input field
    });
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const errors = { ...formerror };

    // Validate the input field on blur
    if (!value) {
      errors[name] = `This is required`;
    }
    Setformerror(errors);
  };

  return (
    <>
      <section className="allProducts-section">
        <div className="container-fluid">
          <div className="row px-0 dashboard-container">
            <div className="col-xl-12 px-0">
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4 product-form">
                        <h5>Sports Creation</h5>
                        <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 image-main-div">
                              <div className="row image-second-div">
                          {
                            editableArray && editableArray.length>0  ?
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
                            <p className="formerror mb-0">{formerror.image}</p>
                            </div>
                            <div className="col-2 p-2 d-flex align-items-end edit-images">
                             <img src={`${baseUrl}/${data?.image[0]?.path}`} alt="sports-image" style={{width:"70px", height:"40px"}} alt=""/> 
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
                          <p className="formerror mb-0">{formerror.image}</p>
                        </div>
                          }
                          </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2">
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
                              <option value="" hidden defaultChecked className="select-dropdown">
                                Select Category
                              </option>
                              {categories.map((el, ind) => (
                                <option value={el._id} key={ind}>{el.name}</option>
                              ))}
                            </select>
                            </div>
                            <p className="formerror mb-0">{formerror.category}</p>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2">
                            <div>
                            <span className="category-select-div">SubCategory Name</span>
                            </div>
                            <input
                              type="text"
                              name="name"
                              id="floatingInputValue"
                              className="form-control Dashborad-search "
                              defaultValue={
                                editableData ? editableData.name : ""
                              }
                              onChange={(e) => {
                                Setdata({ ...data, name: e.target.value });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            <p className="formerror mb-0">{formerror.name}</p>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2">
                            <div>
                            <span className="category-select-div">SubCategory Description</span>
                            </div>
                            <textarea
                              className="form-control h-100"
                              id="floatingInputValue"
                              rows="6"
                              defaultValue={
                                editableData ? editableData.description : ""
                              }
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  description: e.target.value,
                                });
                              }}
                            ></textarea>
                          </div>
                          {editableData ? (
                            <div className="col-12 p-2">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => UpdateSubCategory(e, data._id)}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            <div className="col-12 p-2">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                  submitData(e);
                                }}
                              >
                                Submit
                              </button>
                            </div>
                           )}
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

export default SubCategoryForm;
