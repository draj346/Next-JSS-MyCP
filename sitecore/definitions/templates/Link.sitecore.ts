// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * This is a standalone _base template_ that is inherited by components in the styleguide that need to
 * show explanatory text. The fields on this template are implicitly available on inherited components.
 * Note: inherited fields cannot be modified when inherited (e.g. with different validation rules or help text).
 * Ensure that there is truly an inheritance relationship and not merely "they happen share some fields" before using inheritance.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function LinkComponent(manifest: Manifest): void {
  manifest.addTemplate({
    name: 'link-template',
    id: 'link-template',
    fields: [{ name: 'Link', type: CommonFieldTypes.GeneralLink, section: 'Link Configuration' }],
    inherits: ['image-template']
  });
}
