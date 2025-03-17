import { NextImage, RichText, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { BannerProps } from 'lib/component-props/banner';
import { ImageProps } from 'lib/component-props/image';

type RegisterBannerProps = ComponentProps & BannerProps & ImageProps;

const RegisterBanner = ({ fields }: RegisterBannerProps): JSX.Element => (
  <div className="row">
    <div className="component content col-12 component-spacing">
      <div className="component-content">
        <div className="row">
          <div className="container component-register-banner">
            <div className="register-banner-box col-lg-12">
              <div className="icon">
                <NextImage
                  field={fields.Icon}
                  className="logo"
                  alt="alarm-image"
                  height={0}
                  width={0}
                  style={{ height: 'auto', width: 'auto' }} // optional
                  sizes="100vw"
                />
              </div>
              <div className="register-banner-content">
                <RichText field={fields.Description} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withDatasourceCheck()<RegisterBannerProps>(RegisterBanner);
