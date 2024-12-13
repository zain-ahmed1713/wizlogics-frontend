import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../../components/Table";
import { moduleColData } from "./moduleData";
import DeleteButton from "./DeleteButton";

const ShowCourse = () => {
  const [course, setCourse] = useState<any>();
  const [modulesData, setModulesData] = useState<any>();
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `/api/admin/get-course/${params?.courseId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCourse(response?.data?.data);
        setEditedName(response?.data?.data?.name);
        setEditedDescription(response?.data?.data?.description);
      }
    } catch (error: any) {
      toast.error("Error fetching course");
    }
  };

  const fetchModule = async () => {
    try {
      const response = await axios.get(
        `/api/admin/get-all-modules/${params?.courseId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setModulesData(response?.data?.data);
      } else {
        setModulesData([]);
      }
    } catch (error: any) {
      toast.error("Error fetching modules");
    }
  };

  const handleSaveCourse = async () => {
    try {
      const response = await axios.patch(
        `/api/admin/update-course/${params?.courseId}`,
        {
          name: editedName,
          description: editedDescription,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Course updated successfully");
        setCourse(response?.data?.data);
        setIsEditingName(false);
        setIsEditingDescription(false);
      }
    } catch (error: any) {
      toast.error("Error updating course");
    }
  };

  const handleNameBlur = () => {
    if (course?.name !== editedName) {
      handleSaveCourse();
    }
    setIsEditingName(false);
  };

  const handleDescriptionBlur = () => {
    if (course?.description !== editedDescription) {
      handleSaveCourse();
    }
    setIsEditingDescription(false);
  };

  useEffect(() => {
    fetchCourse();
    fetchModule();
  }, []);

  const redirectToModulePage = (event: any) => {
    if (event.colDef.field === "title") {
      navigate(`/admin-modules/${event.data._id}`);
    }
  };

  return (
    <div className="text-white px-3 py-2 overflow-auto h-screen">
      <div className="mb-3">
        {isEditingName ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleNameBlur}
            autoFocus
            className="text-4xl font-bold p-2 mb-3 bg-inherit"
          />
        ) : (
          <h2
            className="font-bold text-4xl mb-3 cursor-pointer"
            onClick={() => setIsEditingName(true)}
          >
            {course?.name}
          </h2>
        )}
      </div>

      <div className="mb-6">
        {isEditingDescription ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            onBlur={handleDescriptionBlur}
            autoFocus
            className="p-2 w-full bg-inherit"
          />
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setIsEditingDescription(true)}
          >
            {course?.description}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-2xl">Modules</h3>
        <Button
          color="success"
          onClick={() =>
            navigate(`/admin-courses/${params?.courseId}/modules/create-module`)
          }
        >
          Add Module
        </Button>
      </div>

      <div className="">
        <Table
          rowData={modulesData}
          colData={[
            ...moduleColData,
            {
              field: "",
              headerName: "",
              cellRenderer: (params: any) => (
                <DeleteButton {...params} context={{ setModulesData }} />
              ),
            },
          ]}
          handleClick={redirectToModulePage}
        />
      </div>
    </div>
  );
};

export default ShowCourse;
