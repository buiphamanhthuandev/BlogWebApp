import { publicAxios } from "../../libs/config/AxiosConfig";

const END_POINT = {
    RefreshToken: "http://localhost:5000/api/auth/refresh-token"
}

export const refreshToken = async () => {
    try{
        const response = await publicAxios.post(`${END_POINT.RefreshToken}`);
        return response;
    }catch(error){
        return await error;
    }
}