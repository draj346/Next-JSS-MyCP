import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'components/common/CustomLink';
import { ComponentProps } from 'lib/component-props';
import { BannerProps } from 'lib/component-props/banner';

type LoginProps = ComponentProps & BannerProps &{
  fields: {
    Login: Field<string>;
    Register: Field<string>;
    ForgetPassword: Field<string>;
  };
};

const Login = ({ fields }: LoginProps): JSX.Element => (
  <div className="login-wrap">
      <div className="row">
        <div className="login-content">
          <div className="row align-items-md-center">
            <div className="login col-12">
              <Text tag="h2" className="h4" field={fields.Heading}></Text>
              <CustomLink
                href={process.env.NEXT_PUBLIC_LOGIN || '/'}
                className="btn btn-primary with-bs-icon chevron-right w-100 login-btn"
              >
                {fields.Login.value}
              </CustomLink>
            </div>
            <div className="register col-12">
              <CustomLink
                href={process.env.NEXT_PUBLIC_REGISTER || '/'}
                className="btn btn-primary with-bs-icon chevron-right w-100"
              >
                {fields.Register.value}
              </CustomLink>
            </div>
            <div className="guest col-12">
              <div className="forget-password">
                <CustomLink
                  href={process.env.NEXT_PUBLIC_FORGET_PASSWORD || '/'}
                  className="with-bs-icon external-link"
                >
                  {fields.ForgetPassword.value}
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default withDatasourceCheck()<LoginProps>(Login);
