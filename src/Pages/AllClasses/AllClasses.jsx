import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../OthersComponent/Spinner";
import SectionTitle from "../../Shared/SectionTitle";
import ClassCard from "./AllClassesComponent/ClassCard";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const inputRef = useRef(); // Reference to the search input
  const classesPerPage = 6;

  // Debounce logic for search term
  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay for debouncing

    return () => {
      clearTimeout(debounce);
    };
  }, [searchTerm]);

  // Focus on the search input field whenever debounced search term changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedSearchTerm]);

  // Fetch classes based on current page and debounced search term
  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes", currentPage, debouncedSearchTerm],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/classes?page=${currentPage}&limit=${classesPerPage}&search=${debouncedSearchTerm}`
      );
      return data;
    },
    keepPreviousData: true, // Ensures smoother transitions when switching pages
  });

  if (isLoading) return <Spinner />;

  const totalClasses = classes?.total || 0;
  const totalPages = Math.ceil(totalClasses / classesPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when a search term changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-14 mt-[130px]">
      <Helmet>
        <title>FitFusion | All Classes</title>
      </Helmet>
      <div>
        <SectionTitle title="All Classes" />
      </div>

      {/* Search Bar */}
      <div className="flex justify-center my-6">
        <input
          ref={inputRef} // Attach reference to the search input
          type="text"
          placeholder="Search for classes by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {classes?.data.map((classData, index) => (
          <ClassCard key={index} classData={classData} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg border ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary text-white hover:bg-secondary"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg border ${
              currentPage === index + 1
                ? "bg-primary text-white hover:bg-secondary"
                : "bg-gray-200 hover:bg-primary"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg border ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary text-white hover:bg-secondary"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllClasses;
