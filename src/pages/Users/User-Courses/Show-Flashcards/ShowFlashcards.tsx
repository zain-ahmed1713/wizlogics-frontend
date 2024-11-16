import axios from "axios";
import { Button, Card, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface Flashcards {
  _id: string;
  question: string;
  answer: string;
}

const ShowFlashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcards[]>([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcards | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(
        `/api/admin/get-all-flashcards/${params?.deckId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setFlashcards(response?.data?.data);
      }
    } catch (error: any) {
      toast.error(
        error.response.data?.message || "Cannot fetch Flashcards at the moment"
      );
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleSeeAnswer = (flashcard: Flashcards) => {
    setSelectedFlashcard(flashcard);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedFlashcard(null);
    setIsModalOpen(false);
  };

  return (
    <div className="w-screen h-screen text-white">
      <div className="w-full py-8">
        <h2 className="text-4xl font-bold text-center">Flashcards</h2>
      </div>
      <div className="courses-cards px-4 flex justify-center items-center gap-4 flex-wrap">
        {flashcards?.map((flashcard) => (
          <Card key={flashcard._id} className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {flashcard.question}
            </h5>
            <Button onClick={() => handleSeeAnswer(flashcard)}>
              See Answer
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
        ))}
      </div>

      {selectedFlashcard && (
        <Modal show={isModalOpen} onClose={handleModalClose}>
          <Modal.Header>{selectedFlashcard.question}</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <p className="text-lg text-slate-100">
                {selectedFlashcard.answer}
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={() => toast.success("Marked Correct!")}>
                Correct
              </Button>
              <Button
                color="failure"
                onClick={() => toast.error("Marked Wrong!")}
              >
                Wrong
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ShowFlashcards;
