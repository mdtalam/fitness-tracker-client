import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../OthersComponent/Spinner";

const Community = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]); // State to hold posts with updated vote counts
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  // Fetch posts with TanStack Query
  const {
    data,
    error,
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/forum?page=${currentPage}&limit=6`
      );
      setTotalPages(response.data.totalPages);
      setPosts(response.data.posts); // Set posts into local state
      return response.data.posts;
    },
  });

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle voting (upvote/downvote)
  const handleVote = async (postId, voteType) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to log in to vote!",
      });
      return;
    }

    try {
      const endpoint = `/forum/${voteType}/${postId}`;
      const userId = user?._id;

      // Optimistic UI Update: Update vote counts locally
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          if (voteType === "upvote") {
            // Add userId to upvotes if not already present
            if (!post.upvotes.includes(userId)) {
              post.upvotes.push(userId);
              post.upvoteCount += 1;
            }
          } else if (voteType === "downvote") {
            // Add userId to downvotes if not already present
            if (!post.downvotes.includes(userId)) {
              post.downvotes.push(userId);
              post.downvoteCount += 1;
            }
          }
        }
        return post;
      });

      setPosts(updatedPosts); // Update the posts in state

      // Call API to persist vote
      await axiosSecure.put(endpoint, { userId });

      // Refetch data after voting to sync with the server
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong with your vote. Please try again later.",
      });
    }
  };

  if (loading || dataLoading) return <Spinner />;
  if (error) return <div>Error fetching posts.</div>;

  return (
    <div className="min-h-screen p-6 sm:p-8 bg-gray-50">
      <Helmet>
        <title>FitFusion | Community</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Forum
      </h2>

      {/* Post List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row space-x-0 sm:space-x-6 h-auto min-h-[300px]"
          >
            {/* Cover Image and Text */}
            <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
              <img
                src={post.image || "https://via.placeholder.com/150"} // Add default image if not available
                alt="Cover"
                className="w-full object-cover rounded-lg"
              />
            </div>
            <div className="w-full sm:w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {post.forumTitle}
                </h3>
                <p className="text-gray-600 mt-2">{post.classDetails}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                {/* Role Badge */}
                <p className="text-sm sm:text-base">{post?.userInfo?.role || "Unavailable"}</p>

                {/* Voting Buttons on the right */}
                <div className="flex items-center space-x-2">
                  <button
                    className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleVote(post._id, "upvote")}
                  >
                    <FaThumbsUp />{" "}
                    <span>{post.upvoteCount ? post.upvoteCount : 0}</span> {/* Vote count */}
                  </button>
                  <button
                    className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleVote(post._id, "downvote")}
                  >
                    <FaThumbsDown />{" "}
                    <span>{post.downvoteCount ? post.downvoteCount : 0}</span> {/* Vote count */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === 1 && "opacity-50 pointer-events-none"
          }`}
        >
          Previous
        </button>
        <p className="text-gray-600 text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === totalPages && "opacity-50 pointer-events-none"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Community;
