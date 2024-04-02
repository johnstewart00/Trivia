"use client";

import { MuiBox } from "./components/Box";
import backgroundTriviaImage from "../../public/CloudyBlue.jpg";
import Image from "next/image";
import Spacer, { SpacerSizes } from "./components/Spacer";
import { MuiButton } from "./components/MuiButton";
import { Banner } from "./components/Banner";
import { CenterPage } from "./components/CenterPage";
import $ from "jquery";
import { useState } from "react";
import Game from "./components/Game";
import { Color } from "./styles/colors";
import { Paragraph } from "./components/Paragraph";
import Register from "./components/Register";
import Header from "./components/Header";
import { Login } from "./components/Login";

export default function Home() {
  const [category, setCategory] = useState<number | undefined>(); // Adjust the type here
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<any[]>([]);
  const [started, setStarted] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [password, setPassword] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();

  async function startGame() {
    await setAllQuestions();
    setStarted(true);
  }
  async function setAllQuestions() {
    let data: any = await getQuestions();
    let tempQuestions = [];
    let possibleAnswers: any = [];
    let correctAnswers = [];
    for (let i = 0; i < 5; i++) {
      let tempQuestion: any = data.results[i].question;
      tempQuestion = filterString(tempQuestion);
      tempQuestions.push(tempQuestion);
      var tempPossibleAnswers = [...data.results[i].incorrect_answers]; // Create a copy
      var correctAnswer = data.results[i].correct_answer;
      tempPossibleAnswers.push(correctAnswer);
      tempPossibleAnswers = filterAnswers(tempPossibleAnswers);
      tempPossibleAnswers = shuffle(tempPossibleAnswers);
      possibleAnswers.push(tempPossibleAnswers); // Push the modified copy
      correctAnswers.push(correctAnswer);
    }
    setQuestions(tempQuestions);
    setAnswers(possibleAnswers);
    setCorrectAnswer(correctAnswers);
  }

  const getQuestions = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: "GET",
        url: `https://opentdb.com/api.php?amount=5&category=${category}`,
        success: function (data: any) {
          resolve(data);
        },
        error: function (errorThrown: any) {
          reject(errorThrown);
        },
      });
    });
  };
  const setSubject = (cat: number) => {
    setCategory(cat); // Updating context value using a setter function
    setSelectedCategory(cat);
  };
  function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const filterString = (str: string) => {
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&shy;/g, "-");
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&ouml;/g, "Ö");
    str = str.replace(/&auml;/g, "ä");
    str = str.replace(/&aring;/g, "Ä");
    str = str.replace(/&.*?;/g, ""); // this should just delete anything else
    return str;
  };
  const filterAnswers = (answers: any) => {
    for (let i = 0; i < answers.length; i++) {
      answers[i] = filterString(answers[i]);
    }
    return answers;
  };
  const restartGame = () => {
    setStarted(false);
    setSelectedCategory(undefined);
  };
  const register = () => {
    setShowRegister(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    setQuestions([]);
    setSelectedCategory(undefined);
    setCategory(undefined);
    setShowRegister(false);
    setStarted(false);
  };
  return (
    <div>
      {loggedIn ? (
        <div style={{ position: "absolute", width: "100%", height: "100vh" }}>
          <Image
            src={backgroundTriviaImage}
            alt="backgroundTriviaImage"
            layout="fill"
            objectFit="cover"
            quality={100}
          />

          <div
            style={{
              position: "absolute",
              width: "100%",
            }}
          >
            <Header handleLogOut={handleLogOut} />
            <Spacer size={SpacerSizes.large} />
            <CenterPage>
              <Banner />
              {started ? (
                <Game
                  questions={questions}
                  answers={answers}
                  correctAnswer={correctAnswer}
                  restartGame={restartGame}
                />
              ) : (
                <div>
                  <MuiBox>Choose a category</MuiBox>
                  <MuiButton
                    onClick={() => setSubject(9)}
                    background_color={
                      selectedCategory === 9 ? Color.turquoiseGreen : undefined
                    }
                  >
                    General Knowledge
                  </MuiButton>
                  <MuiButton
                    onClick={() => setSubject(10)}
                    background_color={
                      selectedCategory === 10 ? Color.turquoiseGreen : undefined
                    }
                  >
                    Books
                  </MuiButton>
                  <MuiButton
                    onClick={() => setSubject(11)}
                    background_color={
                      selectedCategory === 11 ? Color.turquoiseGreen : undefined
                    }
                  >
                    Film
                  </MuiButton>
                  <MuiButton
                    onClick={() => setSubject(12)}
                    background_color={
                      selectedCategory === 12 ? Color.turquoiseGreen : undefined
                    }
                  >
                    Music
                  </MuiButton>
                  <MuiButton
                    onClick={() => setSubject(20)}
                    background_color={
                      selectedCategory === 20 ? Color.turquoiseGreen : undefined
                    }
                  >
                    Mythology
                  </MuiButton>
                  <Spacer size={SpacerSizes.medium} />
                  <MuiButton onClick={startGame}>Start</MuiButton>
                </div>
              )}
            </CenterPage>
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", width: "100%", height: "100vh" }}>
          <Image
            src={backgroundTriviaImage}
            alt="backgroundTriviaImage"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
            }}
          >
            {showRegister ? (
              <Register
                setLoggedIn={setLoggedIn}
                setShowRegister={setShowRegister}
              />
            ) : (
              <div>
                <Spacer size={SpacerSizes.large} />
                <CenterPage>
                  <MuiBox>
                    <Paragraph>
                      Welcome to trivia, please sign in or play as a guest
                    </Paragraph>
                    <Spacer size={SpacerSizes.medium} />
                    <Login
                      username={username}
                      setUsername={setUsername}
                      password={password}
                      setPassword={setPassword}
                      setLoggedIn={setLoggedIn}
                    />
                    <MuiButton onClick={register}>Register Here</MuiButton>
                    <MuiButton onClick={() => setLoggedIn(true)}>
                      Continue as guest
                    </MuiButton>
                  </MuiBox>
                </CenterPage>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
