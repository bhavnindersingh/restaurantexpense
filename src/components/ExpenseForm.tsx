import React, { useState } from 'react';
import { PlusCircle, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import type { Expense, ExpenseCategory, Department, PaymentMethod } from '../types';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const departmentCategories: Record<Department, ExpenseCategory[]> = {
  bakery: ['ingredients', 'equipment', 'supplies', 'labor', 'maintenance', 'cleaning', 'other'],
  bar: ['beverages', 'equipment', 'supplies', 'labor', 'maintenance', 'cleaning', 'other'],
  kitchen: ['ingredients', 'equipment', 'supplies', 'labor', 'maintenance', 'cleaning', 'other'],
  maintenance: ['equipment', 'supplies', 'utilities', 'maintenance', 'cleaning', 'other'],
  front_of_house: ['supplies', 'equipment', 'labor', 'cleaning', 'other'],
  administration: ['marketing', 'utilities', 'supplies', 'other']
};

export default function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    department: 'kitchen' as Department,
    category: 'ingredients' as ExpenseCategory,
    item: '',
    amount: '',
    supplier: '',
    paymentMethod: 'cash' as PaymentMethod,
    notes: ''
  });

  const handleDepartmentChange = (department: Department) => {
    setFormData(prev => ({
      ...prev,
      department,
      category: departmentCategories[department][0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date(formData.date),
      amount: Number(formData.amount)
    });
    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      department: 'kitchen',
      category: 'ingredients',
      item: '',
      amount: '',
      supplier: '',
      paymentMethod: 'cash',
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Receipt className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">New Expense</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select
            value={formData.department}
            onChange={(e) => handleDepartmentChange(e.target.value as Department)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="bakery">Bakery</option>
            <option value="bar">Bar</option>
            <option value="kitchen">Kitchen</option>
            <option value="maintenance">Maintenance</option>
            <option value="front_of_house">Front of House</option>
            <option value="administration">Administration</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            {departmentCategories[formData.department].map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Item/Description</label>
          <input
            type="text"
            value={formData.item}
            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            placeholder="e.g., Fresh vegetables"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          <input
            type="text"
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            placeholder="Supplier name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="check">Check</option>
            <option value="transfer">Bank Transfer</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Additional notes or details"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Expense
        </button>
      </div>
    </form>
  );
}