import {DataTypes} from 'sequelize';
import {sequelize} from '../configs/db.js';
import User from './user.js';

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Task.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

export default Task;
