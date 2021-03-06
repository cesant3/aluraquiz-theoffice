import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
        </Widget.Header>

            <Widget.Content>
                [Desafio do Loading]
        </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({
    question,
    totalQuestions,
    questionIndex,
    onSubmit
}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

    return (
        <Widget>
            <Widget.Header>
                <h3>
                    {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                </h3>
            </Widget.Header>
            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>{question.title}</h2>
                <p>{question.description}</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                            onSubmit();
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                        }, 1 * 1000);
                    }}
                >
                    {question.alternatives.map((alternative, index) => {
                        const alternativeId = `alternative__${index}`;
                        return (
                            <Widget.Topic
                                as="label"
                                key={alternativeId}
                                htmlFor={alternativeId}
                            >
                                <input
                                    id={alternativeId}
                                    name={questionId}
                                    onChange={() => setSelectedAlternative(index)}
                                    type="radio"
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}

                    <Button type="submit" disabled={!hasAlternativeSelected}>
                        Confirmar
                    </Button>
                    {isQuestionSubmited && isCorrect && <p>Você acertou!!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você errou!!</p>}
                </form>
            </Widget.Content>
        </Widget>
    )
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
}

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    React.useEffect(() => {
        // fetch()...
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1 * 1000);
    }, [])

    function handleSubmit() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(questionIndex + 1);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />

                {screenState === screenStates.QUIZ && (
                    <QuestionWidget
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmit}
                    />
                )}
                {screenState === screenStates.LOADING && (<LoadingWidget />)}
                {screenState === screenStates.RESULT && (<div>Você acertou x parabéns!</div>)}
            </QuizContainer>
        </QuizBackground>
    );
}