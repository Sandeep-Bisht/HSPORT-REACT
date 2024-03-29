import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Utils/Service";
import { useNavigate,useLocation } from "react-router-dom";
import "../Admin/Dashboard.css"


const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [formerror, setFormerror] = useState({});
  const [editableArray, setEditableArray] = useState([]);
    const [data, Setdata] = useState({
    name: "",
    description: "",
    featuredCategories: "",
    image: [],
  });

  const history = useNavigate();
  const location = useLocation();

  const [editableData] = useState(location?.state); 

  console.log(location,"check editable location")

  
  const ValidationFrom = (value) => {
    const error = {};
    if (!value.name) {
      error.name = "This field is required";
    }
    if (value.image.length === 0) {
      error.image = "This field is required";
    }
    if (!value.featuredCategories) {
      error.featuredCategories = "This field is required";
    }
    return error;
  };
  const submitData = async (e) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("description", data.description);
       formData.append("name", data.name);
       formData.append("featuredCategories", data.featuredCategories);
       formData.append("image", data.image);
      const url = `${baseUrl}/api/category/add_category`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          res.json()
          history("/dashboard/configuration/all-categories");
        })
        .then((res) => {
          // GetCategory();

          this.getAddOn();
        })
        .catch((err) => console.log(err));
    }
  };


  useEffect(()=>{
    const arr=[];
    if (editableData) {
      arr.push(editableData)
      }
      setEditableArray(arr)
  },[])

  useEffect(() => {
    // Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetCategory();
    if (editableData) {
      let { featuredCategories, ...restData } = editableData;
      {
        featuredCategories
          ? (restData.featuredCategories = featuredCategories)
          : (restData.featuredCategories = "");
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


  const UpdateCategory = async (e, _id) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
      console.log(data.image,"image imgage")

      const formData = new FormData();
      formData.append("_id", data._id);
      formData.append("description", data.description);
      formData.append("name", data.name);
      formData.append("image", data.image);
      formData.append("slideShow", false);

      fetch(`${baseUrl}/api/category/update_category_by_id`, {
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          history("/dashboard/configuration/all-categories");
          GetCategory();
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    Setdata({
      ...data,
      [name]: value
    });
    setFormerror({
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
    setFormerror(errors);
  };
  return (
    <>
      <section className="allProducts-section">
        <div className="container-fluid">
          <div className="row px-0 dashboard-container">
            <div className="col-12 px-0">
            
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4 product-form">
                        <h5>Category Creation</h5>
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
                            <img src={`${baseUrl}/${data?.image[0]?.path}`} alt="category-image" style={{width:"70px", height:"40px"}} alt=""/>
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
                            <div>
                              <span className="category-select-div">Category Name</span>
                              <input
                                type="text"
                                id="floatingInputValue"
                                name="name"
                                className="form-control Dashborad-search"
                                defaultValue={editableData ? editableData.name : ""}
                                onChange={(e) => {
                                  Setdata({ ...data, name: e.target.value });
                                  handleInputChange(e);
                                }}
                                onBlur={handleBlur}
                              />
                            </div>
                            <p className="formerror mb-0">{formerror.name}</p>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2">
                            <div>
                              <span className="category-select-div">Category Description</span>
                              <textarea
                                className="form-control h-100"
                                id="floatingInputValue"
                                rows="5"
                                defaultValue={editableData ? editableData.description : ""}
                                onChange={(e) => {
                                  Setdata({ ...data, description: e.target.value });
                                }}
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-2">
                            <div>
                              <span className="category-select-div">Featured Categories</span>
                              <select
                                className="form-control Dashborad-search custom-select"
                                value={data.featuredCategories}
                                name="featuredCategories"
                                onChange={(e) => {
                                  Setdata({ ...data, featuredCategories: e.target.value });
                                  handleInputChange(e);
                                }}
                              >
                                <option value="" hidden className="select-dropdown">
                                  Select Category Type
                                </option>
                                <option value="Featured Categories">Featured Categories</option>
                              </select>
                            </div>
                            <p className="formerror mb-0">{formerror.featuredCategories}</p>
                          </div>
                          {editableData ? (
                            <div className="col-12 p-2">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => UpdateCategory(e, data._id)}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            <div className="col-12 p-1">
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

export default CategoryForm;
