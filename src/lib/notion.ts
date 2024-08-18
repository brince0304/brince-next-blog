import type { CommentRequest, NotionPage, NotionPagesResponse } from '@/models/notion';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

const n2m = new NotionToMarkdown({ notionClient: notion });

async function getPosts() {
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

async function likePost(pageId: string) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        Likes: {
          type: 'number',
          number: 1,
        },
      },
    });

    return response;
  } catch (error) {
    console.error('Error liking post:', error);
  }
}

async function createCommentPage(pageId: string, data: CommentRequest) {
  try {
    const { text, author, parentId } = data;

    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_COMMENT_DATABASE_ID as string,
      },
      properties: {
        PageId: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: pageId,
              },
            },
          ],
        },
        Comment: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: text,
              },
            },
          ],
        },
        Author: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: author,
              },
            },
          ],
        },
        ParentId: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: parentId || '',
              },
            },
          ],
        },
      },
    });

    const comments = await notion.databases.query({
      database_id: process.env.NOTION_COMMENT_DATABASE_ID as string,
      filter: {
        property: 'PageId',
        rich_text: {
          equals: pageId,
        },
      },
    });

    await notion.pages.update({
      page_id: pageId,
      properties: {
        Comments: {
          type: 'number',
          number: comments.results.length,
        },
      },
    });
  } catch (error) {
    console.error('Error creating comment page:', error);
  }
}

async function getComments(pageId: string) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_COMMENT_DATABASE_ID as string,
      filter: {
        property: 'PageId',
        rich_text: {
          equals: pageId,
        },
      },
      sorts: [
        {
          property: 'CreatedAt',
          direction: 'ascending',
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

async function getPageBySlug(slug: string) {
  if (!slug) {
    return null;
  }

  try {
    const databaseId = process.env.NOTION_DATABASE_ID;

    const response = await notion.databases.query({
      database_id: databaseId as string,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    const page = response.results[0] as NotionPage;
    const pageId = page.id;

    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      page,
      markdown: mdString,
    };
  } catch (error) {
    console.error('Error fetching page:', error);
  }
}

export const notionClient = {
  getPosts,
  getComments,
  createCommentPage,
  getPageBySlug,
};
