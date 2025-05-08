import { authAxios, publicAxios } from "../../libs/config/AxiosConfig";

const END_POINT = {
    GetByPostIdComments: '/comment/post',
    CreateComment: '/comment',
}

export const GetByPostIdComments = async (id, paramComment) => {
    try {
        const response = await publicAxios.get(`${END_POINT.GetByPostIdComments}/${id}`, paramComment);
        return response;
    } catch (error) {
        return await error;
    }
}

export const CreateComment = async (data) => {
    try {
        const response = await authAxios.post(`${END_POINT.CreateComment}`,data);
        return response;
    } catch (error) {
        return await error;
    }
}