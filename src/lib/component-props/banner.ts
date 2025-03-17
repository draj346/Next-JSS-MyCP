import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Shared styleguide specimen fields
 */
export type BannerProps = {
  fields: {
    Heading: Field<string>;
    Description: Field<string>;
  };
};
