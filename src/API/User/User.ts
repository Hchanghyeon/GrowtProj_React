import { response } from "../Common";


export const sendEmail = async (credentials:any) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(credentials)
    };
    return await response("user/sendEmail", option);
}


export const checkUser = async (credentials:any) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(credentials)
    };
    return await response("user/userIdCheck", option);
}

export const signin = async (credentials:any) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(credentials)
    };

    return await response("user/userLogin", option);
}

export const signup = async (credentials:any) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(credentials)
    };

    return await response("user/userRegister/", option);
}


export const signout = async (credentials:any, accessToken:any) => {
    const option = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(credentials)
    };

    return await response("users/logout/", option);
}

export const whoami = async (accessToken:any) => {
    const option = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    return await response("users/", option);
}


export const renew = async (credentials:any, accessToken:any) => {
    const option = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(credentials)
    };

    return await response("users/", option);
}
