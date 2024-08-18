import PostCard from '@/components/common/PostCard/PostCard';
import { getPosts } from '@/lib/notion';
import { getPostPropsFromResponse } from '@/lib/transfer';

const Posts = async () => {
  const posts = await getPosts();

  return (
    <ul className={'grid grid-cols-1 gap-4 md:grid-cols-3'}>
      {posts
        ?.map((post) => getPostPropsFromResponse(post))
        .map((props) => (
          <PostCard key={props.slug} {...props} />
        ))}
    </ul>
  );
};

export default Posts;
