import { postDataAPI } from "./fetch-data";

export const uploadSingleFile = async (singleFile: any, token: string) => {
  const formData = new FormData();

  formData.append("single-file", singleFile);

  const { data } = await postDataAPI("upload/single-file", formData, token);

  return data.path;
};

export const uploadMultipleFile = async (files: any, token: string) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("multiple-file", files[i]);
  }

  const { data } = await postDataAPI("upload/multiple-file", formData, token);

  return data.paths;
};
