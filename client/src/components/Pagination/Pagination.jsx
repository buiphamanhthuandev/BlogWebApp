import React from "react";

export default function Pagination(props) {
  const totalPages = props.totalPages;
  const currentPage = props.currentPage;
  const handlePage = props.handlePage;
  const handlePreOrNext = props.handlePreOrNext;

  const pages = [];
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className="flex items-center py-8">
      <button
        className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center mr-3"
        onClick={() => {
          handlePreOrNext(false);
        }}
      >
        Prevous <i className="fas fa-arrow-right ml-2"></i>
      </button>
      {pages &&
        pages.map((item) => {
          return (
            <button
              key={item}
              onClick={() => {
                handlePage(item);
              }}
              className={`${
                item === currentPage ? "bg-blue-800 text-white" : "text-black"
              } h-10 w-10 hover:bg-blue-600 font-semibold  text-sm flex items-center justify-center`}
            >
              {item}
            </button>
          );
        })}
      <button
        onClick={() => {
            handlePreOrNext(true);
        }}
        className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3"
      >
        Next
      </button>
    </div>
  );
}
