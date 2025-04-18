// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
import packageJson from '../../../package.json';
/**
 * Adds the CustomerService component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function CustomerService(manifest: Manifest): void {
  manifest.addComponent({
    name: 'CustomerService',
    icon: SitecoreIcon.DocumentTag,
    templateName: 'CustomerService',
    fields: [
      {
        name: 'Contacts',
        type: CommonFieldTypes.ContentList,
        source: `dataSource=/sitecore/content/${packageJson.config.appName}/Content/Customer Service`,
      },
    ],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
