import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/global.store";
import { signIn } from "@/app/store/user/user.action";
import Form from "@/app/components/form";
import Alert from "@/app/components/alert";

const SignInPage: React.FC = () => {
  const initialState = {
    studentID: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialState);

  const { studentID, password } = userData;

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(userData));
  };

  return (
    <>
      <Alert />
      <div className="pt-7 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-semibold pt-8 pb-9">Please sign in.</h1>
          <form className="max-w-sm" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5">
              <Form.TextBox labelName="Student ID">
                <Form.TextBoxInput
                  type="text"
                  name="studentID"
                  value={studentID}
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
            </div>
            <div className="mt-6 mb-2">
              <button
                type="submit"
                className="bg-blue-600 rounded-xl w-full h-14 text-white hover:bg-blue-500 ring-blue-600  transition-all duration-300"
              >
                Sign In
              </button>
            </div>
            <div className="mt-4">
              <Link to="/signup" className="text-blue-600 hover:underline">
                Don't have an account? Create one now.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
