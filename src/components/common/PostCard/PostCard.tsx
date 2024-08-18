import Text from '@/components/common/Text/Text';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  thumbnailSrc: string | null;
}

const cardClasses = {
  container: `bg-white dark:bg-gray-800 
  rounded-lg 
  shadow-sm dark:shadow-md
  dark:shadow-gray-900/10
  overflow-hidden 
  transition-all duration-300 
  transform hover:scale-[1.02] 
  hover:shadow-lg dark:hover:shadow-lg
  dark:hover:shadow-gray-900/20
  flex flex-col md:flex-row
  `,
  imageWrapper: 'md:w-1/3 relative h-48 md:h-auto',
  image: 'transition-opacity duration-300 hover:opacity-90',
  contentWrapper: 'p-6 relative flex-1',
  hoverEffect:
    'absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700 opacity-0 hover:opacity-10 transition-opacity duration-300',
  title: 'font-bold mb-2',
  excerpt: 'mb-4',
  readMoreWrapper: 'mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400',
  readMoreText: 'mr-2',
  readMoreIcon: 'h-4 w-4 animate-pulse',
};

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, slug, thumbnailSrc }) => {
  const CardContent = () => (
    <div className={cardClasses.container}>
      {thumbnailSrc && (
        <div className={cardClasses.imageWrapper}>
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            objectFit={'cover'}
            className={cardClasses.image}
          />
        </div>
      )}
      <div className={cardClasses.contentWrapper}>
        <div className={cardClasses.hoverEffect} />
        <Text variant={'h2'} className={cardClasses.title}>
          {title}
        </Text>
        <Text variant={'body'} className={cardClasses.excerpt}>
          {excerpt}
        </Text>
        <div className={cardClasses.readMoreWrapper}>
          <Text variant={'body-small'} className={cardClasses.readMoreText}>
            Read more
          </Text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cardClasses.readMoreIcon}
            fill="none"
            viewBox="0 0 24 24"
            aria-labelledby="readMoreIconTitle"
            stroke="currentColor"
          >
            <title id="readMoreIconTitle">Read more arrow</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  if (typeof window === 'undefined') {
    // SSR
    return (
      <li>
        <Link href={`/posts/${slug}`} className="block">
          <CardContent />
        </Link>
      </li>
    );
  }

  // CSR
  return (
    <li>
      <a href={`/posts/${slug}`} className="block">
        <CardContent />
      </a>
    </li>
  );
};

export default PostCard;
