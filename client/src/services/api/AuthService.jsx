
import { authAxios, publicAxios } from "../../libs/config/AxiosConfig";

const END_POINT = {
    login: '/auth/login',
    register: '/auth/register',
    userByEmail: '/user/by-email',
    logout: '/auth/logout'
}

export const LoginAuth = async (data) => {
    try {
        const response = await publicAxios.post(`${END_POINT.login}`,data);
        return response;
    } catch (error) {
        return await error;
    }
}
export const RegisterAuth = async (data) => {
    try {
        const response = await publicAxios.post(`${END_POINT.register}`,data);
        return response;
    } catch (error) {
        return await error;
    }
}

export const GetByEmailUser = async () => {
    try{
        const response = await authAxios.get(`${END_POINT.userByEmail}`);
        return response;
    }catch(error){
        return await error;
    }
}

export const LogoutAuth = async () => {
    try {
        const response = await publicAxios.post(`${END_POINT.logout}`);
        return response;
    } catch (error) {
        return await error;
    }
}