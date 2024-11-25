export interface Expense {
  id: string;
  date: Date;
  department: Department;
  category: ExpenseCategory;
  item: string;
  amount: number;
  supplier: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export type Department = 
  | 'bakery'
  | 'bar'
  | 'kitchen'
  | 'maintenance'
  | 'front_of_house'
  | 'administration';

export type ExpenseCategory = 
  | 'ingredients'
  | 'equipment'
  | 'utilities'
  | 'labor'
  | 'marketing'
  | 'maintenance'
  | 'supplies'
  | 'beverages'
  | 'cleaning'
  | 'other';

export type PaymentMethod = 
  | 'cash'
  | 'credit'
  | 'debit'
  | 'check'
  | 'transfer';