import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { ContentType, Platform, Task } from '../types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'reel' as ContentType,
    platform: 'instagram' as Platform,
    estimatedTime: 0,
    actualTime: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      submissionDate: new Date(),
    });
    setFormData({
      title: '',
      description: '',
      contentType: 'reel',
      platform: 'instagram',
      estimatedTime: 0,
      actualTime: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Content Type</label>
          <select
            value={formData.contentType}
            onChange={(e) => setFormData({ ...formData, contentType: e.target.value as ContentType })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="reel">Reel</option>
            <option value="story">Story</option>
            <option value="video">Long Video</option>
            <option value="photo">Photo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Time (hours)</label>
            <input
              type="number"
              value={formData.estimatedTime}
              onChange={(e) => setFormData({ ...formData, estimatedTime: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Actual Time (hours)</label>
            <input
              type="number"
              value={formData.actualTime}
              onChange={(e) => setFormData({ ...formData, actualTime: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
              step="0.5"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>
    </form>
  );
}