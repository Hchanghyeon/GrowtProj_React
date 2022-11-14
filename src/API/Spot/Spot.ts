import { response } from "../Common";

export async function getSpotData(num: number) {
  const option = {
    method: "GET",
  };
  return await response(`spot/all/${num}`, option);
}

export async function getCategorySpotData(category: any, num: number) {
  const option = {
    method: "GET",
  };
  return await response(`spot/category/${category}/${num}`, option);
}

export async function getSpotInfoData(contentId: any) {
  const option = {
    method: "GET",
  };
  return await response(`spot/info/${contentId}`, option);
}

export const getUserLike = async (accessToken: any) => {
  const option = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await response("spot/likeall", option);
};

export const getChangeLikeState = async (contentsId: any, accessToken: any) => {
  const option = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await response(`spot/like/${contentsId}`, option);
};

export const checkSpotLike = async (contentsId: any, accessToken: any) => {
  const option = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await response(`spot/likeCheck/${contentsId}`, option);
};

export const getUserSpotLike = async (credentials: any, accessToken: any) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(credentials),
  };
  return await response(`spot/userSpotLike/`, option);
};

export const getSpotSearch = async (credentials: any) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  };
  return await response(`spot/search/`, option);
};

export const getTagSearch = async (credentials: any) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  };
  return await response(`spot/searchTag/`, option);
};

export const addSpotReview = async (contentsid: string, credentials: any) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  };
  return await response(`spot/addReview/${contentsid}`, option);
};
