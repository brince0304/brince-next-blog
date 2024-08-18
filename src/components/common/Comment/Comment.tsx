'use client';

import Avatar from '@/components/common/Avatar/Avatar';
import Button from '@/components/common/Button/Button';
import { formatDistanceToNow } from 'date-fns';
import type React from 'react';
import Text from '../Text/Text';

export interface CommentProps {
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  avatar?: string;
}

const Comment: React.FC<CommentProps> = ({ author, content, createdAt, likes, avatar }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-md transition-colors duration-200">
      <div className="flex items-center mb-2">
        {avatar && <Avatar username={author} size={32} className={'mr-2'} />}
        <div>
          <Text variant="emphasis">{author}</Text>
          <Text variant="body-small" className="text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Text>
        </div>
      </div>
      <Text variant="body" className="mb-3">
        {content}
      </Text>
      <div className="flex items-center">
        <Button variant={'transparent'} size={'small'} className="mr-4">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          <Text variant="body-small">{likes}</Text>
        </Button>
        <Button variant={'transparent'} size={'small'}>
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          <Text variant="body-small">Reply</Text>
        </Button>
      </div>
    </div>
  );
};

export default Comment;
