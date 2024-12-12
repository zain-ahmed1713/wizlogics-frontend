import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface Module {
  title: string;
  content: string;
}

const ShowModules = () => {
  const [module, setModule] = useState<Module>();

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
      }
    } catch (error: any) {
      toast.error(
        error.response.data?.message || "Cannot fetch module at the moment"
      );
    }
  };

  useEffect(() => {
    fetchModule();
  }, []);

  return (
    <div className="w-full h-screen text-white">
      <div className="w-full py-8">
        <h2 className="text-4xl font-bold text-center text-slate-100">
          {module?.title}
        </h2>
      </div>
      <div className="w-full flex justify-center items-center px-6 tracking-wider leading-normal">
        <p className="text-slate-100">{module?.content}</p>
      </div>
      <div className="w-full flex justify-end px-8 py-6">
        <Button className="px-3">Mark as Completed</Button>
      </div>
    </div>
  );
};

export default ShowModules;
