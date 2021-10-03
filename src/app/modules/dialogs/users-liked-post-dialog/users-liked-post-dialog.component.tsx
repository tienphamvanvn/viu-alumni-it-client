import React from "react";
import { useSelector } from "react-redux";
import { User } from "@/app/shared/types/user.type";
import { GlobalState } from "@/app/store/global.store";
import Modal from "@/app/components/modal";
import FollowUserItem from "@/app/components/follow-user-item";

const UsersLikedPostDialog: React.FC<PropType> = ({ show, onClose, users }) => {
  const { account } = useSelector(userSelector);

  return (
    <Modal
      title="Likes"
      show={show}
      onClose={onClose}
      body={
        <>
          {users.map((user, index: number) => (
            <FollowUserItem key={index} account={account} user={user} />
          ))}
        </>
      }
    />
  );
};

type PropType = {
  show: boolean;
  onClose: () => void;
  users: User[];
};

const userSelector = (state: GlobalState) => state.user;

export default UsersLikedPostDialog;
