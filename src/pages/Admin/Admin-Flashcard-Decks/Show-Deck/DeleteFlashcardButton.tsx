import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "flowbite-react";

const DeleteFlashcardButton = (props: any) => {
  const deleteFlashcard = async () => {
    try {
      const { setFlashcardData } = props.context;
      const response = await axios.delete(
        `/api/admin/delete-flashcard/${props.data?._id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Flashcard deleted successfully");
        setFlashcardData((prev: any) =>
          prev.filter((flashcard: any) => flashcard._id !== props.data._id)
        );
      }
    } catch (error: any) {
      toast.error("Error deleting flashcard");
    }
  };

  return (
    <Button color="failure" onClick={deleteFlashcard}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

export default DeleteFlashcardButton;
