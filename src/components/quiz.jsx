import { useState } from "react";
import Results from './results';

function Quiz() {
  const questionBank = [
    {
      question: "What is capital of France?",
      options: ["Berlin", "London", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which language is used for web apps?",
      options: ["PHP", "Python", "JS", "All"],
      answer: "All",
    },
    {
      question: "What does JSX stands for?",
      options: [
        "JavaScript XML",
        "Java Syntax eXtension",
        "Just a Simple eXample",
        "None of the a above",
      ],
      answer: "JavaScript XML",
    },
  ];

  const initialAnswers = [null, null, null];
  const [userAnswers, setUserAnswers] = useState(initialAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isQuizFinished, setIsQuizFinished] = useState(false)

  const selectedAnswer = userAnswers[currentQuestion];

  function handleOptionSelect(value) {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = value;

    setUserAnswers(newUserAnswers);
    console.log(value);
    console.log(newUserAnswers);
  }

  function nextQues() {
    if (currentQuestion === questionBank.length - 1)
    {setIsQuizFinished(true)
    }else{
    
    setCurrentQuestion(currentQuestion + 1);
    }
  }

  function prevQues(currentQuestion) {
    if (currentQuestion > 0) {
      currentQuestion -= 1;
      setCurrentQuestion(currentQuestion);
    }
  }

  function restartQuiz() {
    setUserAnswers(initialAnswers);
    setCurrentQuestion(0);
    setIsQuizFinished(false);
  }

    if (isQuizFinished){
        return <Results userAnswers={userAnswers} questionBank={questionBank}
        restartQuiz={restartQuiz }/>;
    }

  return (
    <div>
      <h2>Question {currentQuestion + 1}.</h2>
      <p className="question">{questionBank[currentQuestion].question}</p>
      {questionBank[currentQuestion].options.map((value) => (
        <button 
            className={"option"+ (selectedAnswer === value ?
             " selected" : "")} onClick={() => handleOptionSelect(value)}>
          {value}
        </button>
      ))}

      <div className="nav-buttons">
        <button
          onClick={() => prevQues(currentQuestion)}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          onClick={() => nextQues()}
          disabled={!selectedAnswer}
        >
          {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
        </button>

      </div>
    </div>
  );
}

export default Quiz;
