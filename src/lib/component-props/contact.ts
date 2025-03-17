import { Field, ImageField, Item, LinkField } from "@sitecore-jss/sitecore-jss-nextjs";

export interface PhoneProps extends Item {
    fields: {
       Link: Field<LinkField>;
       Icon: ImageField;
       Heading: Field<string>;
    } & Item['fields'];
  }
  
  export interface HourProps extends Item {
    fields: {
      Title: Field<string>;
      Day: Field<string>;
      Time: Field<string>;
    } & Item['fields'];
  }
  
  export interface ContactsProps extends Item {
    fields: {
      Title: Field<string>;
      Phone: PhoneProps[];
      Hour: HourProps[];
    } & Item['fields'];
  }