import axios from "axios";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateDeck = () => {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const createDeck = async () => {
    try {
      if (!title) {
        toast.error("Title is required");
      }

      const response = await axios.post(
        "/api/admin/add-deck",
        { title },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Deck created successfully");
        navigate("/admin-decks");
      }
    } catch (error: any) {
      toast.error(error?.message || "Internal Server Error");
    }
  };

  return (
    <div className="text-white px-3 py-2">
      <h2 className="font-bold text-4xl text-center mb-6">Create Deck</h2>
      <div className="flex flex-col gap-2 px-2 py-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-inherit outline-none rounded px-2 py-1 mb-3"
        />
        <div className="w-full flex justify-end">
          <Button color="success" onClick={createDeck}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
