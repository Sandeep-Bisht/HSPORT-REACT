import React, { useState } from 'react'
import { AiOutlineExclamationCircle } from "react-icons/ai"
import "./ForgetPassword.css"
import { useForm } from "react-hook-form";
import axios from 'axios';

function ForgetPassword() {

  const [forgetOtp, setForgetOtp] = useState(false);
  const [userNewPassword, setUserNewPassword] = useState(false);
  const [existUserData, setExistUserData] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [loginButton, setLoginButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      repassword: "",
    },
    mode: "all",
  });

  const forgetPassword = async (data) => {
    if (!data.otp) {
      checkUserExist(data.email);
    } else if (data.password && data.otp) {
      updataNewPassword(data.password);
    } else {
      verifyOtp(data.otp);
    }
  };

  const checkUserExist = async (email) => {
    let url = "http://localhost:8080/api/auth/allusers"
    const response = await axios.get(url);
    if (response) {
      let user = response.data.data.filter((item) => {
        return item.email == email;
      })
      if (user && user.length > 0) {
        setExistUserData(user)
        setForgetOtp(true);
        createOtp(email);
      }
    }
  }

  const createOtp = async (email) => {
    let url = "http://localhost:8080/api/forgetpassword/createotp";
    try {
      let response = await axios.post(url, { email: email });
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async (forgetOtp) => {
    let url = "http://localhost:8080/api/forgetpassword/verifyotp";
    try {
      let response = await axios.post(url, { otp: forgetOtp })
      if (response.data.status == 200) {
        setUserNewPassword(true)
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const updataNewPassword = async (password) => {
    let url = "http://localhost:8080/api/auth/find_by_id_update";
    try {
      const response = await axios.put(
        url,
        {
          _id: existUserData[0]?._id,
          email: existUserData[0]?.email,
          password: password,
          phonenumber: existUserData[0]?.phonenumber,
          role: existUserData[0]?.role,
          username: existUserData[0]?.username,
        }
      );
      if (response.data.status == 200) {
        setResetPassword("Success: Your password has been reset. You can now log in with your new password.")
        setLoginButton(true);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='forget-password-page'>
      <div className='container'>
        <div className='row d-flex justify-content-center'>

          <div className='col-lg-5 col-md-7 col-sm-10 col-11 mx-auto text-center'>
            <div className='card mt-3 p-4'>
              <div className='mb-3'>
                <AiOutlineExclamationCircle />
              </div>
              <h1 className='common-heading'>Forget Password</h1>
              <div>
                <p className='common-para f1'>Enter your email and we will send a OTP to reset your password</p>
              </div>
              <div>
                <form
                  className=""
                  onSubmit={handleSubmit(forgetPassword)}>
                  <div className='mt-2'>
                    <input
                      type="email"
                      placeholder='Enter your email'
                      className="form-control form-control-login "
                      {...register("email", {
                        required: true,
                        pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/,
                      })}
                    />
                    {errors?.email?.type === "required" && (
                      <p className="text-danger text-start mt-2 forget-para">This field is required</p>
                    )}
                    {errors?.email?.type === "pattern" && (
                      <p className="text-danger text-start mt-2 forget-para">
                        Please enter a valid Email
                      </p>
                    )}
                  </div>
                  {
                    forgetOtp &&
                    <div className='mt-2'>
                      <input
                        type="number"
                        placeholder='Enter otp'
                        className="form-control form-control-login"
                        {...register("otp", {
                          required: true,
                        })}
                      />
                      {errors?.otp?.type === "required" && (
                        <p className="text-danger text-start mt-2 forget-para forget-para">Please fill the otp</p>
                      )}
                    </div>
                  }
                  {
                    userNewPassword &&
                    <>
                      <div className='mt-2'>
                        <input
                          type="password"
                          placeholder='Enter new password'
                          className="form-control form-control-login "
                          {...register("password", {
                            required: true,
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                          })}
                        />
                        {errors?.password?.type === "required" && (
                          <p className="text-danger test-start mt-2 forget-para">This field is required</p>
                        )}
                        {errors?.password?.type === "pattern" && (
                          <p className="text-danger test-start mt-2 forget-para">
                            Must have more than 8 characters, one number, upper
                            & lowercase letters & special character
                          </p>
                        )}
                      </div>
                      <div className='mt-2'>
                        <input
                          type="password"
                          placeholder='Enter confirm password'
                          className="form-control form-control-login "
                          {...register("repassword", {
                            required: true,
                            validate: (val) => {
                              if (watch("password") !== val) {
                                return "Your Password Does not Match";
                              }
                            },
                          })}
                        />
                        {errors?.repassword?.type ===
                          "required" && (
                            <p className="text-danger text-start mt-2 forget-para">This field is required</p>
                          )}
                        {errors?.repassword?.type ===
                          "validate" && (
                            <p className="text-danger text-start mt-2 forget-para">Password does not match</p>
                          )}
                      </div>
                    </>
                  }
                  <div className=' m-3'>
                    {
                      loginButton ? <button
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        type="button">
                        Login
                      </button>
                        :
                        userNewPassword ?
                          <button type='submit'>updata-password</button>
                          :
                          forgetOtp ? <button type='submit'>verify-otp</button>
                            :
                            <button type='submit'>submit</button>
                    }
                  </div>
                  <div className='m-3'>
                    <p className='common-para text-success'>{resetPassword}</p>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ForgetPassword