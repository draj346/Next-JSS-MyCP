// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
import packageJson from '../../../package.json';

/**
 * This is a standalone _base template_ that is inherited by components in the styleguide that need to
 * show explanatory text. The fields on this template are implicitly available on inherited components.
 * Note: inherited fields cannot be modified when inherited (e.g. with different validation rules or help text).
 * Ensure that there is truly an inheritance relationship and not merely "they happen share some fields" before using inheritance.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function LinkComponent(manifest: Manifest): void {
  manifest.addTemplate({
    name: 'customer-service-contact-template',
    id: 'customer-service-contact-template',
    fields: [{ name: 'Title', type: CommonFieldTypes.SingleLineText, section: 'Content' },
      {
        name: 'Phone',
        type: CommonFieldTypes.ContentList,
        source: `dataSource=/sitecore/content/${packageJson.config.appName}/Content/Contacts`,
      },
      {
        name: 'Hour',
        type: CommonFieldTypes.ContentList,
        source: `dataSource=/sitecore/content/${packageJson.config.appName}/Content/Working Hours`,
      },
    ],
    inherits: []
  });
}
