import React, { useState } from "react";
import { RegisterAuth } from "../../services/api/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { RegisterValidate } from "../../libs/validates/FormValidate";
import { useForm } from "react-hook-form";

export default function Register() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const mutationRegister = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data) => {
      return await RegisterAuth(data);
    },
    onSuccess: async (data) => {
      if (data?.status === 400) {
        setMessage(data.response?.data?.message);
        const result = await Swal.fire({
          title: "Đăng ký thất bại!",
          icon: "error",
        });
        if (result.isConfirmed) {
          navigate("/register");
        }
      } else if (data?.status === 409) {
        setMessage(data.response?.data?.message);
        const result = await Swal.fire({
          title: "Đăng ký thất bại!",
          icon: "error",
        });
        if (result.isConfirmed) {
          navigate("/register");
        }
      } else if (data?.status === 201) {
        const result = await Swal.fire({
          title: "Đăng ký thành công!",
          icon: "success",
        });
        if (result.isConfirmed) {
          navigate("/login");
        }
        resetRegister();
      }
    },
  });
  const {
    register: registerRegister,
    handleSubmit: handleRegister,
    reset: resetRegister,
    formState: { errors: registerErrors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterValidate),
  });
  async function formActionRegister(data) {
    const parseData = await RegisterValidate.safeParseAsync(data);
    if (parseData.error) {
      console.error("Validation Error: ", parseData.error);
      return;
    }
    await mutationRegister.mutateAsync(data);
    console.log("login: ", registerRegister);
  }
  return (
    <div className="py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
          <div className="flex h-full flex-col justify-center gap-4 p-6">
            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              {message && <div className="text-red-500">{message}</div>}
              <form
                method="post"
                onSubmit={handleRegister(formActionRegister)}
                className="flex flex-col gap-4 pb-4"
              >
                <h1 className="mb-4 text-2xl font-bold  dark:text-white">
                  Đăng ký tài khoản
                </h1>
                <div>
                  <div className="mb-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      Tên đăng nhập
                    </label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <div className="relative w-full">
                      <input
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                        id="username"
                        name="username"
                        autoComplete="username"
                        placeholder="tên đăng nhập"
                        {...registerRegister("username")}
                      />
                      {registerErrors.username && (
                        <p className="text-red-500 text-sm mt-1">
                          {registerErrors.username.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      Email
                    </label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <div className="relative w-full">
                      <input
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                        id="email"
                        autoComplete="username"
                        name="email"
                        placeholder="email@example.com"
                        {...registerRegister("email")}
                      />
                      {registerErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {registerErrors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      Mật khẩu
                    </label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <div className="relative w-full">
                      <input
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        name="password"
                        placeholder="********"
                        {...registerRegister("password")}
                      />
                      {registerErrors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {registerErrors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                  >
                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                      Tạo tài khoản
                    </span>
                  </button>
                </div>
              </form>
              <div className="min-w-[270px]">
                <div className="mt-4 text-center dark:text-gray-200">
                  Bạn đã có tài khoản?
                  <Link
                    className="text-blue-500 underline hover:text-blue-600"
                    to={"/login"}
                  >
                    Đăng nhập ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
