import {getComments, getPageBySlug} from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import Text from "@/components/common/Text/Text";
import CommentForm from "@/components/CommentForm/CommentForm";

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPageBySlug(params.slug);
  const comments = await getComments(post.page.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
      <article>
        <Text variant={"h1"}>{post.page.properties.Title.title[0].plain_text}</Text>
        <ReactMarkdown className="markdown-body">{String(post.markdown)}</ReactMarkdown>
          {comments.map((comment) => (
              <div key={comment.id}>
                    <Text variant={"body"}>{comment.rich_text[0].plain_text}</Text>
                    <Text variant={"body-small"}>{comment.created_time}</Text>
                </div>
            ))}
          <CommentForm pageId={post.page.id} />
      </article>
  );
}
