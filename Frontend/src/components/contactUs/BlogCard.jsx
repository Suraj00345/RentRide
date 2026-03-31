import React from 'react';

const BlogCard = ({ post }) => (
  <div className="group flex flex-col gap-4">
    {/* Image Container with aspect ratio and hover effect */}
    <div className="aspect-[16/10] bg-gray-100 rounded-[28px] overflow-hidden border border-gray-100 shadow-sm shadow-gray-50 transition-all group-hover:shadow-md">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    
    {/* Content */}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-1 leading-snug group-hover:text-green-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-tight">
        {post.category} / {post.date}
      </p>
    </div>
  </div>
);

export default BlogCard;