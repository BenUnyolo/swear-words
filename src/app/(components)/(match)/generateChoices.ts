import { words } from "@/lib/words";

export type Choice = { id: number; word: string };

export type Choices = {
  choiceOne: Choice;
  choiceTwo: Choice;
};

export const generateChoices = () => {
  const choices = {
    choiceOne: words[Math.floor(Math.random() * words.length)],
    choiceTwo: words[Math.floor(Math.random() * words.length)],
  };

  while (choices.choiceOne.id === choices.choiceTwo.id) {
    choices.choiceTwo = words[Math.floor(Math.random() * words.length)];
  }

  return choices;
};
