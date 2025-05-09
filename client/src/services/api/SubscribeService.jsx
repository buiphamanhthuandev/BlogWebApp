import { publicAxios } from "../../libs/config/AxiosConfig";
const END_POINT = {
    CreateSubscribe: '/subscribe'
}

export const CreateSubscribe = async (data) => {
    try {
        const response = await publicAxios.post(`${END_POINT.CreateSubscribe}`, data);
        return response;
    } catch (error) {
        return await error;
    }
}