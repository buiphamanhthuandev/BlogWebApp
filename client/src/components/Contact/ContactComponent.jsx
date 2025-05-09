import { useMutation } from '@tanstack/react-query'
import { CreateContact } from '../../services/api/ContactService'
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactValidate } from '../../libs/validates/FormValidate';

export default function ContactComponent() {

  const mutationCreateContact = useMutation({
    mutationKey: ["CreateContact"],
    mutationFn: async (data) => {
        return await CreateContact(data);
    },
    onSuccess: async (data) => {
        if(data?.status === 201){
            await Swal.fire({
                title: "Liên hệ thành công, chúng tôi sẽ phản hồi sớm nhất!",
                icon: "success"
            });
        }else if(data?.status === 500){
            await Swal.fire({
                title: "Hệ thống đang bảo trì, liên hệ lại sau nhé!",
                icon: "warning"
            });
        }
        resetContact();
    }
})
    const {
        register: ContactRegister,
        handleSubmit: handleContact,
        reset: resetContact,
        formState: { errors: ContactErrors}
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            content: ""
        },
        resolver: zodResolver(ContactValidate)
    });
    async function formActionContact(data) {
        const parseData = await ContactValidate.safeParseAsync(data);
        if(parseData.error){
            return;
        }
        await mutationCreateContact.mutateAsync(data);
    }
  return (
    <section id="contact" className="px-6 sm:px-10 md:px-16 py-12 bg-white ">
        <h2 className="text-indigo-500 text-3xl sm:text-4xl font-semibold text-center mb-6">
          Liên hệ với tôi
        </h2>
        <form method='post' onSubmit={handleContact(formActionContact)} className="max-w-2xl mx-auto w-[650px] space-y-6">
          <input
            type="text"
            placeholder="Họ và tên"
            name="username"
            {...ContactRegister("username")}
            className="w-full p-4 rounded-lg dark:bg-gray-700  bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          { ContactErrors?.username && (
            <p className="text-red-500 text-sm mt-1">
              {ContactErrors?.username.message}
            </p>
          )}
          <input
            type="text"
            placeholder="Email"
            {...ContactRegister("email")}
            className="w-full p-4 rounded-lg dark:bg-gray-700  bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          { ContactErrors?.email && (
            <p className="text-red-500 text-sm mt-1">
              {ContactErrors?.email.message}
            </p>
          )}
          <textarea
            placeholder="Nội dung"
            {...ContactRegister("content")}
            className="w-full p-4 rounded-lg dark:bg-gray-700  bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="5"
          ></textarea>
           { ContactErrors?.content && (
            <p className="text-red-500 text-sm mt-1">
              {ContactErrors?.content.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-400 dark:bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Send
          </button>
        </form>
      </section>
  )
}
