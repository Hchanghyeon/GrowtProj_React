import { access } from "fs";
import { response } from "../Common";

export async function getSpotData(num:number) {
    const option = {
        method: "GET",
    }
    return await response(`spot/all/${num}`,option);
}

export async function getCategorySpotData(category:any, num:number) {
    const option = {
        method: "GET",
    }
    return await response(`spot/category/${category}/${num}`,option);
}



export async function getSpotInfoData(contentId:any) {
    const option = {
        method: "GET",
    }
    return await response(`spot/info/${contentId}`,option);
}


export const getUserLike = async (accessToken:any) => {
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization" : `Bearer ${accessToken}`
        },
    };
    return await response("spot/likeall", option);
}

export const getChangeLikeState = async (contentsId:any, accessToken:any) => {
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization" : `Bearer ${accessToken}`
        },
    };
    return await response(`spot/like/${contentsId}`, option);
}