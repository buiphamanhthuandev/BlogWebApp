import { z } from "zod";
export const LoginValidate = z.object({
    email: z.string({required_error: "Email is required"}).nonempty({message: "Email is required"}).email({message: "Invalid email"}),
    password: z.string({required_error: "Password is required"}).nonempty({message: "Password is required"}),
})

export const RegisterValidate = z.object({
    username: z.string({required_error: "Username is required"}).nonempty({message: "Username is required"}),
    email: z.string({required_error: "Email is required"}).nonempty({message: "Email is required"}).email({message: "Invalid email"}),
    password: z.string({required_error: "Password is required"}).nonempty({message: "Password is required"}),
})

export const ForgotPasswordValidate = z.object({
    email: z.string({required_error: "Email is required"}).nonempty({message: "Email is required"}).email({message: "Invalid email"}),
})


export const ContactValidate = z.object({
    username: z.string({required_error: "Username is required"})
        .nonempty({message: "Username is required"}),
    email: z.string()
        .nonempty({message: "Email is required"})
        .email("Invalid email"),
    message: z.string()
        .nonempty({message: "Message is required"})
});

export const CommentValidate = z.object({
    post_id: z.string({ required_error: "id không được bỏ trống"}).nonempty({message: "id không được bỏ trống"}),
    content: z.string({ required_error: "Nội dung không được bỏ trống"})
        .nonempty({ message: "Nội dung không được bỏ trống"})
});