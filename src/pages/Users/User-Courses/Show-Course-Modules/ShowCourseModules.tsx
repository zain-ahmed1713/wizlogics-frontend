import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

interface Modules {
  _id: string;
  title: string;
}

const ShowCourseModules = () => {
  const [modules, setModules] = useState<Modules[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  const fetchModules = async () => {
    try {
      const response = await axios.get(
        `/api/admin/get-all-modules/${params?.courseId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setModules(response.data?.data);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Cannot fetch modules at the moment"
      );
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div className="w-screen h-screen text-white">
      <div className="w-full py-8">
        <h2 className="text-4xl font-bold text-center">Modules</h2>
      </div>
      <div className="courses-cards px-4 flex justify-center items-center gap-4 flex-wrap">
        {modules?.map((module) => (
          <Card key={module._id} className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {module.title}
            </h5>
            <Button onClick={() => navigate(`/module/${module._id}`)}>
              Continue
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowCourseModules;
