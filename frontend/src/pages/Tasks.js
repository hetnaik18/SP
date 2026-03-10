import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });
const [loading, setLoading] = useState(true);

useEffect(() => {
axios.get('/api/tasks')
.then(res => { setTasks(res.data); setLoading(res.data ? false : false); })
.catch(err => console.log(err))
.finally(() => setLoading(false));
}, []);

const handleAddTask = async (e) => {
e.preventDefault();
try {
const res = await axios.post('/api/tasks', newTask);
setTasks([...tasks, res.data]);
setNewTask({ title: '', description: '', status: 'pending' });
} catch (err) { console.log(err); }
};

if (loading) return <div style={{color: 'white'}}>Loading...</div>;

return (
<div style={{padding: '20px', color: 'white'}}>
<h2>Tasks</h2>
<form onSubmit={handleAddTask} style={{marginBottom: '20px'}}>
<input
placeholder="Title"
value={newTask.title}
onChange={e => setNewTask({...newTask, title: e.target.value})}
style={{marginRight: '10px', padding: '5px'}}
/>
<button type="submit">Add Task</button>
</form>
<table>
<thead>
<tr><th>Title</th><th>Status</th></tr>
</thead>
<tbody>
{tasks.map(t => (
<tr key={t._id}><td>{t.title}</td><td>{t.status}</td></tr>
))}
</tbody>
</table>
</div>
);
};

export default Tasks;
