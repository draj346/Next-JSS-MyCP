import { withDatasourceCheck, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

const HomePageContainer = (props: ComponentProps): JSX.Element => (
  <>
    <div className="section-light-blue-background remove-container-fluid-spacing container-fluid">
      <div className="row">
        <div className="row">
          <div className="component row-splitter">
            <div className=" remove-container-fluid-spacing container-fluid">
              <div className="row">
                <div className="row">
                  <div className="component content col-12 section-full-light-blue-background">
                    <div className="component-content">
                      <Placeholder name="banner-placeholder" rendering={props.rendering} />
                      <Placeholder name="login-section-placeholder" rendering={props.rendering} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className=" remove-container-fluid-spacing container-fluid">
      <div className="row">
        <div className="row">
          <Placeholder name="faq-placeholder" rendering={props.rendering} />
          <Placeholder name="contact-us-placeholder" rendering={props.rendering} />
        </div>
      </div>
    </div>
  </>
);

export default withDatasourceCheck()<ComponentProps>(HomePageContainer);
