// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
import packageJson from '../../../package.json';

/**
 * Adds the ContactUs component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function ContactUs(manifest: Manifest): void {
  manifest.addComponent({
    name: 'ContactUs',
    icon: SitecoreIcon.DocumentTag,
    templateName: 'ContactUs',
    fields: [
      {
        name: 'CTATitle',
        displayName: 'CTA Title',
        type: CommonFieldTypes.SingleLineText,
        section: 'CTA Configuration',
      },
      {
        name: 'CTADescription',
        displayName: 'CTA Description',
        type: CommonFieldTypes.SingleLineText,
        section: 'CTA Configuration',
      },
      {
        name: 'CTAIcon',
        displayName: 'CTA Icon',
        type: CommonFieldTypes.Image,
        section: 'CTA Configuration',
      },
      {
        name: 'Contacts',
        type: CommonFieldTypes.ContentList,
        section: 'Content',
        source: `dataSource=/sitecore/content/${packageJson.config.appName}/Content/Contacts`,
      },
    ],
    inherits: ['banner-template', 'image-template'],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
