/**
 * Dashboard controller
 */

const Task = require('../models/Task');
const Employee = require('../models/Employee');

/**
 * Get dashboard statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStats = async (req, res) => {
  try {
    // Get real data from MongoDB
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const pendingTasks = await Task.countDocuments({ status: 'pending' });
    const inProgressTasks = await Task.countDocuments({ status: 'in-progress' });
    
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'active' });

    // Calculate metrics
    const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const revenue = totalEmployees * 4500; // Mock revenue calculation
    const systemHealth = 95 + Math.floor(Math.random() * 5); // Mock system health

    res.json({
      totalUsers: totalEmployees,
      activeProjects: inProgressTasks,
      revenue: revenue,
      systemHealth: systemHealth,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      activeEmployees,
      taskCompletionRate
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStats
};
