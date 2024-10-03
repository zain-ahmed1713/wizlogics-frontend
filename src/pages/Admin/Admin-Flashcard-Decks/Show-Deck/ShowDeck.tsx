import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import Table from "../../../../components/Table";
import { flashcardColData } from "./flashcardData";
import DeleteFlashcardButton from "./DeleteFlashcardButton";

const ShowDeck = () => {
  const [deck, setDeck] = useState<any>();
  const [flashcardData, setFlashcardData] = useState<any>();
  const [editedTitle, setEditedTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const fetchDeck = async () => {
    try {
      const response = await axios.get(
        `/api/admin/get-deck/${params?.deckId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setDeck(response?.data?.data);
        setEditedTitle(response?.data?.data?.title);
      }
    } catch (error: any) {
      toast.error("Error fetching deck");
    }
  };

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(
        `/api/admin/get-all-flashcards/${params?.deckId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setFlashcardData(response?.data?.data);
      } else {
        setFlashcardData([]);
      }
    } catch (error: any) {
      toast.error("Error fetching flashcards");
    }
  };

  const handleSaveDeck = async () => {
    try {
      const response = await axios.patch(
        `/api/admin/update-deck/${params?.deckId}`,
        {
          title: editedTitle,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Deck updated successfully");
        setDeck(response?.data?.data);
        setIsEditingTitle(false);
      }
    } catch (error: any) {
      toast.error("Error updating Deck");
    }
  };

  const handleTitleBlur = () => {
    if (deck?.title !== editedTitle) {
      handleSaveDeck();
    }
    setIsEditingTitle(false);
  };

  useEffect(() => {
    fetchDeck();
    fetchFlashcards();
  }, []);

  const redirectToFlashcardPage = (event: any) => {
    if (event.colDef.field === "question") {
      navigate(`/admin-flashcard/${event.data?._id}`);
    }
  };

  return (
    <div className="text-white px-3 py-2">
      <div className="mb-3">
        {isEditingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleBlur}
            autoFocus
            className="text-4xl font-bold p-2 mb-3 bg-inherit"
          />
        ) : (
          <h2
            className="font-bold text-4xl mb-3 cursor-pointer"
            onClick={() => setIsEditingTitle(true)}
          >
            {deck?.title}
          </h2>
        )}
      </div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-2xl">Flashcards</h3>
        <Button
          color="success"
          onClick={() =>
            navigate(`/admin-decks/${params?.deckId}/flashcard/create`)
          }
        >
          Add Flashcard
        </Button>
      </div>

      <div className="">
        <Table
          rowData={flashcardData}
          colData={[
            ...flashcardColData,
            {
              field: "",
              headerName: "",
              cellRenderer: (params: any) => (
                <DeleteFlashcardButton
                  {...params}
                  context={{ setFlashcardData }}
                />
              ),
            },
          ]}
          handleClick={redirectToFlashcardPage}
        />
      </div>
    </div>
  );
};

export default ShowDeck;
