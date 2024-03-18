"use client";

import { MuiBox } from "./Box";
import { Paragraph } from "./Paragraph";
import { Color } from "../styles/colors";
import Spacer, { SpacerSizes } from "./Spacer";
import { MuiButton } from "./MuiButton";
import { useState } from "react";

const Game = ({
  questions,
  answers,
  correctAnswer,
  restartGame,
}: {
  questions: string[];
  answers: string[][];
  correctAnswer: string[];
  restartGame: Function;
}): any => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>();

  const nextQuestion = () => {
    updateScore();
    setSelectedAnswerIndex(5);
    setActiveQuestion((prev) => prev + 1);
  };
  const answerClicked = (answer: string, index: number) => {
    setSelectedAnswer(answer);
    setSelectedAnswerIndex(index);
  };

  const updateScore = () => {
    if (selectedAnswer === correctAnswer[activeQuestion]) {
      setScore((score) => score + 1);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        display: "grid",
        justifyContent: "center",
      }}
    >
      <Spacer size={SpacerSizes.medium} />
      {activeQuestion === questions.length ? (
        <MuiBox>
          <Paragraph>Results: {score}/5</Paragraph>
          <MuiButton onClick={() => restartGame()}>Start</MuiButton>
        </MuiBox>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spacer size={SpacerSizes.small} />
            <MuiBox>
              <div style={{ display: "flex" }}>
                <Paragraph>Question {activeQuestion + 1}/5 </Paragraph>
                <Spacer size={SpacerSizes.small} />
                <Paragraph>Score: {score}/5</Paragraph>
              </div>
              <h1>{questions[activeQuestion]}</h1>
            </MuiBox>
          </div>
          <Spacer size={SpacerSizes.small} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            {answers[activeQuestion].map((answer: any, index: number) => (
              <div key={index}>
                <MuiButton
                  background_color={
                    selectedAnswerIndex === index
                      ? Color.lightGrey
                      : Color.white
                  }
                  onClick={() => answerClicked(answer, index)}
                >
                  {answer}
                </MuiButton>
              </div>
            ))}
          </div>
          <MuiButton onClick={nextQuestion}>
            {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
          </MuiButton>
        </div>
      )}
    </div>
  );
};

export default Game;
