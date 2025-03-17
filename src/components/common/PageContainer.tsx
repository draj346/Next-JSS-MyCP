import { Placeholder, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

const PageContainer = (props: ComponentProps): JSX.Element => (
  <div id="content" className="container-fluid">
    <div className="row">
      <div className="component row-splitter">
        <Placeholder name="title-placeholder" rendering={props.rendering} />
        <div className=" remove-container-fluid-spacing container-fluid">
          <div className="row">
            <div className="row">
              <Placeholder name="content-placeholder" rendering={props.rendering} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withDatasourceCheck()<ComponentProps>(PageContainer);
