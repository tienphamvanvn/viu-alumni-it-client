import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as IconCamera } from "@/app/assets/svgs/icon-camera.svg";
import { User } from "@/app/shared/types/user.type";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { editAccount } from "@/app/store/user/user.action";
import Form from "@/app/components/form";
import Modal from "@/app/components/modal";
import UserProfilePicture from "@/app/components/user/user-profile-picture";

const EditProfile: React.FC<PropType> = ({ show, onClose, account }) => {
  const { token } = useSelector(userSelector);

  const [isLoading, setLoading] = useState<boolean>(false);

  const initialState = {
    fullname: account.fullname,
    bio: account.bio,
    website: account.website,
    currentCity: account.currentCity,
    hometown: account.hometown,
    className: account.className,
    majors: account.majors,
    gender: account.gender,
  };
  const [userData, setUserData] = useState(initialState);
  const [coverPhoto, setCoverPhoto] = useState<string | File>(
    account.coverPhoto
  );
  const [preCoverPhoto, setPreCoverPhoto] = useState(account.coverPhoto);
  const [profilePicture, setProfilePicture] = useState<string | File>(
    account.profilePicture
  );
  const [preProfilePicture, setPreProfilePicture] = useState<string | File>(
    account.profilePicture
  );

  const {
    fullname,
    bio,
    website,
    currentCity,
    hometown,
    className,
    majors,
    gender,
  } = userData;

  const dispatch = useDispatch<AppDispatch>();

  const onChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangeCoverPhoto = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    setPreCoverPhoto(URL.createObjectURL(e.currentTarget.files[0]));
    setCoverPhoto(e.currentTarget.files[0]);
  };

  const handleChangeProfilePicture = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    setPreProfilePicture(URL.createObjectURL(e.currentTarget.files[0]));
    setProfilePicture(e.currentTarget.files[0]);
  };

  const onEdit = () => {
    if (token) {
      setLoading(true);

      dispatch(editAccount(token, userData, { coverPhoto, profilePicture }))
        .then(() => {
          onClose();
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Modal
      title="Edit profile"
      modalType="edit-profile"
      show={show}
      onClose={onClose}
      onClick={onEdit}
      isLoading={isLoading}
      body={
        <>
          <div
            className="flex flex-col justify-center overflow-hidden"
            style={{ maxHeight: "200px" }}
          >
            <div className="flex flex-col border-2 border-white">
              <div className="flex flex-col flex-grow relative">
                <div className="block overflow-hidden relative">
                  <div
                    className="block w-full"
                    style={{ paddingBottom: "33.3333%" }}
                  ></div>
                  <div className="h-full w-full absolute inset-0">
                    <div
                      className="h-full w-full absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${
                          preCoverPhoto ? preCoverPhoto : coverPhoto
                        })`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-center items-center h-full w-full opacity-75 absolute top-0">
                  <div className="flex flex-col relative min-h-9 min-w-9 rounded-full cursor-pointer hover:bg-black">
                    <div className="flex justify-center items-center flex-grow font-bold text-white">
                      <IconCamera className="h-5 w-5 fill-current" />
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="absolute h-full w-full inset-0 opacity-0 overflow-hidden cursor-pointer"
                      onChange={handleChangeCoverPhoto}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col relative w-1/4 bg-white ml-4 border-4 border-white overflow-hidden rounded-full cursor-pointer -mt-12"
            style={{ maxWidth: "8rem" }}
          >
            <UserProfilePicture
              user={account}
              preProfilePicture={
                preProfilePicture ? preProfilePicture : profilePicture
              }
              type="div"
            />
            <div className="flex justify-center items-center h-full w-full opacity-75 absolute top-0">
              <div className="flex flex-col relative min-h-9 min-w-9 rounded-full cursor-pointer hover:bg-black">
                <div className="flex justify-center items-center flex-grow font-bold text-white">
                  <IconCamera className="h-5 w-5 fill-current" />
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="absolute h-full w-full inset-0 opacity-0 overflow-hidden cursor-pointer"
                  onChange={handleChangeProfilePicture}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 px-4 my-5">
            <Form.TextBox labelName="Full name">
              <Form.TextBoxInput
                type="text"
                name="fullname"
                value={fullname}
                onChange={onChangeInput}
              />
            </Form.TextBox>
            <Form.TextBox labelName="Bio">
              <Form.TextArea name="bio" value={bio} onChange={onChangeInput} />
            </Form.TextBox>
            <Form.TextBox labelName="Website">
              <Form.TextBoxInput
                type="text"
                name="website"
                value={website}
                onChange={onChangeInput}
              />
            </Form.TextBox>
            <Form.TextBox labelName="Current city">
              <Form.TextBoxInput
                type="text"
                name="currentCity"
                value={currentCity}
                onChange={onChangeInput}
              />
            </Form.TextBox>
            <Form.TextBox labelName="Hometown">
              <Form.TextBoxInput
                type="text"
                name="hometown"
                value={hometown}
                onChange={onChangeInput}
              />
            </Form.TextBox>
            <Form.TextBox labelName="Class">
              <Form.TextBoxInput
                type="text"
                name="className"
                value={className}
                onChange={onChangeInput}
              />
            </Form.TextBox>
            <Form.TextBox labelName="Majors">
              <Form.TextBoxInput
                type="text"
                name="majors"
                value={majors}
                onChange={onChangeInput}
              />
            </Form.TextBox>
            <div className="flex items-center flex-wrap">
              <label htmlFor="gender" className="mr-3">
                Select gender:{" "}
              </label>
              <select
                className="h-10 w-2/6 pl-3 pr-6 border-gray-300 placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                placeholder="Select gender"
                name="gender"
                value={gender}
                id="gender"
                onChange={onChangeInput}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </>
      }
    />
  );
};

const userSelector = (state: GlobalState) => state.user;

type PropType = {
  show: boolean;
  onClose: () => void;
  account: User;
};

export default EditProfile;
