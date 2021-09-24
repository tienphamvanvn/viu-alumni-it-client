import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import { ReactComponent as IconCurrentHome } from "@/app/assets/svgs/icon-current-home.svg";
import { ReactComponent as IconLocation } from "@/app/assets/svgs/icon-location.svg";
import { ReactComponent as IconClass } from "@/app/assets/svgs/icon-class.svg";
import { ReactComponent as IconMajors } from "@/app/assets/svgs/icon-majors.svg";
import { ReactComponent as IconGender } from "@/app/assets/svgs/icon-gender.svg";
import { ReactComponent as IconLink } from "@/app/assets/svgs/icon-link.svg";
import { ReactComponent as IconInbox } from "@/app/assets/svgs/icon-inbox.svg";
import { ReactComponent as IconDate } from "@/app/assets/svgs/icon-date.svg";
import ImageCoverPhoto from "@/app/assets/images/image-cover-photo.png";
import ImageProfilePicture from "@/app/assets/images/image-profile-picture.png";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/app/store/user/user.action";
import Layout from "@/app/components/layout";
import EditProfile from "../dialogs/edit-profile";
import ButtonFollow from "@/app/components/button/button-follow";
import Head from "@/app/components/head";
import FollowsYou from "@/app/components/follows-you";

const ProfilePage: React.FC<PropType> = ({ match }) => {
  const { account, user } = useSelector(userSelector);

  const [showDialog, setShowDialog] = useState(false);

  const studentIDParam = match.params.studentID;

  const handleOpen = () => setShowDialog(true);

  const handleClose = () => setShowDialog(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser(studentIDParam));
  }, [dispatch, studentIDParam]);

  return (
    <Layout>
      <div className="flex flex-col">
        <Head
          account={account}
          user={user}
          studentIDParam={studentIDParam}
          headline="Profile"
        />
        <div className="flex flex-col">
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col w-full max-w-600px mx-auto">
              <div className="flex flex-col">
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
                          user
                            ? account &&
                              account.studentID.toString() === studentIDParam
                              ? account.coverPhoto
                              : user.coverPhoto
                            : ImageCoverPhoto
                        })`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col pt-3 px-4 mb-4">
                  <div className="flex justify-between items-end flex-wrap">
                    <div
                      className="flex flex-col relative w-1/4 min-w-12 bg-white border-4 border-white overflow-hidden rounded-full cursor-pointer"
                      style={{ marginTop: "-18%" }}
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
                                user
                                  ? account &&
                                    account.studentID.toString() ===
                                      studentIDParam
                                    ? account.profilePicture
                                    : user.profilePicture
                                  : ImageProfilePicture
                              })`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start items-end flex-wrap max-w-full">
                      {user && account && account.following.includes(user._id) && (
                        <div className="flex flex-col min-h-9 min-w-9 mb-3 mr-2 rounded-full cursor-pointer border border-blue-200 hover:bg-blue-100">
                          <div className="flex justify-center items-center flex-grow">
                            <span className="font-medium leading-none text-blue-600">
                              <IconInbox className="h-5 w-5 fill-current" />
                            </span>
                          </div>
                        </div>
                      )}
                      {account &&
                        account.studentID.toString() === studentIDParam && (
                          <>
                            <div
                              className="flex flex-col min-h-9 min-w-9 mb-3 px-4 rounded-full cursor-pointer border border-blue-200 hover:bg-blue-100"
                              onClick={handleOpen}
                            >
                              <div className="flex justify-center items-center flex-grow">
                                <span className="font-medium leading-none text-blue-600">
                                  Edit profile
                                </span>
                              </div>
                            </div>
                            <EditProfile
                              show={showDialog}
                              handleClose={handleClose}
                              account={account}
                            />
                          </>
                        )}
                      {user && (
                        <>
                          {account ? (
                            account.studentID.toString() !== studentIDParam && (
                              <ButtonFollow account={account} user={user} />
                            )
                          ) : (
                            <Link
                              to="/signin"
                              className="flex flex-col min-h-9 min-w-9 mb-3 px-4 rounded-full cursor-pointer border border-blue-200 hover:bg-blue-700 bg-blue-600"
                            >
                              <div className="flex justify-center items-center flex-grow">
                                <span className="font-medium leading-none text-white">
                                  Follow
                                </span>
                              </div>
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mt-1 mb-2">
                    <div className="flex flex-col flex-shrink max-w-full">
                      {user && (
                        <div className="flex items-center max-w-full">
                          <div className="text-xl font-extrabold overflow-hidden break-words">
                            <span>
                              {account &&
                              account.studentID.toString() === studentIDParam
                                ? account.fullname
                                : user.fullname}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-shrink">
                        <div className="overflow-hidden break-words">
                          <span>
                            {`@${
                              account &&
                              account.studentID.toString() === studentIDParam
                                ? account.studentID
                                : user
                                ? user.studentID
                                : studentIDParam
                            }`}
                          </span>
                        </div>
                        {user && account?.followers.includes(user._id) && (
                          <FollowsYou />
                        )}
                      </div>
                    </div>
                  </div>
                  {user && (
                    <>
                      {account &&
                      account.studentID.toString() === studentIDParam
                        ? account.bio.length > 0 && (
                            <div className="block mb-3">
                              <div className="flex flex-shrink">
                                <div className="overflow-hidden break-words">
                                  {account.bio}
                                </div>
                              </div>
                            </div>
                          )
                        : user.bio.length > 0 && (
                            <div className="block mb-3">
                              <div className="flex flex-shrink">
                                <div className="overflow-hidden break-words">
                                  {user.bio}
                                </div>
                              </div>
                            </div>
                          )}
                      {(user.currentCity || user.hometown) && (
                        <div className="flex flex-wrap mb-3">
                          {account &&
                          account.studentID.toString() === studentIDParam
                            ? account.currentCity.length > 0 && (
                                <div className="flex flex-1">
                                  <div className="inline-flex items-center max-w-full break-words">
                                    <IconCurrentHome className="min-w-5 h-5 mr-2" />
                                    <span className="max-w-full overflow-hidden break-words">
                                      Lives in{" "}
                                      <span className="font-medium">
                                        {account.currentCity}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              )
                            : user.currentCity.length > 0 && (
                                <div className="flex flex-1">
                                  <div className="inline-flex items-center max-w-full break-words">
                                    <IconCurrentHome className="min-w-5 h-5 mr-2" />
                                    <span className="max-w-full overflow-hidden break-words">
                                      Lives in{" "}
                                      <span className="font-medium">
                                        {user.currentCity}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              )}
                          {account &&
                          account.studentID.toString() === studentIDParam
                            ? account.hometown.length > 0 && (
                                <div className="flex flex-1">
                                  <div className="inline-flex items-center max-w-full break-words">
                                    <IconLocation className="min-w-5 h-5 mr-2" />
                                    <span className="max-w-full overflow-hidden break-words">
                                      From{" "}
                                      <span className="font-medium">
                                        {account.hometown}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              )
                            : user.hometown.length > 0 && (
                                <div className="flex flex-1">
                                  <div className="inline-flex items-center max-w-full break-words">
                                    <IconLocation className="min-w-5 h-5 mr-2" />
                                    <span className="max-w-full overflow-hidden break-words">
                                      From{" "}
                                      <span className="font-medium">
                                        {user.hometown}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              )}
                        </div>
                      )}

                      {(user.className || user.majors) && (
                        <div className="flex flex-wrap mb-3">
                          {account &&
                          account.studentID.toString() === studentIDParam
                            ? account.className.length > 0 && (
                                <div className="flex flex-1">
                                  <div className="inline-flex items-center max-w-full break-words">
                                    <IconClass className="min-w-5 h-5 mr-2" />
                                    <span className="max-w-full overflow-hidden break-words">
                                      Class{" "}
                                      <span className="font-medium">
                                        {account.className}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              )
                            : user.className.length > 0 && (
                                <div className="flex flex-1">
                                  <div className="inline-flex items-center max-w-full break-words">
                                    <IconClass className="min-w-5 h-5 mr-2" />
                                    <span className="max-w-full overflow-hidden break-words">
                                      Class{" "}
                                      <span className="font-medium">
                                        {user.className}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              )}
                          {account &&
                          account.studentID.toString() === studentIDParam
                            ? account.majors.length > 0 && (
                                <div className="flex flex-1">
                                  <div className="inline-flex items-center max-w-full break-words">
                                    <IconMajors className="min-w-5 h-5 mr-2" />
                                    <span className="max-w-full overflow-hidden break-words">
                                      Majors{" "}
                                      <span className="font-medium">
                                        {account.majors}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              )
                            : user.majors.length > 0 && (
                                <div className="flex flex-1">
                                  <div className="inline-flex items-center max-w-full break-words">
                                    <IconMajors className="min-w-5 h-5 mr-2" />
                                    <span className="max-w-full overflow-hidden break-words">
                                      Majors{" "}
                                      <span className="font-medium">
                                        {user.majors}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              )}
                        </div>
                      )}
                      <div className="flex flex-wrap mb-3">
                        {account &&
                        account.studentID.toString() === studentIDParam ? (
                          <div className="flex flex-1">
                            <div className="inline-flex items-center max-w-full break-words">
                              <IconGender className="min-w-5 h-5 mr-2" />
                              <span className="max-w-full overflow-hidden break-words">
                                Gender{" "}
                                <span className="font-medium">
                                  {account.gender}
                                </span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-1">
                            <div className="inline-flex items-center max-w-full break-words">
                              <IconGender className="min-w-5 h-5 mr-2" />
                              <span className="max-w-full overflow-hidden break-words">
                                Gender{" "}
                                <span className="font-medium">
                                  {user.gender}
                                </span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {user && (
                    <div className="block mb-3">
                      <div className="break-words">
                        {account &&
                        account.studentID.toString() === studentIDParam
                          ? account.website.length > 0 && (
                              <span className="break-words inline-flex items-center mr-3">
                                <IconLink className="h-5 mr-2" />
                                <a
                                  href={account.website}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  className="inline break-words text-blue-600 hover:underline"
                                >
                                  {account.website}
                                </a>
                              </span>
                            )
                          : user.website.length > 0 && (
                              <span className="break-words inline-flex items-center mr-3">
                                <IconLink className="h-5 mr-2" />
                                <a
                                  href={user.website}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  className="inline break-words text-blue-600 hover:underline"
                                >
                                  {user.website}
                                </a>
                              </span>
                            )}
                        {account &&
                        account.studentID.toString() === studentIDParam ? (
                          <span className="break-words inline-flex items-center mr-3">
                            <IconDate className="h-5 mr-2" />
                            Joined
                            <span className="inline break-words ml-1">
                              {moment(account.createdAt).format("MMMM YYYY")}
                            </span>
                          </span>
                        ) : (
                          <span className="break-words inline-flex items-center mr-3">
                            <IconDate className="h-5 mr-2" />
                            Joined
                            <span className="inline break-words ml-1">
                              {moment(user.createdAt).format("MMMM YYYY")}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {user && (
                    <div className="flex flex-1 flex-wrap">
                      <div className="flex flex-col mr-5">
                        {account ? (
                          <Link
                            to={`/${
                              account.studentID.toString() === studentIDParam
                                ? account.studentID
                                : user.studentID
                            }/following`}
                            className="hover:underline"
                          >
                            <span className="font-bold">
                              {account.studentID.toString() === studentIDParam
                                ? account.following.length
                                : user.following.length}
                            </span>{" "}
                            <span className="text-gray-">Following</span>
                          </Link>
                        ) : (
                          <Link to="/signin" className="hover:underline">
                            <span className="font-bold">
                              {user.following.length}
                            </span>{" "}
                            <span className="text-gray-">Following</span>
                          </Link>
                        )}
                      </div>
                      <div className="flex flex-col">
                        {account ? (
                          <Link
                            to={`/${
                              account.studentID.toString() === studentIDParam
                                ? account.studentID
                                : user.studentID
                            }/followers`}
                            className="hover:underline"
                          >
                            <span className="font-bold">
                              {account.studentID.toString() === studentIDParam
                                ? account.followers.length
                                : user.followers.length}
                            </span>{" "}
                            <span className="text-gray-">
                              {account.studentID.toString() === studentIDParam
                                ? account.followers.length > 1 ||
                                  account.followers.length === 0
                                  ? "Followers"
                                  : "Follower"
                                : user.followers.length > 1 ||
                                  user.followers.length === 0
                                ? "Followers"
                                : "Follower"}
                            </span>
                          </Link>
                        ) : (
                          <Link to="/signin" className="hover:underline">
                            <span className="font-bold">
                              {user.followers.length}
                            </span>{" "}
                            <span className="text-gray-">
                              {user.followers.length > 1 ||
                              user.followers.length === 0
                                ? "Followers"
                                : "Follower"}
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface MatchParams {
  studentID: string;
}

type PropType = RouteComponentProps<MatchParams>;

const userSelector = (state: GlobalState) => state.user;

export default ProfilePage;
