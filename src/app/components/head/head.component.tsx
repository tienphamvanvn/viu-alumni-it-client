import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { User } from "@/app/shared/types/user.type";
import { ReactComponent as IconArrowBack } from "@/app/assets/svgs/icon-arrow-back.svg";

const Head = ({
  account,
  user,
  studentIDParam,
  history,
  headline,
}: PropType) => {
  const handleGoBack = () => history.goBack();

  return (
    <div className="flex flex-col sticky top-0 z-10">
      <div className="flex flex-col cursor-pointer">
        <div className="flex justify-center items-center w-full h-53px mx-auto px-4 bg-white">
          <div className="flex flex-col justify-center items-start self-stretch min-h-8 min-w-14">
            <div className="flex rounded-full group">
              <div
                className="flex flex-grow min-h-9 min-w-9 overflow-hidden rounded-full cursor-pointer group-hover:bg-blue-100"
                onClick={handleGoBack}
              >
                <div className="flex flex-grow justify-center items-center">
                  <IconArrowBack className="h-5 w-5 fill-current group-hover:text-blue-600" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow flex-shrink justify-center h-full overflow-hidden">
            <div className="flex flex-col items-start">
              {user ? (
                <>
                  <h2 className="max-w-full text-xl font-bold overflow-hidden overflow-ellipsis whitespace-nowrap leading-tight">
                    {account && account.studentID.toString() === studentIDParam
                      ? account.fullname
                      : user.fullname}
                  </h2>
                  <div className="text-sm max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap break-words leading-tight">
                    0 Posts
                  </div>
                </>
              ) : (
                <h2 className="max-w-full text-xl font-bold overflow-hidden overflow-ellipsis whitespace-nowrap leading-tight">
                  {headline}
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type PropType = RouteComponentProps & {
  account: User | null;
  user: User | null;
  studentIDParam: string | null;
  headline: string | null;
};

export default withRouter(Head);
