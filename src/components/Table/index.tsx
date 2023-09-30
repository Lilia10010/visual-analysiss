import { useState } from "react";

export type TableColumn = {
  Header: string;
  accessor: string;
  Cell?: (row: any) => JSX.Element;
};

type TableProps = {
  columns: TableColumn[];
  data: any[];
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
};

const Table = ({
  columns,
  data,
  totalItems = 10,
  onPageChange,
  onPageSizeChange,
}: TableProps) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleRowSelection = (rowIndex: number) => {
    const isSelected = selectedRows.includes(rowIndex);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  const toggleAllRowsSelection = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      const allRowIndices = Array.from(Array(data.length).keys());
      setSelectedRows(allRowIndices);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    if (onPageSizeChange) onPageSizeChange(newItemsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageRange = 1;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    if (currentPage - pageRange > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center border border-gray-300 rounded font-bold"
        >
          1
        </button>
      );
      if (currentPage - pageRange > 2) {
        pageNumbers.push(<span key={-1}>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center border border-gray-300 rounded font-bold ${
            i === currentPage ? "text-white bg-contrast-blue" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage + pageRange < totalPages) {
      if (currentPage + pageRange < totalPages - 1) {
        pageNumbers.push(<span key={-2}>...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center border border-gray-300 rounded font-bold"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div
      style={{
        boxShadow: "0px 0px 15px 3px rgba(0, 0, 0, 0.3)",
        tableLayout: "auto",
      }}
      className="w-full text-left rounded-xl  bg-white"
    >
      <div className="w-full overflow-auto">
        <table className="w-max md:w-full overflow-auto">
          <thead className="w-fit">
            <tr>
              {columns.map((column, columnIndex) => (
                <th
                  key={columnIndex}
                  className={`p-3 font-bold w-fit  ${
                    column.accessor === "checkbox" ? "w-4" : ""
                  }`}
                >
                  {column.Header}
                  {column.accessor === "checkbox" && (
                    <input
                      type="checkbox"
                      className="h-6 w-6 ml-3 mt-3 "
                      checked={selectedRows.length === data.length}
                      onChange={toggleAllRowsSelection}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full pt-4">
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className="w-fit">
                {columns.map((column, columnIndex) => (
                  <td
                    key={columnIndex}
                    className={`px-3 py-2 border-t-2 border-gray-200 w-fit  ${
                      rowIndex % 2 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    {column.accessor === "checkbox" ? (
                      <input
                        type="checkbox"
                        className="h-6 w-6 ml-3 mt-3 "
                        checked={selectedRows.includes(rowIndex)}
                        onChange={() => toggleRowSelection(rowIndex)}
                      />
                    ) : column.Cell ? (
                      column.Cell({ row })
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center flex-col-reverse w-full gap-3 sm:flex-row sm:justify-between p-4 border-t border-gray-200">
        <div>
          Itens por página:
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="ml-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex gap-3 ">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center border border-gray-300 rounded"
          >
            {"<"}
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center border border-gray-300 rounded"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
