import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';
import { format, isWithinInterval, parse } from 'date-fns';
import * as XLSX from 'xlsx';
import type { Expense } from '../types';

interface ExportDataProps {
  expenses: Expense[];
}

export default function ExportData({ expenses }: ExportDataProps) {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleExport = () => {
    const start = parse(startDate, 'yyyy-MM-dd', new Date());
    const end = parse(endDate, 'yyyy-MM-dd', new Date());
    end.setHours(23, 59, 59); // Include the entire end date

    const filteredExpenses = expenses.filter(expense =>
      isWithinInterval(expense.date, { start, end })
    );

    const exportData = filteredExpenses.map(expense => ({
      Date: format(expense.date, 'MM/dd/yyyy'),
      Department: expense.department.replace('_', ' '),
      Category: expense.category,
      Item: expense.item,
      Amount: expense.amount,
      Supplier: expense.supplier,
      'Payment Method': expense.paymentMethod,
      Notes: expense.notes || ''
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');

    // Generate filename with date range
    const fileName = `expenses_${format(start, 'yyyyMMdd')}_to_${format(end, 'yyyyMMdd')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Export Expenses</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleExport}
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Download className="w-5 h-5 mr-2" />
          Export to Excel
        </button>
      </div>
    </div>
  );
}