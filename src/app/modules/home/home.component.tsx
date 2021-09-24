import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/global.store";
import { signOut } from "@/app/store/user/user.action";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => dispatch(signOut());

  return (
    <div>
      HomePage{" "}
      <button
        className="btn p-3 cursor-pointer bg-blue-600 rounded-md text-white"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default HomePage;
