import { Text, Field, withDatasourceCheck, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { BannerProps } from 'lib/component-props/banner';

type TitleProps = ComponentProps & BannerProps & {
  fields: {
    ComponentClass: Field<string>;
    TitleClass: Field<string>;
  };
};

const Title = ({fields}: TitleProps): JSX.Element => (
  <div
      className={`${fields.ComponentClass?.value} remove-container-fluid-spacing container-fluid`}
    >
      <div className="row">
        <div className="row">
          <div className="component row-splitter">
            <div className=" remove-container-fluid-spacing container-fluid">
              <div className="row">
                <div className="row">
                  <div
                    className={`component content page-title-section col-12 ${fields.TitleClass?.value}`}
                  >
                    <div className="component-content">
                      <div className="container">
                        <RichText tag='h1' field={fields.Heading} />
                        {fields.Description?.value && <RichText tag='p' className="h6" field={fields.Description} />}
                      </div>
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

export default withDatasourceCheck()<TitleProps>(Title);
