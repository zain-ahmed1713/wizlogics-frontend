import axios from "axios";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CreateModule = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState<number>();

  const navigate = useNavigate();
  const params = useParams();

  const createModule = async () => {
    try {
      if (!title || !content || !order) {
        toast.error("All fields are required");
      }

      const response = await axios.post(
        `/api/admin/add-module/${params?.courseId}`,
        { title, content, order },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Course created successfully");
        navigate(`/admin-courses/${params?.courseId}`);
      }
    } catch (error: any) {
      toast.error(error?.message || "Internal Server Error");
    }
  };

  return (
    <div className="text-white px-3 py-2">
      <h2 className="font-bold text-4xl text-center mb-6">Create Module</h2>
      <div className="flex flex-col gap-2 px-2 py-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-inherit outline-none rounded px-2 py-1"
        />
        <label htmlFor="description">Content</label>
        <textarea
          id="description"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-inherit outline-none rounded px-2 py-1"
        ></textarea>
        <label htmlFor="createdBy">Order</label>
        <input
          type="number"
          id="createdBy"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="bg-inherit outline-none rounded px-2 py-1 mb-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <div className="w-full flex justify-end">
          <Button color="success" onClick={createModule}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateModule;
