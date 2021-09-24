import axios from "axios";

export const postDataAPI = async (
  url: string,
  post: any | null = null,
  token: string | null = null
) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });

  return res;
};
