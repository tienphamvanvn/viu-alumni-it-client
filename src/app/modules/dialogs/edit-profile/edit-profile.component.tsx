import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { cx } from "@vechaiui/react";
import { ReactComponent as IconClose } from "@/app/assets/svgs/icon-close.svg";
import { ReactComponent as IconCamera } from "@/app/assets/svgs/icon-camera.svg";
import { User } from "@/app/shared/types/user.type";
import { AppDispatch } from "@/app/store/global.store";
import { editAccount } from "@/app/store/user/user.action";
import Form from "@/app/components/form";

const EditProfile = ({ show, handleClose, account }: PropType) => {
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
  const [preProfilePicture, setPreProfilePicture] = useState(
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

  const handleChangeInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
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

  const handleEdit = () => {
    dispatch(editAccount(userData, { coverPhoto, profilePicture })).then(() => {
      handleClose();
    });
  };

  return (
    <Transition show={show}>
      <Dialog
        as="div"
        className="flex justify-center items-center h-full w-screen fixed inset-0 z-20"
        open={show}
        onClose={handleClose}
      >
        <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-gray-900 opacity-25" />
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-out duration-150"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
          <div
            className={cx(
              "relative flex flex-col flex-grow flex-shrink w-full mx-auto rounded-2xl",
              "bg-white border",
              "dark:bg-neutral-800 dark:border-neutral-700"
            )}
            style={{
              minWidth: "600px",
              maxWidth: "80vh",
              minHeight: "400px",
              maxHeight: "90vh",
              height: "650px",
            }}
          >
            <div className="flex flex-col h-53px border-b border-gray-100">
              <div className="flex justify-center items-center w-full h-53px mx-auto px-4 rounded-t-2xl bg-white">
                <div className="flex flex-col justify-center items-start self-stretch min-h-8 min-w-14">
                  <div className="flex rounded-full group">
                    <div
                      className="flex flex-grow min-h-9 min-w-9 overflow-hidden rounded-full cursor-pointer group-hover:bg-blue-100"
                      onClick={handleClose}
                    >
                      <div className="flex flex-grow justify-center items-center">
                        <IconClose className="h-5 w-5 fill-current group-hover:text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow flex-shrink justify-center h-full overflow-hidden">
                  <div className="flex flex-col items-start">
                    <h2 className="max-w-full text-xl font-bold overflow-hidden overflow-ellipsis whitespace-nowrap leading-tight">
                      Edit profile
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-end self-stretch min-h-8 min-w-14">
                  <div
                    className="flex flex-col min-h-8 min-w-8 px-4 rounded-full cursor-pointer border bg-blue-600 border-blue-200 hover:bg-blue-700"
                    onClick={handleEdit}
                  >
                    <div className="flex justify-center items-center flex-grow">
                      <span className="leading-none text-white">Save</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-grow flex-shrink w-full max-w-600px overflow-hidden rounded-b-2xl">
              <div className="flex flex-col flex-grow flex-shrink overflow-auto">
                <div className="flex flex-col pb-16">
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
                    className="flex flex-col relative w-1/4 bg-white ml-4 border-4 border-white overflow-hidden rounded-full cursor-pointer"
                    style={{ marginTop: "-3rem", maxWidth: "8rem" }}
                  >
                    <div className="block overflow-hidden relative rounded-full">
                      <div
                        className="block w-full"
                        style={{ paddingBottom: "100%" }}
                      ></div>
                      <div className="h-full w-full absolute inset-0">
                        <div
                          className="h-full w-full absolute inset-0 bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(${
                              preProfilePicture
                                ? preProfilePicture
                                : profilePicture
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
                        onChange={handleChangeInput}
                      />
                    </Form.TextBox>
                    <Form.TextBox labelName="Bio">
                      <Form.TextArea
                        name="bio"
                        value={bio}
                        onChange={handleChangeInput}
                      />
                    </Form.TextBox>
                    <Form.TextBox labelName="Website">
                      <Form.TextBoxInput
                        type="text"
                        name="website"
                        value={website}
                        onChange={handleChangeInput}
                      />
                    </Form.TextBox>
                    <Form.TextBox labelName="Current city">
                      <Form.TextBoxInput
                        type="text"
                        name="currentCity"
                        value={currentCity}
                        onChange={handleChangeInput}
                      />
                    </Form.TextBox>
                    <Form.TextBox labelName="Hometown">
                      <Form.TextBoxInput
                        type="text"
                        name="hometown"
                        value={hometown}
                        onChange={handleChangeInput}
                      />
                    </Form.TextBox>
                    <Form.TextBox labelName="Class">
                      <Form.TextBoxInput
                        type="text"
                        name="className"
                        value={className}
                        onChange={handleChangeInput}
                      />
                    </Form.TextBox>
                    <Form.TextBox labelName="Majors">
                      <Form.TextBoxInput
                        type="text"
                        name="majors"
                        value={majors}
                        onChange={handleChangeInput}
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
                        onChange={handleChangeInput}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

type PropType = {
  show: boolean;
  handleClose: () => void;
  account: User;
};

export default EditProfile;
