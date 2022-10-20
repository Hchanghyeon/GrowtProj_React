import { response } from "../Common";


export const getAllAssay = async () => {
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
    };
    return await response("assay/all", option);
}




export const getUserAssay = async (credentials:any) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(credentials)
    };
    return await response("assay/user", option);
}


export const postAssay = async (credentials:any) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary6kFlpsUUnoYbwXnV",
        },
        body: credentials
    };
    return await response("assay/post", option);
}
