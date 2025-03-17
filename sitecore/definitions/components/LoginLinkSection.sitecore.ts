// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
import packageJson from '../../../package.json';

/**
 * Adds the LoginLinkSection component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function LoginLinkSection(manifest: Manifest): void {
  manifest.addComponent({
    name: 'LoginLinkSection',
    icon: SitecoreIcon.DocumentTag,
    templateName: 'LoginLinkSection',
    fields: [
      { name: 'WelcomeTitle', type: CommonFieldTypes.RichText, section: 'Content' },
      {
        name: 'Links',
        type: CommonFieldTypes.ContentList,
        source: `dataSource=/sitecore/content/${packageJson.config.appName}/Content/Login Section Links`,
        section: 'Content',
      },
      { name: 'LogoutTitle', type: CommonFieldTypes.RichText, section: 'Logout Configuration' },
      {
        name: 'LogoutLinkSectionTitle',
        type: CommonFieldTypes.RichText,
        section: 'Logout Configuration',
      },
      { name: 'LogoutMessage', type: CommonFieldTypes.RichText, section: 'Logout Configuration' },

      { name: 'LoginTitle', type: CommonFieldTypes.RichText, section: 'Login Configuration' },
      {
        name: 'LoginLinkSectionTitle',
        type: CommonFieldTypes.RichText,
        section: 'Login Configuration',
      },
    ],
    inherits: ['banner-template'],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
