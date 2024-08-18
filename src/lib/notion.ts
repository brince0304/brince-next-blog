import type { NotionDatabaseQueryResponse, NotionPage, NotionPagesResponse } from '@/models/notion';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const guestNotion = new Client();
const n2m = new NotionToMarkdown({ notionClient: notion });

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

export async function getComments(pageId: string) {
  try {
    const response = await notion.comments.list({
      block_id: pageId,
    });

    return response.results;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function postComment(pageId: string, text: string) {
  try {
    await guestNotion.comments.create({
      parent: {
        page_id: pageId,
      },
      rich_text: [
        {
          type: 'text',
          text: {
            content: text,
          },
        },
      ],
    });
  } catch (error) {
    console.error('Error posting comment:', error);
  }
}

// TODO: 추후 에러 핸들링 추가
export async function getPageBySlug(slug: string) {
  const databaseId = process.env.NOTION_DATABASE_ID;

  // Query the database to find the page with the given slug
  const response = (await notion.databases.query({
    database_id: databaseId as string,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  })) as NotionDatabaseQueryResponse;

  if (response.results.length === 0) {
    throw new Error('Page not found');
  }

  const page = response.results[0] as NotionPage;
  const pageId = page.id;

  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    page,
    markdown: mdString,
  };
}
