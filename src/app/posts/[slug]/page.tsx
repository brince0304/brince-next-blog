import { getPostBySlug } from '@/lib/notion';

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article>
      <h1>{post.properties.Title.title[0].plain_text}</h1>
    </article>
  );
}
