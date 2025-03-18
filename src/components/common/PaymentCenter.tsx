import { Text, Field, withDatasourceCheck, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { PaymentOption, PaymentOptionLink } from 'lib/component-props/payment';

type PaymentCenterProps = ComponentProps & {
  fields: {
    Disclaimer: Field<string>;
    PaymentOptions: PaymentOption[];
  };
};

const PaymentCenter = ({ fields }: PaymentCenterProps): JSX.Element => (
  <div className="component content col-12">
    <div className="component-content">
      <div className="row">
        <div className="component-make-payment">
          <div className="container remove-tablet-default-padding">
            {fields.PaymentOptions.map((paymentOption: PaymentOption, index: number) => (
              <div key={index} className="item">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="header">
                      <Text
                        tag="h4"
                        className="bold title-with-border"
                        field={paymentOption.fields.Heading}
                      ></Text>
                      <Text
                        tag="h6"
                        className="regular"
                        field={paymentOption.fields.SubHeading}
                      ></Text>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="desc">
                      {paymentOption.fields.Options.map(
                        (link: PaymentOptionLink, index: number) => (
                          <RichText
                            tag="div"
                            key={index}
                            field={link.fields.Description}
                          ></RichText>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="disclaimer">
              <div className="row">
                <RichText tag="div" className="col-lg-9" field={fields.Disclaimer}></RichText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withDatasourceCheck()<PaymentCenterProps>(PaymentCenter);
