import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List';
import TaskItemName from './task-name';
import {
  updateTask,
  deleteTask

} from '../actions';

class TaskItem extends React.Component {
  render() {
    const {
      taskItem,
      deleteTask,
      edit
    } = this.props;

    function prepareObjCompletedToggle(taskItem) {
      taskItem.isEditable = false;
      taskItem.isCompleted = !taskItem.isCompleted;
      return taskItem;
    }

    return (
      <div className="TaskItem">
        <ListItem>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <Checkbox
                onCheck={() => edit(taskItem.id, prepareObjCompletedToggle(taskItem))}
                checked={taskItem.isCompleted}
              />
            </div>
            <div onTouchTap={() => { edit(taskItem.id, taskItem, { shoudBeEditable: true}) }} style={{flexGrow: 2, flexBasis: '100%'}}>
              <TaskItemName
                taskItem={taskItem}
                updateTaskNameById={this.props.updateTaskNameById}
              />
            </div>
            <div style={{whiteSpace: 'nowrap'}}>
              <RaisedButton 
                label="Delete Task" secondary={true}
                onTouchTap={() => deleteTask(taskItem.id)}
              />
            </div>
          </div>
        </ListItem>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    task: state.todos.tasks[props.taskId],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    edit (taskId, taskObj, options) {
      const action = updateTask(taskId, taskObj, options);
      dispatch(action);
    },
    deleteTask (taskId) {
      const action = deleteTask(taskId);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
