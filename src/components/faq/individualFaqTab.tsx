'use client';

import React, { useCallback, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { FAQ, IndividualFaqType, Question } from 'lib/component-props/faq';
import { CollapseType, TabType } from 'lib/component-props';
import FaqJumplink from 'components/faqJumplink/faqJumplink';
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';

const IndividualFaqTab = ({
  faq,
  count,
  showTitle,
  expandAccordion,
  collapseAccordion,
  allTab,
  showJumplink,
  allFaq,
  onClick,
  counter,
}: IndividualFaqType) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  const collapseRef = useRef<CollapseType | null>(null);
  const tabRef = useRef<TabType | null>(null);

  const getKey = () => (allTab ? `all-${faq?.fields.Key?.value}` : faq?.fields.Key?.value);

  const getQuestionId = (question: Question) => (allTab ? `all-${question.fields.id.value}` : question.fields.id.value);

  const getHeadingId = (question: Question) =>
    allTab ? `all-heading-${question.fields.id.value}` : `heading-${question.fields.id.value}`;

  const getCollapseId = (question: Question) =>
    allTab ? `all-collapse-${question.fields.id.value}` : `collapse-${question.fields.id.value}`;

  const getAccordionId = (faq: FAQ) =>
    allTab ? `all-accordion-${faq?.fields.Key?.value}` : `accordion-${faq?.fields.Key?.value}`;

  const redirectToFAQ = useCallback((e: MouseEvent, target: string) => {
    const accordionId = allTab ? `#all-${target.substring(1)}` : target;

    const accordion = document.querySelector(accordionId);
    const currentTabPane = (e.target as Element)?.closest('.tab-pane');

    if (!accordion || !currentTabPane) return;

    const accordionTabPane = accordion.closest('.tab-pane');
    if (!accordionTabPane) return;

    if (currentTabPane.id !== accordionTabPane.id) {
      const tabSelector = `[data-bs-target='#${accordionTabPane.id}']`;
      const tabElement = document.querySelector(tabSelector);

      if (tabElement) {
        new tabRef.current!(tabElement).show();
      }
    }

    if (!accordion.classList.contains('show')) {
      const bsCollapse = new collapseRef.current!(accordion as HTMLElement, {
        toggle: true,
      });
      bsCollapse.show();
    }

    const parentElement = accordion.parentElement;
    if (!parentElement) return;

    const accordionPosition = parentElement.getBoundingClientRect().top + window.scrollY - 100;

    window.scrollTo({
      top: accordionPosition,
      behavior: 'smooth',
    });
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const anchor = (e.target as Element).closest('a');
    if (anchor) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        // if (!navigate.isReady) return;
        navigate.push(href);
      } else {
        const accordianId = anchor.getAttribute('data-bs-target');
        if (accordianId) {
          redirectToFAQ(e, accordianId);
        }
      }
    }
  }, []); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap').then(({ Collapse, Tab }) => {
        collapseRef.current = Collapse;
        tabRef.current = Tab;
      });
    }
  }, []);

  useEffect(() => {
    if (anchorRef.current != null) {
      const container = anchorRef.current;
      container.addEventListener('click', handleClick);
      return () => container.removeEventListener('click', handleClick);
    }
  }, [redirectToFAQ]);

  return (
    <>
      {showJumplink && (
        <FaqJumplink
          faq={faq}
          allFaq={allFaq}
          totalLimit={count}
          allTab={allTab}
          onClick={onClick}
          counter={counter}
        ></FaqJumplink>
      )}
      <div className="accordion-container" key={getKey()} id={getKey()}>
        <div className="d-flex justify-content-start justify-content-md-end faq-exp-col-btn">
          {showTitle && <h2 className="h4">{faq?.name}</h2>}
          <button
            className="btn btn-secondary btn-faq-mini btn-mini left with-bs-icon chevron-up-and-down expand-btn"
            type="button"
            onClick={expandAccordion}
          >
            Expand All
          </button>

          <button
            className="btn btn-secondary btn-faq-mini  btn-mini left with-bs-icon chevron-up-and-down-inverted collapse-btn"
            type="button"
            onClick={collapseAccordion}
          >
            Collapse All
          </button>
        </div>
        <div className="accordion accordion-flush" ref={anchorRef}>
          {faq &&
            faq.fields.Questions.map(
              (question, index) =>
                (count > index || count === 0) && (
                  <div className="accordion-item" key={getQuestionId(question)}>
                    <h3 className="accordion-header semibold h5" id={getHeadingId(question)}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${getCollapseId(question)}`}
                        aria-expanded="false"
                        aria-controls={getCollapseId(question)}
                      >
                        {question.fields.Heading?.value}
                      </button>
                    </h3>
                    <div
                      id={getCollapseId(question)}
                      className="accordion-collapse collapse"
                      aria-labelledby={getHeadingId(question)}
                      data-bs-parent={`#${getAccordionId(faq)}`}
                    >
                      <RichText
                        tag="div"
                        className="accordion-body"
                        field={question.fields.Description}
                      />
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default React.memo(IndividualFaqTab);
