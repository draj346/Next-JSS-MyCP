import { Field, Item, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export interface LinkProps extends Item {
  fields: {
    Link: Field<LinkField>;
  } & Item['fields'];
}