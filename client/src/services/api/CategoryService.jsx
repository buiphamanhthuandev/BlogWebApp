import { publicAxios } from '../../libs/config/AxiosConfig';

const END_POINT = {
    GetAllCategories : '/category'
}

export const GetAllCategories = async (paramCategory) => {
    try{
        const response = await publicAxios.get(`${END_POINT.GetAllCategories}`,paramCategory);
        console.log("response category service", response);
        return response;
    }catch(error){
        console.log("error getpost: ", error);
        return await error;
    }
}
