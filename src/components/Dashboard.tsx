import React, { useState } from 'react';
import { BarChart3, DollarSign, ShoppingBag, Wallet } from 'lucide-react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExportData from './ExportData';
import type { Expense } from '../types';

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleExpenseSubmit = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID()
    };
    setExpenses([newExpense, ...expenses]);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = expenses.filter(
    expense => expense.date.getMonth() === new Date().getMonth()
  ).reduce((sum, expense) => sum + expense.amount, 0);

  const departmentCount = new Set(expenses.map(e => e.department)).size;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Restaurant Expense Tracker</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                      <dd className="text-lg font-medium text-gray-900">${totalExpenses.toFixed(2)}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Wallet className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Monthly Expenses</dt>
                      <dd className="text-lg font-medium text-gray-900">${monthlyExpenses.toFixed(2)}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShoppingBag className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Departments</dt>
                      <dd className="text-lg font-medium text-gray-900">{departmentCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg. Transaction</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ${expenses.length ? (totalExpenses / expenses.length).toFixed(2) : '0.00'}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Section */}
          <ExportData expenses={expenses} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Expense Form Section */}
            <div className="lg:col-span-1">
              <ExpenseForm onSubmit={handleExpenseSubmit} />
            </div>

            {/* Expense List Section */}
            <div className="lg:col-span-2">
              <ExpenseList expenses={expenses} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}