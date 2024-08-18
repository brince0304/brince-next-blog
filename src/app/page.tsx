import PostCard from '@/components/common/PostCard/PostCard';
import { getPosts } from '@/lib/notion';
import { ErrorBoundary, GlobalError } from 'next/dist/client/components/error-boundary';

export default async function Home() {
  const posts = await getPosts();

  return (
    <ErrorBoundary errorComponent={GlobalError}>
      <main>
        <ul>
          {posts?.map((post) => (
            <PostCard
              key={post.id}
              title={post.properties.Title.title[0].plain_text}
              excerpt={'123'}
              thumbnailSrc={post.properties.Thumbnail.url}
              slug={post.properties.Slug.rich_text[0].plain_text}
            />
          ))}
        </ul>
      </main>
    </ErrorBoundary>
  );
}
