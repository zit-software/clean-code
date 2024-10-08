import {Router} from 'express';
import taskController from '../controllers/task.controller.js';

const taskRouter = Router();

taskRouter
  .route('/')
  .get(taskController.getTasks.bind(taskController))
  .post(taskController.postTask.bind(taskController));

taskRouter
  .route('/:id')
  .patch(taskController.patchTask.bind(taskController))
  .delete(taskController.deleteTask.bind(taskController));

export default taskRouter;
