import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../OthersComponent/Spinner";
import SectionTitle from "../../Shared/SectionTitle";
import ClassCard from "./AllClassesComponent/ClassCard";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axiosPublic("/classes");
      return data;
    },
  });
  if (isLoading) return <Spinner></Spinner>;
  return (
    <div>
      <Helmet>
        <title>FitFusion | All Classes</title>
      </Helmet>
      <div className="py-14">
        <SectionTitle title={"All Classes"}></SectionTitle>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {classes.map((classData, index) => (
          <ClassCard key={index} classData={classData} />
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
