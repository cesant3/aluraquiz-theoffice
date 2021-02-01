import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function QuestionWidget({ question, totalQuestions, questionIndex }) {
    const questionId = `question__${questionIndex}`;

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
                <form>
                    {question.alternatives.map((alternative, index) => {
                        const alternativeId = `alternative__${index}`;
                        return (
                            <Widget.Topic
                                as="label"
                                htmlFor={alternativeId}>
                                <input
                                    id={alternativeId}
                                    name={questionId}
                                    type="radio" />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}

                    <Button type="submit">
                        Confirmar
                         </Button>
                </form>
            </Widget.Content>
        </Widget>
    )
}

export default function QuizPage() {
    const questionIndex = 0;
    const question = db.questions[questionIndex];
    const totalQuestions = db.questions.length;

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                <QuestionWidget
                    question={question}
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestions}
                />
            </QuizContainer>
        </QuizBackground>
    );
}