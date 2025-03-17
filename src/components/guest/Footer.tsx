import {
  withDatasourceCheck,
  NextImage,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'components/common/CustomLink';
import { ComponentProps } from 'lib/component-props';
import { ImageProps } from 'lib/component-props/image';
import { LinkProps } from 'lib/component-props/link';

type FooterProps = ComponentProps & ImageProps & {
  fields: {
    Links: LinkProps[];
  };
};

const Footer = (props: FooterProps): JSX.Element => (
  <div id="footer" className="container-fluid">
    <div className="row">
      <div className="component content p-0">
        <div className="component-content">
          <div className="footer-component">
            <div className="container remove-tablet-default-padding">
              <div className="row align-items-xl-center">
                <div className="col-12 col-xl-2">
                  <div className="logo">
                    <CustomLink href="/">
                      <NextImage
                        field={props.fields.Icon}
                        alt="Colonial Penn"
                        height={0}
                        width={0}
                        style={{ width: '174px', height: 'auto' }} // optional
                        sizes="100vw"
                        priority
                      />
                    </CustomLink>
                  </div>
                </div>
                <div className="col-12 col-xl-10">
                  <div className="footer-links">
                    <ul className="link d-xl-flex">
                      {props.fields.Links.map((link: LinkProps, index: number) => (
                        <li key={index}>
                          <Link
                            className="with-bs-icon external-link"
                            field={link.fields.Link.value}
                            rel="noopener noreferrer"
                          ></Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="copyrights">
              <div className="container">
                <div className="row">
                  <div className="col remove-tablet-default-padding">
                    <p className="p-small mb-0">
                      Copyright © 2011-{new Date().getFullYear()} All Rights Reserved.
                    </p>
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

export default withDatasourceCheck()<FooterProps>(Footer);
