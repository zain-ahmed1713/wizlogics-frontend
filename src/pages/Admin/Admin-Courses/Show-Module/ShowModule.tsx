import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ShowModule = () => {
  const [module, setModule] = useState<any>();
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const params = useParams();

  const fetchModule = async () => {
    try {
      const response = await axios.get(
        `/api/admin/get-module/${params?.moduleId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setModule(response?.data?.data);
        setEditedTitle(response?.data?.data?.title);
        setEditedContent(response?.data?.data?.content);
      }
    } catch (error: any) {
      toast.error("Error fetching module");
    }
  };

  const handleSaveModule = async () => {
    try {
      const response = await axios.patch(
        `/api/admin/update-module/${params?.moduleId}`,
        {
          title: editedTitle,
          content: editedContent,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Module updated successfully");
        setModule(response?.data?.data);
        setIsEditingTitle(false);
        setIsEditingContent(false);
      }
    } catch (error: any) {
      toast.error("Error updating Module");
    }
  };

  const handleTitleBlur = () => {
    if (module?.title !== editedTitle) {
      handleSaveModule();
    }
    setIsEditingTitle(false);
  };

  const handleContentBlur = () => {
    if (module?.content !== editedContent) {
      handleSaveModule();
    }
    setIsEditingContent(false);
  };

  useEffect(() => {
    fetchModule();
  }, []);

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
            {module?.title}
          </h2>
        )}
      </div>

      <div className="mb-6">
        {isEditingContent ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onBlur={handleContentBlur}
            autoFocus
            className="p-2 w-full bg-inherit"
          />
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setIsEditingContent(true)}
          >
            {module?.content}
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowModule;
