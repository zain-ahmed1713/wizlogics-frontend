import { ColDef } from "ag-grid-community";
export interface CourseRowData {
  _id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const courseColData: ColDef<CourseRowData>[] = [
  { field: "name", headerName: "Name" },
  { field: "createdBy", headerName: "Created By" },
  {
    field: "createdAt",
    headerName: "Created At",
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
];
