import { ColDef } from "ag-grid-community";
export interface ModuleRowData {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export const moduleColData: ColDef<ModuleRowData>[] = [
  { field: "title", headerName: "Title" },
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
