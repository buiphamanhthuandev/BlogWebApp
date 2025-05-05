import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import SidebarSection from '../../components/SidebarSection/SidebarSection';
import { useQuery } from "@tanstack/react-query";
import { GetAllPosts } from "../../services/api/PostService";
import { format} from "date-fns";
export default function Home() {
  const [page, setPage] = useState(null);
  const [paramPage, setParamPage] = useState({ page: 1, limit: 5});

  const {data: HomePostQuery, isLoading } = useQuery({
    queryKey: [
      "HomePost",
      paramPage.page,
      paramPage.limit,
    ],
    queryFn: async () => {
      const result = await GetAllPosts({ params: paramPage});
      // Debug log để xem response và headers
      console.log("response service:", result);
      if (result.headers && result.headers["x-pagination"]) {
        const paginationData = JSON.parse(result.headers["x-pagination"]);
        setPage(paginationData);
        console.log("Pagination Data: ", paginationData);
      }

      return result.data;
    }
  })
  const HandlePreOrNext = (check) => {
    console.log("check: ", check);
    if(check === true){
      if(page.hasNextPage === true){
        setParamPage((prev) => ({
          ...prev, page: prev.page + 1
        }));
      }
    }
    if(check === false){
      if(page.hasPreviousPage === true){
        setParamPage((prev) => ({
          ...prev, page: prev.page - 1
        }));
      }
    }
  }
  const HandlePage = (number) => {
    console.log("i: ", number);
    setParamPage((prev) => ({
      ...prev, page: number
    }));
  }
  return (
    <div className="container mx-auto flex flex-wrap py-6">
      <section className="w-full md:w-2/3 flex flex-col items-center px-3">
        {
          HomePostQuery && HomePostQuery.map((item, key) => {
            return(
              <article className="flex flex-row shadow my-4 w-[825px] h-[332px]" key={item.id}>
              <a href="/" className="hover:opacity-75 w-1/2 p-6">
                <img src={item.image} className="h-[250px]" alt="image" />
              </a>
              <div className="bg-white flex flex-col justify-start p-6 w-1/2">
                <a href="/" className="text-blue-700 text-sm font-bold uppercase pb-4">
                  {item.title}
                </a>
                <p className="text-sm pb-3">
                  Lượt xem: {item.view}, Ngày đăng: {format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}
                </p>
                <p className="pb-6">
                  {item.content.split(' ').slice(0,63).join(' ')}...
                </p>
                <a href="/" class="uppercase text-gray-800 hover:text-black">
                  Continue Reading <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </article>
    
            );
          })
        }

        {/* Pagination Component */}
        {
          page && (
            <Pagination 
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              handlePage={HandlePage} 
              handlePreOrNext={HandlePreOrNext}/>
          )
        }
        
      </section>
      {/* Sidebar Section */}
      <SidebarSection />
    </div>
  );
}
