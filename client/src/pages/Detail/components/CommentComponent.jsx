import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import { CreateComment, GetByPostIdComments } from '../../../services/api/CommentService';
import { ClipLoader } from 'react-spinners';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentValidate } from '../../../libs/validates/FormValidate';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

export default function CommentComponent(props) {
  const id = props.id;
  const navigate = useNavigate();
  const {data, isLoading} = useQuery({
    queryKey: [
        "CommentComponent",
        id
    ],
    queryFn: async () => {
        const result = await GetByPostIdComments(id, {params: {page : 1, limit: 10}});
        return result.data;
    }
  });

  const mutationCreateComment = useMutation({
    mutationKey: ["CreateComment"],
    mutationFn: async (data) => {
      return await CreateComment(data);
    },
    onSuccess: async (data) => {
      if(data?.status === 201){
        await Swal.fire({
          title: "Bình luận thành công",
          icon: "success"
        })
        window.location.reload();
      }
      else if(data?.status === 401){
        await Swal.fire({
          title: "Bình luận được khi đã đăng nhập",
          icon: "warning"
        });
        navigate("/login");
      }else if(data?.status === 500){
        await Swal.fire({
          title: "Hệ thống đang bảo trì",
          icon: "error"
        });
      }
      resetComment();
    }
  });

  const {
    register: CommentRegister,
    handleSubmit: handleComment,
    reset: resetComment,
    formState: { errors: CommentErrors},
  } = useForm({
    defaultValues: {
      post_id : id,
      content: "",
    },
    resolver: zodResolver(CommentValidate)
  });

  async function formActionComment(data) {
    const parseData = await CommentValidate.safeParseAsync(data);
    if (parseData.error){
      return;
    }
    await mutationCreateComment.mutateAsync(data);
  }

  return (
    <section className="py-8 shadow bg-white w-[700px] mx-auto">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
      {
        !isLoading ? (
          <div className="space-y-4">
          {
              data && data.length > 0 ? (
                  data.map((item, key) => {
                      return (
                          <div key={item.id} className="bg-white p-4 rounded-lg shadow w-[650px]">
                          <div className="flex items-center mb-2">
                            <img
                              src={item.User?.avatar}
                              alt="User Avatar"
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <h3 className="font-semibold">{item.User?.username}</h3>
                              <p className="text-sm text-gray-500">
                                { format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}
                              </p>
                            </div>
                          </div>  
                          <p className="text-gray-700">
                            {item.content}
                          </p>
                          <div className="flex items-center mt-2">
                            <button className="text-blue-500 hover:text-blue-600 mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 inline"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                              </svg>
                              Like
                            </button>
                            <button className="text-gray-500 hover:text-gray-600">
                              Reply
                            </button>
                          </div>
                        </div>
                      )
                  })
              ) : (
                  <p className='text-2xl text-blue-400'>Không có bình luận nào</p>
              )
          }
        </div>
        ) : (
          <ClipLoader color="black"
          loading={isLoading} size={100}
          aria-label="Loading Spinner"/>
        )
      }


      <form 
        method='post'
        onSubmit={handleComment(formActionComment)}
       className="mt-8 bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-700 font-medium mb-2"
          >
            Bình luận
          </label>
          <input 
            type="hidden"
            id='post_id'
            name='post_id'
            {...CommentRegister("post_id")}
            defaultValue={id}
            />
            {CommentErrors?.post_id && (
            <p className="text-red-500 text-sm mt-1">
              {CommentErrors?.post_id.message}
            </p>
          )}
          <textarea
            id="content"
            name="content"
            {...CommentRegister("content")}
            
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {CommentErrors?.content && (
            <p className="text-red-500 text-sm mt-1">
              {CommentErrors?.content.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Gửi
        </button>
      </form>
    </div>
  </section>
  )
}
