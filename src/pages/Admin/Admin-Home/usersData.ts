import { ColDef } from "ag-grid-community";
export interface UserRowData {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  rank: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userColData: ColDef<UserRowData>[] = [
  { field: "name", headerName: "Name" },
  { field: "username", headerName: "Username" },
  { field: "email", headerName: "Email" },
  { field: "role", headerName: "Role" },
  { field: "rank", headerName: "Rank" },
  {
    field: "createdAt",
    headerName: "Registered On",
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: "updatedAt",
    headerName: "Last Logged In",
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
];
