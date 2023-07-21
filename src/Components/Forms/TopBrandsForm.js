import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { baseUrl } from "../../Utils/Service";
import "../Admin/Dashboard.css"
import axios from "axios";

// var Userdata;
const TopBrandsForm = (props) => {
  const [brands, setBrands] = useState([]);
  const [formerror, setFormerror] = useState({});
  const [editableArray,setEditableArray]=useState([]);
  const [data, Setdata] = useState({
    name: "",
    description: "",
    image: [],
    featuredBrands:"",
    creatorId: "",
  });
  const location=useLocation();
  const history = useNavigate();
  const [editableData]=useState(location?.state);
  useEffect(() => {
    // Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetBrands();
  if (editableData) {
    let { featuredBrands, ...restData } = editableData;
    {
      featuredBrands
        ? (restData.featuredBrands = featuredBrands)
        : (restData.featuredBrands = "");
    }
    Setdata(restData);
  }
  }, []);


  const ValidattionForm = (value) => {
    const error = {};
    if (value.image.length === 0) {
      error.image = "This field is required";
    }
    if (!value.name) {
      error.name = "This field is required";
    }
    if (!value.featuredBrands) {
      error.featuredBrands = "This field is required";
    }
    return error;
  };
  const submitData = async (e) => {
    e.preventDefault();
    const errors = ValidattionForm(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
      // data.creatorId = Userdata._id;
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("name", data.name);
      formData.append("image", data.image);
      formData.append("featuredBrands", data.featuredBrands);
      formData.append("creatorId", data.creatorId);
      const url = `${baseUrl}/api/brands/add_brands`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          res.json();
          history("/dashboard/allBrands");
        })
        .then((res) => {
          GetBrands();
          this.getAddOn();
        })

        .catch((err) => console.log(err));
    }
  };

  const GetBrands = async () => {
    await fetch(`${baseUrl}/api/brands/all_brands`)
      .then((res) => res.json())
      .then(async (data) => {
        setBrands(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const UpdateBrands = async (e, _id) => {
    e.preventDefault();
    const errors = ValidattionForm(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
    const formData = new FormData();
    await formData.append("_id", data._id);
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    await formData.append("image", data.image);
      formData.append("featuredBrands", data.featuredBrands);

    try {
      const response = await axios.put(
        `${baseUrl}/api/brands/update_brands_by_id`,
        formData
      );
      if (response.status == 200) {
        await GetBrands();
        setTimeout(() => {
          history("/dashboard/allBrands");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }
  };
  useEffect(()=>{
    const arr=[];
    if (editableData) {
      arr.push(editableData)
      }
      setEditableArray(arr)
  },[])

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
            <div className="col-xl-12 px-0">
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4 m-2 mt-4 product-form">
                        <h5>Brand Creation</h5>
                        <div className="row">
                        <div className="col-md-6 col-12 image-main-div">
                              <div className="row">
                          {
                            editableArray && editableArray.length>0  ?
                            <div className="d-flex p-2 image-second-div">
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
                            <p className="formerror">{formerror.image}</p>
                            </div>
                            <div className="col-2 p-2 d-flex align-items-end">
                             <img src={`${baseUrl}/${data?.image[0]?.path}`} style={{width:"70px", height:"30px"}} alt=""/>
                          </div>
                          </div>:
                          <div className="col-12 p-2">
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
                          <p className="formerror">{formerror.image}</p>
                        </div>
                          }
                          </div>
                          </div>
                          <div className="col-md-6 col-12 p-2">
                            <div>
                          <span className="category-select-div">Brand Name</span>
                            <input
                              type="text"
                              name="name"
                              id="floatingInputValue"
                              className="form-control Dashborad-search"
                              defaultValue={
                                editableData ? editableData.name : ""
                              }
                              onChange={(e) => {
                                Setdata({ ...data, name: e.target.value });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}

                            />
                            </div>
                            <p className="formerror">{formerror.name}</p>
                          </div>
                          <div className="col-md-6 col-12 p-2">
                            <div>
                              <span className="category-select-div">Featured Brands</span>
                              <select
                                className="form-control Dashborad-search custom-select"
                                value={data.featuredBrands}
                                name="featuredBrands"
                                onChange={(e) => {
                                  Setdata({ ...data, featuredBrands: e.target.value });
                                  handleInputChange(e);
                                }}
                              >
                                <option value="" hidden>
                                  Select Brand Type
                                </option>
                                <option value="Featured Categories">Featured Brands</option>
                              </select>
                            </div>
                            <p className="formerror">{formerror.featuredBrands}</p>
                          </div>
                          <div className="col-md-6 col-12 p-2">
                            <div>
                          <span className="category-select-div">Brand Description</span>
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
                          </div>
                          {editableData ? (
                            <div className="col-12 p-1">
                              <button
                                className="btn btn-primary"
                                id="update-btn"
                                onClick={(e) => UpdateBrands(e, data._id)}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            <div className="col-12 p-1">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => submitData(e)}
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

export default TopBrandsForm;
