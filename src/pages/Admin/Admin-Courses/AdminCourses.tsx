import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import axios from "axios";
import toast from "react-hot-toast";
import { courseColData } from "./courseData";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import DeleteCourseButton from "./DeleteCourseButton";

const AdminCourses = () => {
  const [courseData, setCourseData] = useState<any>();
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/admin/get-all-courses", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setCourseData(response?.data?.data);
      } else {
        setCourseData([]);
      }
    } catch (error: any) {
      toast.error("Error fetching courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const redirectToCoursePage = (event: any) => {
    if (event.colDef.field === "name") {
      navigate(`/admin-courses/${event.data._id}`);
    }
  };

  return (
    <div className="w-full h-full px-3 py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold mb-6">Courses</h1>
        <Button
          color="success"
          onClick={() => navigate("/admin-create-course")}
        >
          Add Course
        </Button>
      </div>
      <div className="">
        <Table
          rowData={courseData}
          colData={[
            ...courseColData,
            {
              field: "",
              headerName: "",
              cellRenderer: (params: any) => (
                <DeleteCourseButton {...params} context={{ setCourseData }} />
              ),
            },
          ]}
          handleClick={redirectToCoursePage}
        />
      </div>
    </div>
  );
};

export default AdminCourses;
