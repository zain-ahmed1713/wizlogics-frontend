import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteCourseButton = (props: any) => {
  const deleteModule = async () => {
    try {
      const { setCourseData } = props.context;
      const response = await axios.delete(
        `/api/admin/delete-course/${props.data?._id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Course deleted successfully");
        setCourseData((prev: any) =>
          prev.filter((course: any) => course._id !== props.data._id)
        );
      }
    } catch (error: any) {
      toast.error("Error deleting course");
    }
  };

  return (
    <Button color="failure" onClick={deleteModule}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

export default DeleteCourseButton;
