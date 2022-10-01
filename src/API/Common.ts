import { getRefreshToken } from "./Cookie/Cookie";

import { config } from "../Config/Config";

export const BASE_URL = config.http.BASE_URL;

//응답 대기 만료 시간
export const TIME_OUT = 30 * 60 * 1000;
//토큰 redirect
export const TOKEN_REDIRECT_TIME = 60 * 1000;
//토큰 만료시간
export const TOKEN_TIME_OUT = 60 * 60 * 1000;

const error = {
    status: false,
    json: {
        error: ["연결이 원활하지 않습니다."]
    }
}

const request = (url:any, option:any) => {
    return fetch(`${BASE_URL}/${url}`, option);
}

const timeout = () => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), TIME_OUT));
}

const promise = async (url:any, option:any) => {
    return await Promise.race([
        request(url, option),
    ]);
}

const responseData = async (data:any) => {
    const status = data.ok;
    const code = data.status;
    const json = await data.json();

    return {
        status,
        code,
        json
    }
}

const responseStatus = async (url:any, option:any) => {
    const data = await promise(url, option).catch(
        () => {
            return error;
        }
    );
    return data;
}

const credential = async (url:any, option:any) => {
    const refreshToken = getRefreshToken();
    const token = await refresh(refreshToken);
    const accessToken = await token.json();

    option.headers.Authorization = `Bearer ${accessToken.access_token}`;

    const data = await responseStatus(url, option);
    return responseData(data);
}

export const refresh = async (refreshToken:any) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            refresh_token: refreshToken
        })
    }

    return await response("users/token/refresh/", option);
}

export const response = async (url:any, option:any) => {
    const data:any = await responseStatus(url, option);

    switch (data.status) {
        case false:
        case 500:
            return error;
            /*
        case 401:
            return credential(url, option)
            */
        default:
            return responseData(data);
    }
}