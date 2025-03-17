import { Field, withDatasourceCheck, LinkField, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import TabList from 'components/common/TabList';
import { CollapseType, ComponentProps } from 'lib/component-props';
import { FAQ, TabTypes } from 'lib/component-props/faq';
import { useCallback, useEffect, useRef, useState } from 'react';
import IndividualFaqTab from './individualFaqTab';

type FaqsProps = ComponentProps & {
  fields: {
    Expand: Field<string>;
    Collapse: Field<string>;
    ViewAllBtn: Field<LinkField>;
    Limit: Field<number>;
    ShowAllTabLabel: Field<string>;
    ShowJumplink: Field<boolean>;
    ShowTitle: Field<boolean>;
    ClassName: Field<string>;
    Faqs: FAQ[];
  };
};

const Faqs = (props: FaqsProps): JSX.Element => {
  const { fields } = props;
  const [tabList, setTabList] = useState<TabTypes[]>([]);
  const [counter, setCounter] = useState<number>(1);
  const [showAllTab, setShowAllTab] = useState<boolean>(false);
  const faqContainerRef = useRef<HTMLDivElement>(null);
  const collapseClass: string = 'collapse';
  const showClass: string = 'show';
  const collapseRef = useRef<CollapseType | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap').then(({ Collapse }) => {
        collapseRef.current = Collapse;
      });
    }
  }, []);

  useEffect(() => {
    if (fields.Faqs.length > 0) {
      let tabs: TabTypes[] = fields.Faqs.map((faq: FAQ) => ({
        key: faq.fields.Key.value,
        value: faq.fields.Name.value,
        href: faq.fields.Value.value,
      }));

      if (fields.ShowAllTabLabel?.value) {
        setShowAllTab(true);
        tabs = [{ key: 'All', value: fields.ShowAllTabLabel.value, href: `All-tab` }, ...tabs];
      }

      setTabList(tabs);
    }
  }, [showAllTab]);

  const collapseAccordion: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const parent = e.currentTarget.parentNode as HTMLElement;
    const nextSibling = parent?.nextSibling as HTMLElement;

    if (!nextSibling) return;

    const accordionItems = [...nextSibling.childNodes].filter((el): el is HTMLElement => {
      const target = el.childNodes?.[1] as HTMLElement | undefined;
      return !!target?.className?.includes(`${collapseClass} ${showClass}`);
    });

    accordionItems.forEach((collapseEl) => {
      const bsCollapse = new collapseRef.current!(collapseEl.children[1], {
        toggle: false,
      });
      bsCollapse.hide();
    });
  }, []);

  const expandAccordion: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const parent = e.currentTarget.parentNode as HTMLElement;
    const nextSibling = parent?.nextSibling as HTMLElement;

    const accordionItems = [...nextSibling.childNodes].filter((el): el is HTMLElement => {
      const target = el.childNodes[1] as HTMLElement;
      return target.classList.contains(collapseClass) && !target.classList.contains(showClass);
    });

    accordionItems.forEach((collapseEl) => {
      const bsCollapse = new collapseRef.current!(collapseEl.children[1], {
        toggle: false,
      });
      bsCollapse.show();
    });
  }, []);

  const redirectToFAQ = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, accordianContainerId: string, faqId: string) => {
      if (faqId) {
        e.preventDefault();
        e.stopPropagation();

        const faqTabContent = [...faqContainerRef.current!.childNodes[1].childNodes].find((e) => {
          if (e instanceof HTMLElement) {
            return e.classList.contains(showClass);
          }
        });

        if (!faqTabContent) return;

        const accordionContainer = [
          ...faqTabContent.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes,
        ].find((e) => {
          if (e instanceof HTMLElement) {
            return e.getAttribute('id') === accordianContainerId;
          }
        });

        if (!accordionContainer) return;

        const accordion = [...accordionContainer.childNodes[1].childNodes].find((e) => {
          const childNode = e.childNodes[1] as HTMLElement;
          return childNode.getAttribute('id') === faqId;
        });

        if (!accordion) return;

        if (accordion instanceof HTMLElement) {
          const bsCollapse = new collapseRef.current!(accordion.children[1], {
            toggle: false,
          });
          bsCollapse.show();

          const accordionPosition = accordion.getBoundingClientRect().top + window.scrollY - 100;

          window.scrollTo({
            top: accordionPosition,
            behavior: 'smooth',
          });
        }
      }
    },
    []
  );

  const handleAllJumplinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const accordianId = e.currentTarget.getAttribute('data-bs-target');

      if (accordianId) {
        const parent = e.currentTarget.parentNode?.parentNode?.parentNode as HTMLElement;

        const accordianContainerId = parent.getAttribute('data-target') || '';
        redirectToFAQ(e, accordianContainerId, accordianId.substring(1));
      }
    },
    [redirectToFAQ]
  );

  const handleJumplinkClick: React.MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    const accordianId = e.currentTarget.getAttribute('data-bs-target');
    e.preventDefault();
    e.stopPropagation();
    if (accordianId) {
      const accordionContainer = e.currentTarget.parentNode?.parentNode?.parentNode?.parentNode
        ?.parentNode?.parentNode?.parentNode?.nextSibling?.childNodes[1] as HTMLElement;

      if (!accordionContainer) return;

      const accordion = [...accordionContainer.childNodes].find((e) => {
        const childNode = e.childNodes[1] as HTMLElement;
        return childNode.getAttribute('id') === accordianId.substring(1);
      });

      if (!accordion) return;

      if (accordion instanceof HTMLElement) {
        const bsCollapse = new collapseRef.current!(accordion.children[1], {
          toggle: false,
        });
        bsCollapse.show();

        const accordionPosition = accordion.getBoundingClientRect().top + window.scrollY - 100;

        window.scrollTo({
          top: accordionPosition,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const handleChangeTab = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  return (
    <div
      className={`component content component-box col-12 no-typography component-faq ${fields.ClassName?.value}`}
    >
      <div className="component-content">
        <div className="row">
          <div className="container tabnav-container">
            <div className="faq-container" ref={faqContainerRef}>
              {tabList.length > 0 && (
                <TabList tabList={tabList} onClick={handleChangeTab}>
                  {tabList.map((tab) =>
                    tab.key === 'All' ? (
                      <div key={tab.key}>
                        {fields.Faqs.map((faq: FAQ, index: number) => (
                          <IndividualFaqTab
                            faq={faq}
                            count={fields.Limit?.value | 0}
                            showTitle={fields.ShowTitle?.value}
                            expandAccordion={expandAccordion}
                            collapseAccordion={collapseAccordion}
                            key={index}
                            allTab={true}
                            allFaq={fields.Faqs}
                            showJumplink={index === 0 ? fields.ShowJumplink?.value : false}
                            onClick={handleAllJumplinkClick}
                            counter={counter}
                          />
                        ))}
                      </div>
                    ) : (
                      <IndividualFaqTab
                        faq={fields.Faqs.find((f) => f.fields.Key?.value === tab.key)}
                        count={fields.Limit?.value | 0}
                        showTitle={fields.ShowTitle?.value}
                        expandAccordion={expandAccordion}
                        collapseAccordion={collapseAccordion}
                        key={tab.key}
                        allTab={false}
                        showJumplink={fields.ShowJumplink?.value}
                        allFaq={null}
                        onClick={handleJumplinkClick}
                        counter={counter}
                      />
                    )
                  )}
                </TabList>
              )}
              {fields.ViewAllBtn?.value && (
                <div className="d-md-flex justify-content-center faq-cta">
                  <Link
                    className="btn btn-primary with-bs-icon chevron-right"
                    field={fields.ViewAllBtn.value}
                  ></Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<FaqsProps>(Faqs);
