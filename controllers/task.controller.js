import taskService from '../services/task.service.js';

class TaskController {
  /**
   * Render the tasks page
   * @type {import('express').RequestHandler}
   */
  async getTasks(req, res, next) {
    try {
      res.render('task/index', {
        tasks: await taskService.getAllByUserId(res.locals.user.id),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handle the task creation request
   * @type {import('express').RequestHandler}
   */
  async postTask(req, res) {
    await taskService.create({
      title: req.body.title,
      isCompleted: false,
      userId: res.locals.user.id,
    });
    res.redirect('/task');
  }

  /**
   * Handle the task update request
   * @type {import('express').RequestHandler}
   */
  async patchTask(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      await taskService.ensureTaskBelongsToUser(id, res.locals.user.id);
      await taskService.updateById(id, {
        isCompleted: Boolean(req.body.isCompleted),
      });
      res.redirect('/task');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handle the task deletion request
   * @type {import('express').RequestHandler}
   */
  async deleteTask(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      await taskService.ensureTaskBelongsToUser(id, res.locals.user.id);
      await taskService.deleteById(id);
      res.redirect('/task');
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
