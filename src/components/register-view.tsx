import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

type ColumnWidthData = {
  [key: string]: number;
};

type RegisterViewProps = {
  columns: any[];
  dataSource: any[];
  columnWidthData?: ColumnWidthData;
  onColumnResize?: (widthData: ColumnWidthData) => void;
};

const ResizableTitle: React.FC<any> = (props) => {
  const { onResize, width, onResizeStop, ...restProps } = props;

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      onResizeStop={onResizeStop}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export const RegisterView: React.FC<RegisterViewProps> = ({
  columns,
  dataSource,
  columnWidthData = {},
  onColumnResize,
}) => {
  const [tableColumns, setTableColumns] = useState(columns);

  useEffect(() => {
    if (columnWidthData) {
      const updatedColumns = columns.map((col) => ({
        ...col,
        width: columnWidthData[col.key] || col.width,
      }));
      setTableColumns(updatedColumns);
    }
  }, [columnWidthData, columns]);

  const handleResizeStop =
    (index: number) =>
    (e: any, { size }: any) => {
      const newColumns = [...tableColumns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setTableColumns(newColumns);

      const updatedWidthData: ColumnWidthData = newColumns.reduce(
        (acc, col) => {
          if (col.width) {
            acc[col.key] = col.width;
          }
          return acc;
        },
        {} as ColumnWidthData
      );

      if (onColumnResize) {
        onColumnResize(updatedWidthData);
      }
    };

  const mergedColumns = tableColumns.map((col, index) => ({
    ...col,
    onHeaderCell: (column: any) => ({
      width: column.width,
      onResize: (e: any, { size }: any) => {
        const newColumns = [...tableColumns];
        newColumns[index] = {
          ...newColumns[index],
          width: size.width,
        };
        setTableColumns(newColumns);
      },
      onResizeStop: handleResizeStop(index),
    }),
  }));

  return (
    <Table
      bordered
      columns={mergedColumns}
      dataSource={dataSource}
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
    />
  );
};
