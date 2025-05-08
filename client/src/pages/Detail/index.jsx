import React from "react";
import SidebarSection from "../../components/SidebarSection/SidebarSection";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GetPost } from "../../services/api/PostService";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import CommentComponent from "./components/CommentComponent";

export default function Detail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["Deatail", id],
    queryFn: async () => {
      const result = await GetPost(id);
      return result.data;
    },
  });

  return (
    <div className="container mx-auto flex flex-wrap py-6">
      <section className="w-full md:w-2/3 flex flex-col items-center px-3">
        {!isLoading ? (
          data && (
            <>
              <article className="flex flex-col w-[825px] shadow my-4">
                <div className="">
                  <img
                    src={data.image}
                    alt="post detail"
                    className="w-[700px] mx-auto h-[500px]"
                  />
                </div>
                <div className="bg-white flex flex-col w-[800px] mx-auto justify-start p-6">
                  <p className="text-3xl font-bold hover:text-gray-700 pb-4">
                    {data.title}
                  </p>
                  <div className="flex flex-wrap">
                  {
                    data.Categories && data.Categories.map((item, key) => {
                      return (
                        <Link
                          to={`/category/${item.id}`}
                          key={item.id}
                          className="text-blue-700 text-sm font-bold uppercase pb-4 mr-2"
                        >
                          {item.name}
                        </Link>
                      )
                    })
                  }
                  </div>
                  
                  <p className="text-sm pb-8">
                    Lượt xem: {data.view}, ngày đăng:{" "}
                    {format(new Date(data.created_at), "dd/MM/yyyy HH:mm")}
                  </p>
                  <p className="pb-3">{data.content}</p>
                </div>
              </article>
              <CommentComponent id={id}/>
            </>
          )
        ) : (
          <ClipLoader
            color="black"
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
          />
        )}
      </section>
      {/* Sidebar Section */}
      <SidebarSection />
    </div>
  );
}
