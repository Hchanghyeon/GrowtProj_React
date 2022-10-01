import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken:any) => {
    const now:any = new Date();
    const expireTime = now.setDate(now.getDate + 1); // 만료시간 + 1일
    return cookies.set(
        "refresh_token",
        refreshToken,
        {
            sameSite:"strict",
            path:"/",
            expires:new Date(expireTime)
        }
    );
}

export const getRefreshToken = () => {
    return cookies.get("refresh_token");
}

export const removeRefreshToken = () => {
    return cookies.remove(
        "refresh_token",
        {
            sameSite:"strict",
            path:"/"
        }
    )
}