import axios from "axios";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("Zain Ahmed");

  const navigate = useNavigate();

  const createCourse = async () => {
    try {
      if (!name || !description || !createdBy) {
        toast.error("All fields are required");
      }

      const response = await axios.post(
        "/api/admin/add-course",
        { name, description, createdBy },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Course created successfully");
        navigate("/admin-courses");
      }
    } catch (error: any) {
      toast.error(error?.message || "Internal Server Error");
    }
  };

  return (
    <div className="text-white px-3 py-2">
      <h2 className="font-bold text-4xl text-center mb-6">Create Course</h2>
      <div className="flex flex-col gap-2 px-2 py-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-inherit outline-none rounded px-2 py-1"
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-inherit outline-none rounded px-2 py-1"
        ></textarea>
        <label htmlFor="createdBy">Created By</label>
        <input
          type="text"
          id="createdBy"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          className="bg-inherit outline-none rounded px-2 py-1 mb-3"
        />
        <div className="w-full flex justify-end">
          <Button color="success" onClick={createCourse}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
