import type React from 'react';

interface AvatarProps {
  username: string;
  className?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ username, size = 40, className = '' }) => {
  const avatarUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(username)}`;

  const mergedClassName = `rounded-full ${className}`;

  return (
    <img
      src={avatarUrl}
      alt={`${username}'s avatar`}
      width={size}
      height={size}
      className={mergedClassName}
    />
  );
};

export default Avatar;
