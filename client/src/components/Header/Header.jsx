import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetAllCategories } from "../../services/api/CategoryService";
import { Link } from "react-router";
import { ClipLoader } from "react-spinners";

export default function Header() {
  const {data: HeaderCategoryQuery, isLoading} = useQuery({
    queryKey:[
      'HeaderCategory',
    ],
    queryFn: async () => {
      const result = await GetAllCategories({ params: {page: 1, limit: 6}});
      console.log("category query", result);
      return result.data;
    }
  })
  return (
    <>
      <nav className="w-full py-4 bg-blue-800 shadow">
        <div className="w-full container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-4">
          <nav className="w-full lg:w-auto">
            <ul className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 font-bold text-sm text-white uppercase">
              <li>
                <Link to={'/'}
                  className="hover:text-gray-200 hover:underline px-4"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to={'/about'}
                  className="hover:text-gray-200 hover:underline px-4"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to={'/contact'}
                  className="hover:text-gray-200 hover:underline px-4"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center text-lg no-underline text-white pr-6">
            <div>
              <Link to={'/'} 
                className="hover:text-gray-200 hover:underline px-4">
                Trang admin
              </Link>
            </div>
            <div>
              <Link to={'/'}
                className="hover:text-gray-200 hover:underline px-4">
                Đăng nhập
              </Link>
            </div>
            <div>
              <Link to={'/'}
               className="hover:text-gray-200 hover:underline px-4">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-12">
          <Link to={'/'}
            className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
          >
            Minimal Blog
          </Link>
          <div className="w-full sm:w-auto px-4 mt-5">
              <form className="max-w-md mx-auto w-[300px] lg:w-[500px]">   
                  <div className="relative">
                      <input type="search" id="default-search" className="block w-full p-3  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
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
                    <Link to={'/'} key={item.id} className="hover:bg-blue-600 hover:text-white rounded py-2 px-4 mx-2">
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
