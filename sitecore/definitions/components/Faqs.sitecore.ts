// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
import packageJson from '../../../package.json';

/**
 * Adds the Faqs component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function Faqs(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Faqs',
    icon: SitecoreIcon.DocumentTag,
    templateName: 'Faqs',
    fields: [
      { name: 'Expand', type: CommonFieldTypes.SingleLineText },
      { name: 'Collapse', type: CommonFieldTypes.SingleLineText },
      { name: 'ViewAllBtn', type: CommonFieldTypes.GeneralLink },
      { name: 'Limit', type: CommonFieldTypes.Number },
      { name: 'ShowAllTabLabel', type: CommonFieldTypes.SingleLineText },
      { name: 'ShowJumplink', type: CommonFieldTypes.Checkbox },
      { name: 'ShowTitle', type: CommonFieldTypes.Checkbox },
      { name: 'ClassName', type: CommonFieldTypes.SingleLineText },
      {
        name: 'Faqs',
        type: CommonFieldTypes.ContentList,
        source: `dataSource=/sitecore/content/${packageJson.config.appName}/Content/Guest/FAQs`,
      },
    ],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
