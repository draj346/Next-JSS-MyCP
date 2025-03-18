import { Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';

export type FaqJumplinkItemTypes = {
  faq: FAQ | undefined;
  limit: number;
  offset: number;
  allTab: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export interface Question extends Item {
  fields: {
    Heading: Field<string>;
    Description: Field<string>;
    id: Field<string>;
  } & Item['fields'];
}

export interface FAQ extends Item {
  fields: {
    Name: Field<string>;
    Key: Field<string>;
    Value: Field<string>;
    Questions: Question[];
  } & Item['fields'];
}

export type FaqJumplinkTypes = {
  faq: FAQ | undefined;
  allFaq: FAQ[] | null;
  totalLimit: number;
  allTab: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  counter: number;
};

export type TabTypes = {
  key: string;
  value: string;
  href: string;
};

export type IndividualFaqType = {
  faq: FAQ | undefined;
  count: number;
  showTitle: boolean;
  expandAccordion: (e: React.MouseEvent<HTMLButtonElement>) => void;
  collapseAccordion: (e: React.MouseEvent<HTMLButtonElement>) => void;
  allTab: boolean;
  showJumplink: boolean;
  allFaq: FAQ[] | null;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  counter: number;
};
