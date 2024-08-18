import type { NotionPagesResponse } from '@/models/notion';
import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getPosts() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });
    return response.results as NotionPagesResponse;
  } catch (error) {
    console.log(error);
  }
}

// TODO: 추후 에러 핸들링 추가
export async function getPostBySlug(slug: string) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });
  return response.results[0] as NotionPagesResponse[0];
}
