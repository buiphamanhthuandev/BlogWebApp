import { publicAxios } from '../../libs/config/AxiosConfig';

const END_POINT = {
    GetAllPosts : '/post'
}

export const GetAllPosts = async (paramPost) => {
    try{
        const response = await publicAxios.get(`${END_POINT.GetAllPosts}`,paramPost);
        console.log("response service", response);
        return response;
    }catch(error){
        console.log("error getpost: ", error);
        return await error;
    }
}
