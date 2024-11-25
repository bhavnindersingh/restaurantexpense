import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { DollarSign, Filter } from 'lucide-react';
import type { Department, Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: ExpenseListProps) {
  const [departmentFilter, setDepartmentFilter] = useState<Department | 'all'>('all');

  const filteredExpenses = useMemo(() => {
    if (departmentFilter === 'all') return expenses;
    return expenses.filter(expense => expense.department === departmentFilter);
  }, [expenses, departmentFilter]);

  const departmentTotals = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      acc[expense.department] = (acc[expense.department] || 0) + expense.amount;
      return acc;
    }, {} as Record<Department, number>);
  }, [expenses]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Recent Expenses</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value as Department | 'all')}
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Departments</option>
            <option value="bakery">Bakery</option>
            <option value="bar">Bar</option>
            <option value="kitchen">Kitchen</option>
            <option value="maintenance">Maintenance</option>
            <option value="front_of_house">Front of House</option>
            <option value="administration">Administration</option>
          </select>
        </div>
      </div>

      {/* Department Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {Object.entries(departmentTotals).map(([dept, total]) => (
          <div 
            key={dept}
            className="bg-gray-50 p-3 rounded-lg"
          >
            <div className="text-sm font-medium text-gray-500 capitalize">
              {dept.replace('_', ' ')}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              ${total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(expense.date, 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {expense.department.replace('_', ' ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {expense.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.item}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {expense.paymentMethod}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}