import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ShowCourse = () => {
  const [flashcard, setFlashcard] = useState<any>();
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);
  const params = useParams();

  const fetchFlashcard = async () => {
    try {
      const response = await axios.get(
        `/api/admin/get-flashcard/${params?.flashcardId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setFlashcard(response?.data?.data);
        setEditedQuestion(response?.data?.data?.question);
        setEditedAnswer(response?.data?.data?.answer);
      }
    } catch (error: any) {
      toast.error("Error fetching flashcard");
    }
  };

  const handleSaveFlashcard = async () => {
    try {
      const response = await axios.patch(
        `/api/admin/update-flashcard/${params?.flashcardId}`,
        {
          question: editedQuestion,
          answer: editedAnswer,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Flashcard updated successfully");
        setFlashcard(response?.data?.data);
        setIsEditingQuestion(false);
        setIsEditingAnswer(false);
      }
    } catch (error: any) {
      toast.error("Error updating flashcard");
    }
  };

  const handleQuestionBlur = () => {
    if (flashcard?.question !== editedQuestion) {
      handleSaveFlashcard();
    }
    setIsEditingQuestion(false);
  };

  const handleAnswerBlur = () => {
    if (flashcard?.answer !== editedAnswer) {
      handleSaveFlashcard();
    }
    setIsEditingAnswer(false);
  };

  useEffect(() => {
    fetchFlashcard();
  }, []);

  return (
    <div className="text-white px-3 py-2">
      <div className="mb-3">
        {isEditingQuestion ? (
          <input
            type="text"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
            onBlur={handleQuestionBlur}
            autoFocus
            className="text-4xl font-bold p-2 mb-3 bg-inherit"
          />
        ) : (
          <h2
            className="font-bold text-4xl mb-3 cursor-pointer"
            onClick={() => setIsEditingQuestion(true)}
          >
            {flashcard?.question}
          </h2>
        )}
      </div>

      <div className="mb-6">
        {isEditingAnswer ? (
          <textarea
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
            onBlur={handleAnswerBlur}
            autoFocus
            className="p-2 w-full bg-inherit"
          />
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setIsEditingAnswer(true)}
          >
            {flashcard?.answer}
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowCourse;
