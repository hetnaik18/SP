import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    status: 'pending', 
    assignedTo: '', 
    priority: 'medium' 
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', status: 'pending', assignedTo: '', priority: 'medium' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-400 border border-green-500/30';
    }
  };

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  if (loading) {
    return <div className="p-6 text-white">Loading tasks...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Tasks</h2>
          <p className="text-gray-400 mt-1">Manage and track your tasks</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-white font-medium shadow-lg"
        >
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-2xl font-bold text-white">{taskStats.total}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{taskStats.pending}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">In Progress</p>
          <p className="text-2xl font-bold text-blue-400">{taskStats.inProgress}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-400">{taskStats.completed}</p>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddTask} className="mb-6 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Add New Task</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Title</label>
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Assigned To</label>
              <input
                type="text"
                placeholder="Assigned To"
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Status</label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-400 text-sm mb-1">Description</label>
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <button type="submit" className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-white font-medium">
            Add Task
          </button>
        </form>
      )}

      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left text-gray-300 font-semibold">Title</th>
              <th className="p-4 text-left text-gray-300 font-semibold">Description</th>
              <th className="p-4 text-left text-gray-300 font-semibold">Status</th>
              <th className="p-4 text-left text-gray-300 font-semibold">Priority</th>
              <th className="p-4 text-left text-gray-300 font-semibold">Assigned To</th>
              <th className="p-4 text-left text-gray-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                <td className="p-4 text-white font-medium">{task.title}</td>
                <td className="p-4 text-gray-400">{task.description || '-'}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="p-4 text-gray-300">{task.assignedTo || '-'}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/40 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <div className="p-8 text-center text-gray-400">No tasks found. Add your first task above.</div>
        )}
      </div>
    </div>
  );
};

export default Tasks;

