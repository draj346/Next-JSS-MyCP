import { NextImage, withDatasourceCheck, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ContactsProps } from 'lib/component-props/contact';
import CustomLink from './CustomLink';

type CustomerServiceProps = ComponentProps & {
  fields: {
    Contacts: ContactsProps[];
  };
};

const CustomerService = ({ fields }: CustomerServiceProps): JSX.Element => (
  <div className=" remove-container-fluid-spacing container-fluid">
    <div className="row">
      <div className="row">
        <div className="component content col-12 p-0">
          <div className="component-content">
            <div className="component-customer-service-guest">
              <div className="container remove-tablet-default-padding">
                <div className="three-column-container">
                  {fields.Contacts.map((contact, index) => (
                    <div key={index} className="row-cs">
                      <div className="col-lg-4 col-xl-3">
                        <h4 className="bold">{contact.fields?.Title?.value}</h4>
                      </div>
                      <div className="phone-hours no-typography col">
                        <div className="col-lg-4">
                          <h6 className="phone semibold h5">
                            {contact.fields.Phone[0]?.fields?.Heading?.value}
                          </h6>
                          <p className="icon-number">
                            <span>
                              <NextImage
                                field={contact.fields.Phone[0]?.fields?.Icon}
                                className="logo"
                                alt="Colonial Penn"
                                height={0}
                                width={0}
                                style={{ height: 'auto', width: 'auto' }} // optional
                                sizes="100vw"
                              />
                            </span>

                            <span>
                              <CustomLink
                                className="a-medium"
                                title="phone number"
                                href={contact.fields.Phone[0]?.fields?.Link?.value?.href || '/'}
                              >
                                {contact.fields.Phone[0]?.fields?.Link?.value?.text}
                              </CustomLink>
                            </span>
                          </p>
                        </div>
                        <div className="hours-section">
                          <Text
                            tag="h6"
                            className="semibold h5"
                            field={contact.fields.Hour[0]?.fields?.Title}
                          ></Text>
                          <Text
                            tag="p"
                            className="semibold"
                            field={contact.fields.Hour[0]?.fields?.Day}
                          ></Text>
                          <Text tag="p" field={contact.fields.Hour[0]?.fields?.Time}></Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withDatasourceCheck()<CustomerServiceProps>(CustomerService);
