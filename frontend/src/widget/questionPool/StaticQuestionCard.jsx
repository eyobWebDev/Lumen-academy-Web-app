import { MathJax } from "better-react-mathjax";
import React from "react";
import{ useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const StaticQuestionCard = ({question}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md bg-white">
      <h2 className="text-lg font-semibold mb-4"><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} children={question.text} /></h2>
      
      <ul className="space-y-2">
        {question.options.map((option, index) => {
          const isCorrect = selectedOption && option === question.correctOption;
          const isSelected = selectedOption === option;

          return (
            <li
              key={index}
              onClick={() => handleOptionClick(option.label)}
              className={`
                cursor-pointer
                p-2
                border
                rounded
                hover:bg-gray-100
                ${isSelected ? (isCorrect ? "bg-green-200 border-green-500" : "bg-red-200 border-red-500") : ""}
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
      
        <p className="mt-4 font-medium">
          {`Correct ✅ ${question.correctOption}`}
        </p>

        <p className="mt-4 font-medium">
          Explanation: <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} children={question.explanation} />
        </p>

    </div>
  );
};

export default StaticQuestionCard;
