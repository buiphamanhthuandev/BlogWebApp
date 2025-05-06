import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetTopViewPosts } from "../../services/api/PostService";
import { Link } from "react-router";
import { ClipLoader } from "react-spinners";

export default function SidebarSection() {
  const {data: SidebarSectionQuery, isLoading} = useQuery({
    queryKey: [
      "SidebarSectionQuery"
    ],
    queryFn: async () => {
      const result = await GetTopViewPosts();
      console.log("response category top view: ", result);
      return result.data;
    }
  })
  return (
    <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
      <div className="w-full bg-white shadow flex flex-col my-4 p-6 text-3xl">Bài viết xem nhiều nhất</div>
      {
        !isLoading ? (
          SidebarSectionQuery && SidebarSectionQuery.map((item, key) => {
            return (
              <div key={item.id} className="w-full bg-white shadow flex flex-col my-4 p-6">
                <p className="text-xl font-semibold pb-5">{item.title}</p>
                <p className="pb-2">
                  {item.content}
                </p>
                <Link to={`/detail/${item.id}`}  
                  className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"
                >
                  Continue Reading
                </Link>
              </div>
            );
          })
        ): (
          <ClipLoader color="black" 
          loading={isLoading} size={100} 
          aria-label="Loading Spinner"
           />
        )
      }
    </aside>
  );
}
