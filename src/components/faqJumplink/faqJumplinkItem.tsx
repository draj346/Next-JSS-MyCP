import { FaqJumplinkItemTypes, Question } from "lib/component-props/faq";
import Link from "next/link";
import React from "react";

const FaqJumplinkItem = ({ faq, limit, offset, allTab, onClick }: FaqJumplinkItemTypes) => {
  const getCollapseId = (question: Question) =>
    allTab ? `all-collapse-${question.fields.id.value}` : `collapse-${question.fields.id.value}`;

  return (
    <>
      {faq && faq.fields.Questions?.length > 0 &&
        faq.fields.Questions.slice(offset, limit).map((question: Question, index:number) => (
          <li key={index}>
            <Link
              className="btn-mini"
              data-bs-target={`#${getCollapseId(question)}`}
              href="/"
              onClick={onClick}
            >
              {question.fields.Heading?.value}
            </Link>
          </li>
        ))}
    </>
  );
};

export default FaqJumplinkItem;
