import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/global.store";
import { signUp } from "@/app/store/user/user.action";
import Form from "@/app/components/form";
import Alert from "@/app/components/alert";

const SignUpPage: React.FC = () => {
  const initialState = {
    fullname: "",
    studentID: "",
    email: "",
    password: "",
    gender: "Male",
  };

  const [userData, setUserData] = useState(initialState);

  const { fullname, studentID, email, password, gender } = userData;

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUp(userData));
  };

  return (
    <>
      <Alert />
      <div className="pt-7 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-semibold pt-8 pb-9">Please sign up.</h1>
          <form className="max-w-sm" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5">
              <Form.TextBox labelName="Full name">
                <Form.TextBoxInput
                  type="text"
                  name="fullname"
                  value={fullname}
                  onChange={handleChangeInput}
                />
              </Form.TextBox>
              <Form.TextBox labelName="Student ID">
                <Form.TextBoxInput
                  type="text"
                  name="studentID"
                  value={studentID}
                  onChange={handleChangeInput}
                />
              </Form.TextBox>
              <Form.TextBox labelName="Email">
                <Form.TextBoxInput
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                />
              </Form.TextBox>
              <Form.TextBox labelName="Password">
                <Form.TextBoxInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChangeInput}
                />
              </Form.TextBox>
              <div className="block">
                <label htmlFor="Male" className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    id="Male"
                    defaultChecked
                    className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-600 transition-all duration-300"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label
                  htmlFor="Female"
                  className="inline-flex items-center ml-10"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    id="Female"
                    className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-600 transition-all duration-300"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label
                  htmlFor="Other"
                  className="inline-flex items-center ml-10"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    id="Other"
                    className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-600 transition-all duration-300"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>
            <div className="mt-6 mb-2">
              <button
                type="submit"
                className="bg-blue-600 rounded-xl w-full h-14 text-white hover:bg-blue-500 ring-blue-600  transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-4">
              <Link to="/signin" className="text-blue-600 hover:underline">
                Already have an account? Sign in now.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
