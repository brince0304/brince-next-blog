import type {PostCardProps} from "@/components/common/PostCard/PostCard";
import type {NotionPage} from "@/models/notion";

export const getPostPropsFromResponse = (responses: NotionPage): PostCardProps => {
    if (typeof responses === 'undefined' || responses === null) {
        return {
            title: '',
            excerpt: '',
            imageUrl: '',
            date: '',
            tags: [],
            slug: ''
        }
    }

    return {
        title: responses.properties.Title.title[0].plain_text || '',
        excerpt: responses.properties.Excerpt.rich_text[0]?.plain_text || '',
        imageUrl: responses.properties.Thumbnail.url || '',
        date: responses.properties.Date.date?.start || '',
        tags: responses.properties.Tags.multi_select.map((tag) => tag.name) || [],
        slug: responses.properties.Slug.rich_text[0].plain_text
    }
}