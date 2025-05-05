import React from "react";

export default function Header() {
  return (
    <>
      <nav className="w-full py-4 bg-blue-800 shadow">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
          <nav>
            <ul className="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
              <li>
                <a
                  className="hover:text-gray-200 hover:underline px-4"
                  href="/"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-200 hover:underline px-4"
                  href="/"
                >
                  Về chúng tôi
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center text-lg no-underline text-white pr-6">
            <div>
              <a className="hover:text-gray-200 hover:underline px-4" href="/">
                Trang admin
              </a>
            </div>
            <div>
              <a className="hover:text-gray-200 hover:underline px-4" href="/">
                Đăng nhập
              </a>
            </div>
            <div>
              <a className="hover:text-gray-200 hover:underline px-4" href="/">
                Đăng ký
              </a>
            </div>
          </div>
        </div>
      </nav>
      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-12">
          <a
            className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
            href="/"
          >
            Minimal Blog
          </a>
          <p className="text-lg text-gray-600">Các bài viết mới nhất</p>
        </div>
      </header>
      <nav className="w-full py-4 border-t border-b bg-gray-100">
        <div className="block sm:hidden">
          <a
            href="/"
            className="md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
          >
            Topics <i className="fas ml-2"></i>
          </a>
        </div>
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <a href="/" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Kinh tế
            </a>
            <a href="/" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Đời sống
            </a>
            <a href="/" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Giải trí
            </a>
            <a href="/" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Giáo dục
            </a>
            <a href="/" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Chính trị
            </a>
            <a href="/" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Thể thao
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
