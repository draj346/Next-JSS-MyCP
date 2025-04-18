// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the Title component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function Title(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Title',
    icon: SitecoreIcon.DocumentTag,
    templateName: 'Title',
    fields: [
      { name: 'ComponentClass', displayName: 'Component Class', type: CommonFieldTypes.SingleLineText, section: 'Content' },
      { name: 'TitleClass', displayName: 'Title Class', type: CommonFieldTypes.SingleLineText, section: 'Content'  },
    ],
    inherits: ['banner-template'],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
