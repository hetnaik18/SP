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
const response = await axios.get('/api/tasks');
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
const response = await axios.post('/api/tasks', newTask);
setTasks([...tasks, response.data]);
setNewTask({ title: '', description: '', status: 'pending', assignedTo: '', priority: 'medium' });
setShowForm(false);
} catch (error) {
console.error('Error adding task:', error);
}
};

const handleDeleteTask = async (id) => {
try {
await axios.delete(/api/tasks/${id});
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
return <div className="p-6 text-white">Loading...</div>;
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
className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg text-white font-medium"
>
{showForm ? 'Cancel' : '+ Add Task'}
</button>
</div>

);
};

export default Tasks;
