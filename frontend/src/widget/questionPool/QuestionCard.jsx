import { useExamStore } from "@/store/useExamStore";
import React, { useState } from "react";

const QuestionCard = ({question, examStatus, number, correct}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setisCorrect] = useState(null)
  const {result, addCorrectQuestion} = useExamStore()

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setisCorrect(option == question.correctOption)
    if(option == question.correctOption) addCorrectQuestion(question)
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md bg-white">
      <h2 className="text-lg font-semibold flex gap-3 mb-4">{number}. {question.text}</h2>
      
      <ul className="space-y-2">
        {question.options.map((option, index) => {
          const isCorrect = selectedOption && option.label === question.correctOption;
          const isSelected = selectedOption === option.label;

          return (
            <li
              key={index}
              onClick={() => examStatus == "live" && handleOptionClick(option.label)}
              className={`
                cursor-pointer
                p-2
                border
                rounded
                hover:bg-gray-100
                ${isSelected ? "border-blue-500 bg-blue-200" : "" }
                ${examStatus !== "live" ? isCorrect || (correct && option.label == question.correctOption) ? "bg-green-200 border-green-500" : selectedOption && "bg-red-200 border-red-500" : ""}
              `}
            >
             <div className="flex gap-3">
              <div>{option.label}.</div>
              <div>{option.text}.</div>
             </div>
            </li>
          );
        })}
      </ul>
      
        <p className="mt-4 font-medium">
          {examStatus !== "live" && `Correct ✅ ${question.correctOption}`}
        </p>

         <p className="mt-4 font-medium">
          {examStatus !== "live" && `Explanation: ${question.explanation}`}
        </p>

    </div>
  );
};

export default QuestionCard;
