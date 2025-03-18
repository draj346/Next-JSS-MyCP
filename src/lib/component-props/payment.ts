import { Item, Field } from '@sitecore-jss/sitecore-jss-nextjs';

export interface PaymentOption extends Item {
  fields: {
    Heading: Field<string>;
    SubHeading: Field<string>;
    Options: PaymentOptionLink[];
  } & Item['fields'];
}

export interface PaymentOptionLink extends Item {
  fields: {
    Description: Field<string>;
  } & Item['fields'];
}
