import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteButton = (props: any) => {
  const deleteModule = async () => {
    try {
      const { setModulesData } = props.context;
      const response = await axios.delete(
        `/api/admin/delete-module/${props.data?._id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Module deleted successfully");
        setModulesData((prev: any) =>
          prev.filter((module: any) => module._id !== props.data._id)
        );
      }
    } catch (error: any) {
      toast.error("Error deleting module");
    }
  };

  return (
    <Button color="failure" onClick={deleteModule}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

export default DeleteButton;
