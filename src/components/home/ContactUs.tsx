import { Text, Field, withDatasourceCheck, ImageField, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ImageProps } from 'lib/component-props/image';
import { LinkProps } from 'lib/component-props/link';

type ContactUsProps = ComponentProps & ImageProps &  {
  fields: {
    Heading: Field<string>;
    CTATitle: Field<string>;
    CTADescription: Field<string>;
    CTAIcon: ImageField;
    Contacts: LinkProps[];
  };
};

const ContactUs = ({fields}: ContactUsProps): JSX.Element => (
  <div className="component content component-spacing component-customer-service col-12">
      <div className="component-content">
        <div className="row">
          <div className="container remove-tablet-default-padding">
            <div className="section">
              <div className="left-container col-lg-6">
                <div className="desc-section">
                  <Text tag="h2" field={fields.Heading}></Text>
                  <div className="contact">
                    <div className="icon-hours">
                      <div>
                        <span className="call_icon_circle">
                          <NextImage
                            field={fields.CTAIcon}
                            height={60}
                            width={60}
                          />
                        </span>
                      </div>
                      <div className="call-hours">
                        <Text tag="h5" field={fields.CTATitle}></Text>
                        <Text tag="p" className="semibold" field={fields.CTADescription}></Text>
                      </div>
                    </div>
                    <div className="contacts-list row row-cols-1 row-cols-lg-1">
                      {fields.Contacts.map((contact: LinkProps, index: number) => (
                        <div className="col col-md-6" key={index}>
                          <p className="h6-small">{contact.fields.Link?.value?.title}</p>

                          <a
                            className="a-medium"
                            title="phone number"
                            href={contact.fields.Link?.value?.href}
                          >
                            {contact.fields.Link?.value?.text}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="gradient-border"></div>
              </div>
              <div
                className="right-container col-lg-6"
                style={{ backgroundImage: `url(${fields.Icon.value?.src})`}}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default withDatasourceCheck()<ContactUsProps>(ContactUs);
