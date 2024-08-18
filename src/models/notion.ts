interface NotionUser {
  object: 'user';
  id: string;
}

interface NotionParent {
  type: 'database_id';
  database_id: string;
}

interface NotionRichTextProperty {
  id: string;
  type: 'rich_text';
  rich_text: NotionRichText[];
}

interface NotionRichText {
  type: 'text';
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

interface NotionTitle {
  id: string;
  type: 'title';
  title: NotionRichText[];
}

interface NotionDate {
  id: string;
  type: 'date';
  date: {
    start: string;
    end: string | null;
    time_zone: string | null;
  } | null;
}

interface NotionURL {
  id: string;
  type: 'url';
  url: string | null;
}

interface NotionCheckbox {
  id: string;
  type: 'checkbox';
  checkbox: boolean;
}

interface NotionSelect {
  id: string;
  type: 'select';
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
}

interface NotionProperties {
  Title: NotionTitle;
  Date: NotionDate;
  Published: NotionCheckbox;
  Thumbnail: NotionURL;
  Slug: NotionRichTextProperty;
}

interface NotionPage {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  cover: null | {
    type: 'external';
    external: { url: string };
  };
  icon: null | {
    type: 'emoji';
    emoji: string;
  };
  parent: NotionParent;
  archived: boolean;
  properties: NotionProperties;
  url: string;
}

export interface NotionDatabaseQueryResponse {
  object: 'list';
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
}

export type NotionPagesResponse = NotionDatabaseQueryResponse['results'];
