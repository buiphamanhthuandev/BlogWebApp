import { publicAxios } from "../../libs/config/AxiosConfig";

const END_POINT = {
    GetByPostIdComments: '/comment/post'
}

export const GetByPostIdComments = async (id, paramComment) => {
    try {
        const response = await publicAxios.get(`${END_POINT.GetByPostIdComments}/${id}`, paramComment);
        console.log("response service comment", response);
        return response;
    } catch (error) {
        return await error;
    }
}