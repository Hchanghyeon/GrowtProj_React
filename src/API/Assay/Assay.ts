import { response } from "../Common";


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
