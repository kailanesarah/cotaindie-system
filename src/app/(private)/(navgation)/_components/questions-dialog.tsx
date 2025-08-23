import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogHeaderContent,
  DialogIcon,
  DialogTitle,
} from "@/components/ui/dialog";
import { questionsItems } from "../_constants/questions-items";
import { QuestionList } from "./question-list";

export const QuestionsDialog = () => {
  return (
    <DialogContent size="medium">
      <DialogHeader>
        <DialogIcon name="indeterminate_question_box" />
        <DialogHeaderContent>
          <DialogTitle>Perguntas e respostas sobre o sistema</DialogTitle>
          <DialogDescription>
            Aqui você vai ter uma orientação mais avançada sobre alguns tópicos.
          </DialogDescription>
        </DialogHeaderContent>
      </DialogHeader>
      <DialogBody>
        <QuestionList items={questionsItems} />
      </DialogBody>
    </DialogContent>
  );
};
