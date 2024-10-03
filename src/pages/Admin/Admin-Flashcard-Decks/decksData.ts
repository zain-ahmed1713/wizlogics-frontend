import { ColDef } from "ag-grid-community";
export interface DeckRowData {
  _id: string;
  title: string;
}

export const deckColData: ColDef<DeckRowData>[] = [
  { field: "title", headerName: "Title" },
];
