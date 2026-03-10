import React, { useState, useEffect } from 'react';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEmployees([
        { _id: '1', name: 'John Doe', email: 'john@example.com', position: 'Software Engineer', department: 'Engineering', phone: '555-0101', status: 'active' },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com', position: 'Project Manager', department: 'Management', phone: '555-0102', status: 'active' },
        { _id: '3', name: 'Mike Johnson', email: 'mike@example.com', position: 'Designer', department: 'Design', phone: '555-0103', status: 'active' },
        { _id: '4', name: 'Sarah Williams', email: 'sarah@example.com', position: 'Data Analyst', department: 'Analytics', phone: '555-0104', status: 'inactive' },
        { _id: '5', name: 'Tom Brown', email: 'tom@example.com', position: 'DevOps Engineer', department: 'Engineering', phone: '555-0105', status: 'active' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Employees</h2>
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-t border-gray-700">
                <td className="p-4 text-white">{emp.name}</td>
                <td className="p-4 text-gray-300">{emp.email}</td>
                <td className="p-4 text-gray-300">{emp.position}</td>
                <td className="p-4 text-gray-300">{emp.department}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${emp.status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;

