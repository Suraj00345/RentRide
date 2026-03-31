import React from "react";
import BlogCard from "./BlogCard";

const BLOG_POSTS = [
  {
    id: 1,
    title: "How To Choose The Right Car",
    category: "News",
    date: "12 April 2024",
    image: "/blog-image-1.jpg", // Replace with actual paths
  },
  {
    id: 2,
    title: "Which plan is right for me?",
    category: "News",
    date: "12 April 2024",
    image: "/blog-image-2.jpg",
  },
  {
    id: 3,
    title: "Enjoy Speed, Choice & Total Control",
    category: "News",
    date: "12 April 2024",
    image: "/blog-image-3.jpg",
  },
  {
    id: 4,
    title: "Enjoy Speed, Choice & Total Control",
    category: "News",
    date: "12 April 2024",
    image: "/blog-image-3.jpg",
  },
];

const BlogGallery = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-8xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl underline font-black text-center text-gray-900 mb-16">
          Latest blog posts & news
        </h2>

        {/* Modular Grid with spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGallery;
