import { publicAxios } from "../../libs/config/AxiosConfig";

const END_POINT = {
    CreateContact: '/contact'
}

export const CreateContact = async (data) => {
    try {
        const response = await publicAxios.post(`${END_POINT.CreateContact}`, data);
        return response;
    } catch (error) {
        return await error;
    }
}