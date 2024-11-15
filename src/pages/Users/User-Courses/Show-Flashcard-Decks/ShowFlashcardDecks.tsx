import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Decks {
  _id: string;
  title: string;
}

const ShowFlashcardDecks = () => {
  const [decks, setDecks] = useState<Decks[]>([]);
  const navigate = useNavigate();

  const fetchDecks = async () => {
    try {
      const response = await axios.get("/api/admin/get-all-decks", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setDecks(response?.data?.data);
      }
    } catch (error: any) {
      toast.error(
        error.response.data?.message || "Cannot fetch Decks at the moment"
      );
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <div className="w-screen h-screen text-white">
      <div className="w-full py-8">
        <h2 className="text-4xl font-bold text-center">Flashcard Decks</h2>
      </div>
      <div className="courses-cards px-4 flex justify-center items-center gap-4 flex-wrap">
        {decks?.map((deck) => (
          <Card key={deck._id} className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {deck.title}
            </h5>
            <Button onClick={() => navigate(`/flashcard-decks/${deck._id}`)}>
              Explore Deck
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
    </div>
  );
};

export default ShowFlashcardDecks;
