import { publicAxios } from '../../libs/config/AxiosConfig';

const END_POINT = {
    GetAllPosts : '/post',
    GetTopViewPosts : '/post/topview',
    GetPost: '/post',
    GetPostsByCategory: '/post/category'
}

export const GetAllPosts = async (paramPost) => {
    try{
        const response = await publicAxios.get(`${END_POINT.GetAllPosts}`,paramPost);
        return response;
    }catch(error){
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

export const GetPostsByCategory = async (categoryid, paramPost) => {
    try {
        const response = await publicAxios.get(`${END_POINT.GetPostsByCategory}/${categoryid}`, paramPost);
        console.log('test post by category', response);
        return response;
    } catch (error) {
        return await error;
    }
}