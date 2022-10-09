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
