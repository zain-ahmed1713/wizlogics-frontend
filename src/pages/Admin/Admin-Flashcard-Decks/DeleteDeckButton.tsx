import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteDeckButton = (props: any) => {
  const deleteDeck = async () => {
    try {
      const { setDeckData } = props.context;
      const response = await axios.delete(
        `/api/admin/delete-deck/${props.data?._id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Deck deleted successfully");
        setDeckData((prev: any) =>
          prev.filter((deck: any) => deck._id !== props.data._id)
        );
      }
    } catch (error: any) {
      toast.error("Error deleting course");
    }
  };

  return (
    <Button color="failure" onClick={deleteDeck}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

export default DeleteDeckButton;
