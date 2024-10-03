import { ColDef } from "ag-grid-community";
export interface FlashcardRowData {
  _id: string;
  question: string;
  createdAt: Date;
  updatedAt: Date;
}

export const flashcardColData: ColDef<FlashcardRowData>[] = [
  { field: "question", headerName: "Title" },
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
