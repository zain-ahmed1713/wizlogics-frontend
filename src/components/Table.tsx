import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const Table = ({
  rowData,
  colData,
  height,
  rowSelection,
  handleClick,
  onSelectionChanged,
}: {
  rowData: any;
  colData: any;
  handleClick?: any;
  rowSelection?: any;
  height?: number;
  onSelectionChanged?: any;
}) => {
  const handleCellClicked = (event: any) => {
    if (handleClick) {
      handleClick(event);
    }
  };

  return (
    <div className="ag-theme-quartz-dark" style={{ height: height || 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colData}
        pagination={true}
        paginationPageSize={200}
        paginationPageSizeSelector={[25, 50, 100, 200]}
        onCellClicked={handleCellClicked}
        rowSelection={rowSelection}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
};

export default Table;
