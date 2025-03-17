import { Text, Field, RichText, withDatasourceCheck, Link, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { BannerProps } from 'lib/component-props/banner';
import { LinkProps } from 'lib/component-props/link';

type LoginLinkSectionProps = ComponentProps & BannerProps & {
  fields: {
    WelcomeTitle: Field<string>;
    LogoutTitle: Field<string>;
    LogoutLinkSectionTitle: Field<string>;
    LogoutMessage: Field<string>;
    LoginTitle: Field<string>;
    LoginLinkSectionTitle: Field<string>;
    Links: LinkProps[];
  };
};

const LoginLinkSection = ({ fields, rendering }: LoginLinkSectionProps): JSX.Element => (
  <div className="row">
      <div className="component content col-12 component-spacing">
        <div className="component-content">
          <div className="component-login">
            <div className="row login-section ">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 text-container">
                     <RichText tag="p" className="h5 title light" field={fields.WelcomeTitle} />
                     <RichText tag="p" className="h5 title thanks light" field={fields.LogoutMessage} />
                    <Text tag="h1" className="login-text" field={fields.LoginTitle}></Text>
                    <RichText tag="h1" className="logout-text" field={fields.LogoutTitle} />
                    <div className="policy-links d-none d-lg-block">
                    <RichText tag="p" className="login-links" field={fields.LoginLinkSectionTitle} />
                    <RichText tag="p" className="logout-links" field={fields.LogoutLinkSectionTitle} />
                      <ul>
                        <li className="left-col">
                          {fields.Links.map((link, index) => (
                            <Link
                              className="with-bs-icon chevron-right"
                              key={index}
                              field={link.fields.Link.value}
                            >
                            </Link>
                          ))}
                        </li>
                        <li className="right-col"></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 login-container">
                    <Placeholder name="login-placeholder" rendering={rendering} />
                  </div>
                  <div className="col-12 d-lg-none">
                    <div className="policy-links">
                    <RichText tag="p" className="login-links" field={fields.LoginLinkSectionTitle} />
                    <RichText tag="p" className="logout-links" field={fields.LogoutLinkSectionTitle} />
                      <ul>
                        <li className="left-col">
                        {fields.Links.map((link, index) => (
                            <Link
                              className="with-bs-icon chevron-right"
                              key={index}
                              field={link.fields.Link.value}
                            >
                            </Link>
                          ))}
                        </li>
                        <li className="right-col"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default withDatasourceCheck()<LoginLinkSectionProps>(LoginLinkSection);
