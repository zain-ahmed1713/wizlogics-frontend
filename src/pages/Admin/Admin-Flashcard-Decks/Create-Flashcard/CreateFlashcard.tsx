import axios from "axios";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CreateFlashcard = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const createFlashcard = async () => {
    try {
      if (!question || !answer) {
        toast.error("All fields are required");
      }

      const response = await axios.post(
        `/api/admin/add-flashcard/${params?.deckId}`,
        { question, answer },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Flashcard created successfully");
        navigate(`/admin-decks/${params?.deckId}`);
      }
    } catch (error: any) {
      toast.error(error?.message || "Internal Server Error");
    }
  };

  return (
    <div className="text-white px-3 py-2">
      <h2 className="font-bold text-4xl text-center mb-6">Create Flashcard</h2>
      <div className="flex flex-col gap-2 px-2 py-2">
        <label htmlFor="title">Question</label>
        <input
          type="text"
          id="title"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-inherit outline-none rounded px-2 py-1"
        />
        <label htmlFor="description">Answer</label>
        <textarea
          id="description"
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="bg-inherit outline-none rounded px-2 py-1 mb-3"
        ></textarea>
        <div className="w-full flex justify-end">
          <Button color="success" onClick={createFlashcard}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashcard;
