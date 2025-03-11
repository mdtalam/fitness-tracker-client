import { useQuery } from "@tanstack/react-query";
import "animate.css";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Spinner from "../../../OthersComponent/Spinner";
import SectionTitle from "../../../Shared/SectionTitle";
import { BorderBeam } from "../../../components/magicui/border-beam";
import { Lens } from "../../../components/magicui/lens";
import { ShimmerButton } from "../../../components/magicui/shimmer-button";

const CommunityPost = () => {
  const axiosPublic = useAxiosPublic();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch the latest 6 forum posts
  const { data: forumData, isLoading } = useQuery({
    queryKey: ["forum", 1, 6],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/forum?page=1&limit=6`);
      return data;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false); // Reset animation
            setTimeout(() => {
              setIsVisible(true); // Trigger animation again
            }, 100);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (isLoading) return <Spinner />;

  const posts = forumData?.posts || [];

  return (
    <div className="my-14 max-w-screen-2xl mx-auto" ref={sectionRef}>
      <SectionTitle
        title={"Latest Community Posts"}
        subTitle={
          "Stay updated with the latest fitness tips, success stories, and community highlights from FitFusion!"
        }
      />
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
          isVisible ? "animate__animated animate__zoomIn" : "opacity-0"
        }`}
      >
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative overflow-hidden p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <BorderBeam
              duration={6}
              size={400}
              className="from-transparent via-red-500 to-transparent"
            />
            <BorderBeam
              duration={6}
              delay={3}
              size={400}
              className="from-transparent via-[#5D8736] to-transparent"
            />
            <Lens
              zoomFactor={2}
              lensSize={150}
              isStatic={false}
              ariaLabel="Zoom Area"
            >
              <img
                src={post.image}
                alt={post.forumTitle}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            </Lens>
            <h3 className="text-lg font-semibold mb-2 truncate">
              {post.forumTitle}
            </h3>
            <p className="text-sm text-gray-600 mb-4 truncate">
              {post.classDetails}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">{post.userInfo.name}</span> -{" "}
                <span>{post.userInfo.role}</span>
              </div>
              <Link
                to={`/forum/${post._id}`}
                className="text-primary hover:underline text-sm font-medium"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 flex justify-center">
        <ShimmerButton className="px-6 py-2 bg-primary text-white rounded-lg">
          <Link
            to="community"
            className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg"
          >
            View All Posts
          </Link>
        </ShimmerButton>
      </div>
    </div>
  );
};

export default CommunityPost;
