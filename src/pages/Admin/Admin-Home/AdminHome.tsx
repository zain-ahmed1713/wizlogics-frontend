import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { userColData } from "./usersData";
import axios from "axios";
import toast from "react-hot-toast";

const AdminHome = () => {
  const [userData, setUserData] = useState<any>();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/admin/get-all-users");

      if (response.status === 200) {
        setUserData(response?.data?.data);
      } else {
        setUserData([]);
      }
    } catch (error: any) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full h-full px-3 py-2">
      <h1 className="text-white text-4xl font-bold mb-6">Users</h1>
      <div className="">
        <Table rowData={userData} colData={userColData} />
      </div>
    </div>
  );
};

export default AdminHome;
