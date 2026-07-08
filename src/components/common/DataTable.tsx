import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, value: any) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  rowKey?: (item: T, index: number) => string | number;
  onRowClick?: (item: T) => void;
  rowClassName?: string;
  containerClassName?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  isEmpty = false,
  emptyMessage = 'No data available',
  rowKey = (_, index) => index,
  onRowClick,
  rowClassName,
  containerClassName,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className={cn('w-full border rounded-lg', containerClassName)}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)} className={col.className}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (isEmpty || data.length === 0) {
    return (
      <div className={cn('w-full border rounded-lg p-8', containerClassName)}>
        <div className="text-center text-muted-foreground">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={cn('w-full border rounded-lg overflow-hidden', containerClassName)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            {columns.map((col) => (
              <TableHead key={String(col.key)} className={cn('font-semibold', col.className)}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow
              key={rowKey(item, rowIndex)}
              onClick={() => onRowClick?.(item)}
              className={cn(onRowClick && 'cursor-pointer hover:bg-muted/50 transition-colors', rowClassName)}
            >
              {columns.map((col) => {
                const value = item[col.key as keyof T];
                return (
                  <TableCell key={String(col.key)} className={col.className}>
                    {col.render ? col.render(item, value) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
