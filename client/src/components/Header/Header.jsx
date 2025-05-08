import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { GetAllCategories } from "../../services/api/CategoryService";
import { Link, useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../context/AuthContext";
import { LogoutAuth } from "../../services/api/AuthService";
import Swal from "sweetalert2";

export default function Header() {
  const { data: HeaderCategoryQuery, isLoading } = useQuery({
    queryKey: ["HeaderCategory"],
    queryFn: async () => {
      const result = await GetAllCategories({ params: { page: 1, limit: 6 } });
      return result.data;
    },
  });
  const {user, clearUser} = useAuth() || {};
  const navigate = useNavigate();
   const mutationLogout = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return await LogoutAuth();
    },
    onSuccess: async (data) => {
      if(data?.status === 204 || data?.status === 200){
        localStorage.removeItem("token");
        clearUser();
        await Swal.fire({
          title: "Đăng xuất thành công",
          icon: "success"
        });

      }else if(data?.status === 500){
        await Swal.fire({
          title: "Có sự cố khi đăng xuất, hãy thử lại!",
          icon: "error"
        });
      }
      navigate("/");
    }
   });
  


  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between p-3 bg-blue-700 text-white">
        <img
          src="http://localhost:5000/uploads/a52592f9-0b13-4388-9cb1-961ed3df3ebc.jpg"
          className="h-10 rounded-full w-10"
          alt="hình ảnh logo"
          
        />
        <div className="flex md:hidden">
          <button id="hamburger" onClick={toggleMenu}>
            <img
              className={`block ${menuOpen ? 'hidden' : ''}`}
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width="48"
              height="48"
              alt="hình ảnh open menu"
            />
            <img
              className={`block ${menuOpen ? '' : 'hidden'}`}
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width="48"
              height="48"
              alt="hình ảnh close menu"
            />
          </button>
        </div>
        <div className={`toggle  ${menuOpen ? '' : 'hidden'} w-full md:w-auto md:flex text-left  text-bold mt-5 md:mt-0 border-t-2 border-blue-400 md:border-none`}>
            <Link to={'/'}
                  className="block md:inline-block hover:bg-blue-800 hover:text-white px-3 py-3 border-b-2 border-blue-400 md:border-none md:rounded"
                >
                  Trang chủ
            </Link>
            <Link to={'/about'}
                  className="block md:inline-block hover:bg-blue-800 hover:text-white px-3 py-3 border-b-2 border-blue-400 md:border-none md:rounded"
                >
                  Về chúng tôi
            </Link>
            <Link to={'/contact'}
                  className="block md:inline-block hover:bg-blue-800 hover:text-white px-3 py-3 border-b-2 border-blue-400 md:border-none md:rounded"
                >
                  Liên hệ
            </Link>
        </div>
        {
          user ? (
            <div className={`toggle  ${menuOpen ? '' : 'hidden'} w-full md:w-auto md:flex text-left text-bold md:mt-0 border-t-2 border-blue-400 md:border-none`}>
                
                {
                  user && user.role === 'admin' ? (
                    <Link to={'/'}
                      className="block md:inline-block hover:bg-blue-800 hover:text-white px-3 py-3 border-b-2 border-blue-400 md:border-none md:rounded"
                    >
                      Trang admin
                    </Link>
                  ) : ''
                }
                <Link to={'/profile'}
                      className="block md:inline-block hover:bg-blue-800 hover:text-white px-3 py-3 border-b-2 border-blue-400 md:border-none md:rounded"
                    >
                      {user.username}
                </Link>
                <button onClick={() => mutationLogout.mutate()}
                      className="block md:inline-block hover:bg-blue-800 hover:text-white px-3 py-3 border-b-2 border-blue-400 md:border-none md:rounded"
                    >
                      Đăng xuất
                </button>
            </div>
          ) : (
            <div className={`toggle  ${menuOpen ? '' : 'hidden'} w-full md:w-auto md:flex text-left text-bold md:mt-0 border-t-2 border-blue-400 md:border-none`}>
                <Link to={'/login'}
                      className="block md:inline-block hover:bg-blue-800 hover:text-white px-3 py-3 border-b-2 border-blue-400 md:border-none md:rounded"
                    >
                      Đăng nhập
                </Link>
                <Link to={'/register'}
                      className="block md:inline-block hover:bg-blue-800 hover:text-white px-3 py-3 border-b-2 border-blue-400 md:border-none md:rounded"
                    >
                      Đăng ký
                </Link>
            </div>
          )
        }

      </nav>
      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-12">
          <Link to={'/'}
            className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
          >
            Minimal Blog
          </Link>
          <div className="w-full sm:w-auto px-4 mt-5">
              <form action="/" method="GET" className="max-w-md mx-auto w-[300px] lg:w-[500px]">   
                  <div className="relative">
                      <input type="search" name="search" id="default-search" className="block w-full p-3  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." />
                      <button type="submit" className="text-white absolute end-2.5 top-1/2 -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                  </div>
              </form>
          </div>
        </div>
       
      </header>
      <nav className="w-full py-4 border-t border-b bg-gray-100">
        <div className="block sm:hidden">
          <Link to={'/'}
            className="md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
          >
            Topics <i className="fas ml-2"></i>
          </Link>
        </div>
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            {
              !isLoading ? (
                HeaderCategoryQuery && HeaderCategoryQuery.map((item, key) => {
                  return(
                    <Link to={`/category/${item.id}`} key={item.id} className="hover:bg-blue-600 hover:text-white rounded py-2 px-4 mx-2">
                     {item.name}
                    </Link>
                  );
                })
              ) : (
                <ClipLoader color="black" 
                loading={isLoading} size={100} 
                aria-label="Loading Spinner"/>
              )
            }
          </div>
        </div>
      </nav>
    </>
  );
}
