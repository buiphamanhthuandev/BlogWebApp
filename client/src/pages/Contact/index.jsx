import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
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
