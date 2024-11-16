import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";

interface Course {
  _id: string;
  name: string;
  description: string;
}

const ShowCourseDetails = () => {
  const [course, setCourse] = useState<Course>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `/api/admin/get-course/${params?.courseId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCourse(response?.data?.data);
      }
    } catch (error: any) {
      toast.error(
        error.response.data?.message || "Cannot fetch course at the moment"
      );
    }
  };

  const enrollUser = async () => {
    try {
      const response = await axios.post(
        "/api/admin/enroll-in-course",
        {
          userID: user?._id,
          courseID: params?.courseId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("User enrolled successfully");
        navigate("/enrolled-courses");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Cannot enroll user at the moment"
      );
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  return (
    <div className="w-full h-screen text-white">
      <div className="w-full py-8">
        <h2 className="text-4xl font-bold text-center text-slate-100">
          {course?.name}
        </h2>
      </div>
      <div className="w-full flex justify-center items-center px-6 tracking-wider leading-normal">
        <p className="text-slate-100">{course?.description}</p>
      </div>
      <div className="w-full flex justify-end px-8 py-6">
        <Button className="px-3" onClick={enrollUser}>
          Enroll
        </Button>
      </div>
    </div>
  );
};

export default ShowCourseDetails;
