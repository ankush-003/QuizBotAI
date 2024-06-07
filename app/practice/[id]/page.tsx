"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
interface Question {
    index: number;
    question: string;
    answer: string;
    options: string[];
}

export default function Page({ params }: { params: { id: string } }) {
    const { data: session, update } = useSession();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const {
        data: quiz,
        isPending: isPending,
        isSuccess: isSuccess,
    } = useQuery({
        queryKey: ["currentQuiz", params.id],
        queryFn: async () => {
            const response = await fetch(`/api/quiz/${params.id}`);
            const data = await response.json();
            return data;
        },
    });

    useEffect(() => {
        if (quiz) {
            setCurrentQuestionIndex(0);
        }
    }, [quiz]);

    return (
        <div>
            {
                isPending ? (
                    <div>Loading...</div>
                )   : (
                    <div>
                        <h1>Quiz {quiz.topic}</h1>
                        <p>{quiz.questions[currentQuestionIndex].question}</p>
                        <ul>
                            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                                <li key={index}>{option}</li>
                            ))}
                        </ul>
                        <div>
                            <Button onClick={() => {
                                if (currentQuestionIndex < quiz.questions.length - 1) {
                                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                                }
                            }}>Next</Button>
                            </div>
                    </div>
                )
            }
        </div>
    )
}