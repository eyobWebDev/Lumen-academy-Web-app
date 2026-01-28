import { useExamStore } from "@/store/useExamStore";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const QuestionCard = ({question, examStatus, number}) => {
  const {answers, selectAnswer} = useExamStore()


  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md bg-white">
      <h2 className="text-lg font-semibold flex gap-3 mb-4">{number}. <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} children={question.text} /></h2>
      
      <ul className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = answers[number - 1] === option.label;
          const selectedAnswer = answers[number - 1];

          return (
            <li
              key={index}
              //onClick={() => examStatus == "live" && handleOptionClick(option.label)}
              onClick={() => examStatus == "live" && selectAnswer(number - 1, option.label)}
              className={`
                cursor-pointer
                p-2
                border
                rounded
                hover:bg-gray-100
                ${isSelected ? "border-blue-500 bg-blue-200" : "" }
                ${examStatus !== "live" ?  option.label == question.correctOption && selectedAnswer ? "bg-green-200 border-green-500" : selectedAnswer == option.label && "bg-red-200 border-red-500" : ""}
              `}
            >
             <div className="flex gap-3">
              <div>{option.label}.</div>
              <div><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} children={option.text} /></div>
             </div>
            </li>
          );
        })}
      </ul>
      
        <div className="mt-4 font-medium">
          {examStatus !== "live" && `Correct ✅ ${question.correctOption}`}
        </div>

         <div className="mt-4 font-medium">
          {examStatus !== "live" && "Exdivlanation: "} {examStatus !== "live" && <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} children={question.explanation} />}
        </div>

    </div>
  );
};

export default QuestionCard;
