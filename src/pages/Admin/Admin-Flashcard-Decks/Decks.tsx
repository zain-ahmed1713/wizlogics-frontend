import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import DeleteCourseButton from "./DeleteCourseButton";
import { deckColData } from "./decksData";
import DeleteDeckButton from "./DeleteDeckButton";

const Decks = () => {
  const [deckData, setDeckData] = useState<any>();
  const navigate = useNavigate();

  const fetchDecks = async () => {
    try {
      const response = await axios.get("/api/admin/get-all-decks", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setDeckData(response?.data?.data);
      } else {
        setDeckData([]);
      }
    } catch (error: any) {
      toast.error("Error fetching decks");
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const redirectToDeckPage = (event: any) => {
    if (event.colDef.field === "title") {
      navigate(`/admin-decks/${event.data._id}`);
    }
  };

  return (
    <div className="w-full h-full px-3 py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold mb-6">Flashcard Decks</h1>
        <Button color="success" onClick={() => navigate("/admin-create-deck")}>
          Add Deck
        </Button>
      </div>
      <div className="">
        <Table
          rowData={deckData}
          colData={[
            ...deckColData,
            {
              field: "",
              headerName: "",
              cellRenderer: (params: any) => (
                <DeleteDeckButton {...params} context={{ setDeckData }} />
              ),
              width: 100,
            },
          ]}
          handleClick={redirectToDeckPage}
        />
      </div>
    </div>
  );
};

export default Decks;
