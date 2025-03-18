import { Field, RichText, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { FormProps, States } from 'lib/component-props/form';
import { useCallback } from 'react';
import downloadIcon from '/public/images/download-form.svg';
import Image from 'next/image';

type FormListProps = ComponentProps & {
  fields: {
    Forms: FormProps[];
    Heading: Field<string>;
    Description: Field<string>;
    States: States[];
  };
};

const FormList = ({ fields }: FormListProps): JSX.Element => {
  const handleDropdownChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const slides = document.getElementsByClassName('form-doc-download-item');
    const selectedValue = event.target.value;
    Array.from(slides).forEach((slide) => {
      if (slide instanceof HTMLLIElement) {
        const att = slide.getAttribute('data-states');
        if (selectedValue && att?.includes(selectedValue)) {
          slide.classList.remove('d-none');
        } else {
          slide.classList.add('d-none');
        }
      }
    });
  }, []);

  return (
    <div className="component content col-12 form-component with-radio component-spacing-left">
      <div className="component-content">
        <div className="container forms-list">
          <form className="form-container needs-validation">
            <div className="row form-group">
              <div className="col-lg-6 left-container">
                <div className="title-container">
                  <Text tag="h5" className="no-typography" field={fields.Heading}></Text>
                  <RichText tag="p" field={fields.Description}></RichText>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 right-container">
                <select
                  className="form-select form-select-lg custom-dropdown select2-hidden-accessible"
                  required
                  tabIndex={-1}
                  onChange={handleDropdownChange}
                >
                  <option value="">Select Your State</option>
                  {fields.States.map((state) => (
                    <option key={state.fields.Key.value} value={state.fields.Key.value}>
                      {state.fields.Value.value}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback p-small semibold">Please select your State</div>
              </div>
            </div>
          </form>
        </div>
        <div>
          <div className="container text-center remove-tablet-default-padding">
            <ul className="form-doc-download">
              {fields.Forms.map((form: FormProps, index: number) => (
                <li
                  key={index}
                  className="form-doc-download-item d-none"
                  data-states={form.fields.States.map((state) => state.fields.Key.value).join(', ')}
                >
                  <a href={form.fields.File.value.src || '/'} rel="noreferrer" target="_blank">
                    <p className="bold">{form.fields.File.value.title}</p>
                    <Image src={downloadIcon} alt="download"></Image>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<FormListProps>(FormList);
