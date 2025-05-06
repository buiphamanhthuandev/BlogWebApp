import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <section
        id="home"
        className="flex-1 flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-10 md:px-16 py-12 bg-white dark:bg-gray-800"
      >
        <div className="md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold dark:text-white text-black mb-4">
            Chào mừng đến với Blog của tôi
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium dark:text-gray-300 text-gray-600">
            Đây là nơi tôi chia sẻ kiến thức, kinh nghiệm và góc nhìn về công
            nghệ, lập trình, thiết kế giao diện và cuộc sống hàng ngày.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src="http://localhost:5000/uploads/a52592f9-0b13-4388-9cb1-961ed3df3ebc.jpg"
            alt="Profile"
            className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-indigo-500 object-cover"
          />
        </div>
      </section>

      <section
        id="about"
        className="px-6 sm:px-10 md:px-16 py-12 bg-white dark:bg-gray-800"
      >
        <h2 className="text-indigo-500 text-3xl sm:text-4xl font-semibold mb-6 ">
          About Me
        </h2>
        <p className="text-lg sm:text-xl font-medium  dark:text-white text-black ">
          Tôi là một lập trình viên Fullstack, yêu thích chia sẻ kiến thức về
          phát triển web, ứng dụng destop. Với nhiều năm kinh nghiệm làm việc
          trong ngành công nghệ, tôi tin rằng việc học tập và chia sẻ là cách
          tốt nhất để phát triển bản thân.
        </p>
        <p className="text-lg sm:text-xl font-medium dark:text-white text-black">
          Blog này là không gian mở để tôi kết nối với cộng đồng, chia sẻ những
          bài học, mẹo nhỏ và hành trình phát triển kỹ năng mỗi ngày.
        </p>
      </section>

      <section
        id="services"
        className="px-6 sm:px-10 md:px-16 py-12 bg-white dark:bg-gray-800"
      >
        <h2 className="text-indigo-500 text-3xl sm:text-4xl font-semibold mb-6">
          Chủ đề chính
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-6 flex flex-col items-center text-center">
            <i className="fas fa-paint-brush text-indigo-500 text-3xl mb-4"></i>
            <h3 className="text-black dark:text-white text-2xl font-semibold mb-2">
              Lập trình Web
            </h3>
            <p className="text-black dark:text-white text-base">
              Chia sẻ kiến thức từ HTML/CSS, JavaScript đến thư viện REACTJS,
              các framework như .NET CORE MVC, .NET CORE WEB API, WPF, WINDOW
              FORM, Node.js, NEXTJS, ANGULAR.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-6 flex flex-col items-center text-center">
            <i className="fas fa-lightbulb text-indigo-500 text-3xl mb-4"></i>
            <h3 className="text-black dark:text-white text-2xl font-semibold mb-2">
              Mẹo học tập
            </h3>
            <p className="text-black dark:text-white text-base">
              Tổng hợp kinh nghiệm học hiệu quả, kỹ năng mềm cho lập trình viên.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-6 flex flex-col items-center text-center">
            <i className="fas fa-heart text-indigo-500 text-3xl mb-4"></i>
            <h3 className="text-black dark:text-white text-2xl font-semibold mb-2">
              Cuộc sống &
            </h3>
            <p className="text-black dark:text-white text-base">
              Những câu chuyện, bài học, và cảm hứng về đời sống, sức khỏe ẩm
              thực, kinh doanh, chính trị
            </p>
          </div>
        </div>
      </section>
      <section id="contact" className="px-6 sm:px-10 md:px-16 py-12 bg-white">
        <h2 className="text-indigo-500 text-3xl sm:text-4xl font-semibold text-center mb-6">
          Liên hệ với tôi
        </h2>
        <form className="max-w-2xl mx-auto space-y-6">
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full p-4 rounded-lg dark:bg-gray-700  bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-4 rounded-lg dark:bg-gray-700  bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Message"
            required
            className="w-full p-4 rounded-lg dark:bg-gray-700  bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="5"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-400 dark:bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
