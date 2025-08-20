interface IQuestionItem {
  question: string;
  answer: string;
  index: number;
}

export const QuestionItem = ({ index, question, answer }: IQuestionItem) => {
  return (
    <li className="flex flex-col gap-2 py-6 first:pt-0 last:pb-0">
      <div className="text-title-light text-[0.9375rem] font-semibold">
        <span className="pr-1.5 pl-1">{index + 1}.</span>
        {question}
      </div>
      <div>{answer}</div>
    </li>
  );
};

interface IQuestionList {
  items: { question: string; answer: string }[];
}

export const QuestionList = ({ items }: IQuestionList) => {
  return (
    <ol className="divide-b-light divide-y">
      {items.map((item, index) => (
        <QuestionItem
          key={index}
          question={item.question}
          index={index}
          answer={item.answer}
        />
      ))}
    </ol>
  );
};
