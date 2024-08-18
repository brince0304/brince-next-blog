import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[] | [];
  imageUrl?: string | null;
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, slug, date, tags, imageUrl }) => {
  return (
      <Link href={`/posts/${slug}`} className="block">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          {imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-300 hover:opacity-80"
                />
              </div>
          )}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                {tag}
              </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{date}</span>
              <span className="flex items-center justify-center">
                관심주기
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default PostCard;