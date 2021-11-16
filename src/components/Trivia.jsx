import { useEffect, useState } from "react";
import useSound from "use-sound";
import correct from "../assets/src_sounds_correct.mp3";
import wrong from "../assets/src_sounds_wrong.mp3";

export default function Trivia({
    data,
    questionNumber,
    setQuestionNumber,
    setStop,
  }) {
      const[ question, setQuestion] = useState(null);
      const[ selectedAnswer, setSelectedAnswer] = useState(null);
      const[ className, setClassName] = useState("active");
      const [correctAnswer] = useSound(correct);
      const [wrongAnswer] = useSound(wrong);

      useEffect(() => {
          setQuestion(data[questionNumber - 1]);
      }, [data, questionNumber]);

      const handleClick = (m) => {
        setSelectedAnswer(m);
        setClassName("answer active");
        setTimeout(()=>{
          setClassName(m.correct ? "answer correct" : "answer wrong")
        },3000)
        setTimeout(()=>{
            if(m.correct){
                correctAnswer();
                setQuestionNumber((prev) => prev + 1);
            } else {
                setStop(true);
                wrongAnswer();
            }    
        },6000) 
    }

    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map(m => (
                    <div className={selectedAnswer === m ? className : "answer" } onClick={()=> handleClick(m)} >{m.text}</div>
                ))}
            </div>
        </div>
    )
}
