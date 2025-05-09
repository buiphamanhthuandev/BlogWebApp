import { useMutation } from '@tanstack/react-query';
import { CreateSubscribe } from '../../services/api/SubscribeService';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubscribeValidate } from '../../libs/validates/FormValidate';


export default function Subscribe() {
    const mutationSubscribe = useMutation({
        mutationKey: ["CreateSubscribe"],
        mutationFn: async (data) => {
            return await CreateSubscribe(data);
        },
        onSuccess: async (data) => {
            if(data?.status === 201){
                await Swal.fire({
                    title: "Đăng ký thành công, bạn sẽ nhận được tin khi có bài viết mới nhất!",
                    icon: "success"
                });  
            }else if(data?.status === 500){
                await Swal.fire({
                    title: "Hệ thống đang bảo trì, liên hệ lại sau nhé!",
                    icon: "warning"
                });
            }
            resetSubscribe();
        }
    })
    const {
        register: SubscribeRegister,
        handleSubmit: handleSubscribe,
        reset: resetSubscribe,
        formState: { errors: SubscribeErrors }
    } = useForm({
        defaultValues: {
            email: ""
        },
        resolver: zodResolver(SubscribeValidate)
    });
    async function formActionSubscribe(data) {
        const parseData = await SubscribeValidate.safeParseAsync(data);
        if(parseData.error){
            return;
        }
        await mutationSubscribe.mutateAsync(data);
    }
  return (
    <div className="flex h-full justify-center items-center dark:bg-gray-800">
        <div className="p-6">
        <div className="flex flex-wrap items-center w-full max-w-5xl p-5 mx-auto text-left border border-gray-200 rounded lg:flex-nowrap md:p-8 dark:border-gray-700">
            <div className="flex-1 w-full mb-5 md:mb-0 md:pr-5 lg:pr-10 md:w-1/2">
            <h3 className="mb-2 text-2xl font-bold text-gray-700 dark:text-gray-200">
                Đừng bỏ lỡ tin tức quan trọng!
            </h3>
            <p className="text-gray-500 dark:text-gray-400 ">
                Nhận tóm tắt tin tức nổi bật, hấp dẫn nhất 24 giờ qua trên Minimal Blog
            </p>
            </div>
            <div className="w-full px-1 flex-0 md:w-auto lg:w-1/2">
            <form method='post' onSubmit={handleSubscribe(formActionSubscribe)}>
                <div className="flex flex-col sm:flex-row">
                <input
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    {...SubscribeRegister("email")}
                    className="flex-1 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md sm:mr-5 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
                
                <button
                    type="submit"
                    className="w-full px-6 py-2 mt-5 text-white text-lg bg-gray-900 rounded-md sm:mt-0 sm:w-auto whitespace-nowrap dark:bg-gray-900"
                >
                    Đăng ký
                </button>
                </div>
                { SubscribeErrors?.email && (
                    <p className="text-red-500 text-sm mt-1">
                    {SubscribeErrors?.email.message}
                    </p>
                )}
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}
