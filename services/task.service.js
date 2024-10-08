import Task from '../models/task.js';

class TaskService {
  /**
   * Get all tasks by user ID
   * @param {number} userId - The user ID
   */
  async getAllByUserId(userId) {
    const tasks = await Task.findAll({
      where: {userId},
      raw: true,
      order: [
        ['isCompleted', 'ASC'],
        ['updatedAt', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });
    return tasks.map(task => ({
      ...task,
      isCompleted: Boolean(task.isCompleted),
    }));
  }

  /**
   * Create a new task
   * @param {object} taskObject - The task object
   * @param {string} taskObject.title - The task title
   * @param {boolean} taskObject.isCompleted - The task completion status
   */
  async create(taskObject) {
    return await Task.create(taskObject, {raw: true});
  }

  /**
   * Ensure that a task belongs to a user
   * @param {number} taskId - The task ID
   * @param {number} userId - The user ID
   * @throws {Error} - If the task does not belong to the user
   * @throws {Error} - If the task is not found
   */
  async ensureTaskBelongsToUser(taskId, userId) {
    const task = await Task.findByPk(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    if (task.userId !== userId) {
      throw new Error('Task does not belong to the user');
    }
  }

  /**
   * Update a task by ID
   * @param {number} id - The task ID
   * @param {object} task - The task object
   * @param {boolean} task.isCompleted - The task completion
   */
  async updateById(id, task) {
    await Task.update(task, {
      where: {id},
    });
  }

  /**
   * Delete a task by ID
   * @param {number} id - The task ID
   */
  async deleteById(id) {
    return await Task.destroy({where: {id}});
  }
}

export default new TaskService();
