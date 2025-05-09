import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import SidebarSection from '../../components/SidebarSection/SidebarSection';
import { useQuery } from "@tanstack/react-query";
import { GetAllPosts, GetPostsByCategory } from "../../services/api/PostService";
import { format} from "date-fns";
import { Link, useLocation, useParams } from "react-router";
import { ClipLoader } from "react-spinners";
export default function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search' || '');

  console.log('test search : ',search);

  const { categoryid } = useParams();
  const [page, setPage] = useState(null);
  const [paramPage, setParamPage] = useState({ page: 1, limit: 5, search: search});

  const {data: HomePostQuery, isLoading } = useQuery({
    queryKey: [
      "HomePost",
      paramPage.page,
      paramPage.limit,
      categoryid,
      search
    ],
    queryFn: async () => {
      if(!categoryid){
        const result = await GetAllPosts({ params: paramPage});
        if (result.headers && result.headers["x-pagination"]) {
          const paginationData = JSON.parse(result.headers["x-pagination"]);
          setPage(paginationData);
        }
  
        return result.data;
      }else{
        const result = await GetPostsByCategory(categoryid,{ params: paramPage});
        if (result.headers && result.headers["x-pagination"]) {
          const paginationData = JSON.parse(result.headers["x-pagination"]);
          setPage(paginationData);
        }
  
        return result.data;
      }
      
    }
  })
  useEffect(() => {
    setParamPage((prev) => ({
      ...prev, 
      page: 1,
      search: search
    }));
  }, [search]);

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
      <section className="w-full md:w-2/3 flex flex-col items-center">
        {
          !isLoading ? (
            HomePostQuery && HomePostQuery.map((item, key) => {
              return(
                <article className="flex flex-col md:flex-row shadow my-4 w-full max-w-4xl" key={item.id}>
                <Link to={`/detail/${item.id}`} className="hover:opacity-80  w-full md:w-1/2">
                  <img src={item.image} className="h-[250px] w-[370px] mx-auto" alt="hình ảnh" />
                </Link>
                <div className="bg-white flex flex-col justify-start p-6 mx-auto  w-full md:w-1/2">
                  <Link to={`/detail/${item.id}`} className="text-blue-700 text-sm font-bold uppercase pb-4">
                    {item.title}
                  </Link>
                  <p className="text-sm pb-3">
                    Lượt xem: {item.view}, Ngày đăng: {format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}
                  </p>
                  <p className="pb-6">
                    {item.content.split(' ').slice(0,63).join(' ')}...
                  </p>
                  <Link to={`/detail/${item.id}`}  className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                    Continue Reading <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </article>
              );
            })
          ) : (
            <ClipLoader 
              color="black"
              loading={isLoading} size={100}
              aria-label="Loading Spinner"
            />
          )
          
        }
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
      <SidebarSection />
    </div>
  );
}
