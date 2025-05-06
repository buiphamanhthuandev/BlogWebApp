import { publicAxios } from '../../libs/config/AxiosConfig';

const END_POINT = {
    GetAllPosts : '/post',
    GetTopViewPosts : '/post/topview',
    GetPost: '/post'
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

export const GetTopViewPosts = async () => {
    try {
        const response = await publicAxios.get(`${END_POINT.GetTopViewPosts}`);
        return response;
    } catch (error) {
        return await error
    }
}

export const GetPost = async (id) => {
    try {
        const response = await publicAxios.get(`${END_POINT.GetPost}/${id}`);
        return response;
    } catch (error) {
        return await error;
    }
}