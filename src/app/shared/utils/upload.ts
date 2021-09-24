import { postDataAPI } from "./fetch-data";

export const uploadSingleFile = async (singleFile: any, token: string) => {
  const formData = new FormData();

  formData.append("single-file", singleFile);

  const { data } = await postDataAPI("upload/single-file", formData, token);

  return data.path;
};
