import { publicAxios } from '../../libs/config/AxiosConfig';

const END_POINT = {
    GetAllCategories : '/category'
}

export const GetAllCategories = async (paramCategory) => {
    try{
        const response = await publicAxios.get(`${END_POINT.GetAllCategories}`,paramCategory);
        return response;
    }catch(error){
        return await error;
    }
}
