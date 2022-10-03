import { response } from "../Common";

export async function getSpotData(category:any) {
    const option = {
        method: "GET",
    }
    return await response(`spot/${category}`,option);
}


export async function getSpotInfoData(contentId:any) {
    const option = {
        method: "GET",
    }
    return await response(`spot/info/${contentId}`,option);
}
