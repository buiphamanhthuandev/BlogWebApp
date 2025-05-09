import React from "react";
import Subscribe from "../Subscribe/Subscribe";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white pb-12">
      <div className="w-full container mx-auto flex flex-col items-center">
        <Subscribe />
        <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
          <a href="/" className="uppercase px-3">
            Về chúng tôi
          </a>
          <a href="/" className="uppercase px-3">
            Công nghệ
          </a>
          <a href="/" className="uppercase px-3">
            TĐời sống
          </a>
          <a href="/" className="uppercase px-3">
            Liện hệ với
          </a>
        </div>
        <div className="uppercase pb-6">&copy; myblog.com</div>
      </div>
    </footer>
  );
}
