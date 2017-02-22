import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List';
import TaskItemName from './task-name';
import {
  updateTask,
  deleteTask,
  setTaskIsEditable

} from '../actions';

class TaskItem extends React.Component {
  render() {
    const {
      taskItem,
      deleteTask,
      setIsEditable,
      edit,
    } = this.props;

    // function prepareObjCompletedToggle(taskItem) {
    //   taskItem.isEditable = false;
    //   taskItem.isCompleted = !taskItem.isCompleted;
    //   return taskItem;
    // }

    // function prepareObjEditableSet(taskItem) {
    //   taskItem.isEditable = true;
    //   return taskItem;
    // }

    return (
      <div className="TaskItem">
        <ListItem>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <Checkbox
                onCheck={() => edit(taskItem.id, taskItem)}
                checked={taskItem.isCompleted}
              />
            </div>
            <div onClick={() => { setIsEditable(taskItem.id, taskItem) }} style={{flexGrow: 2, flexBasis: '100%'}}>
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
    edit (taskId, taskObj) {
      taskObj.isCompleted = !taskObj.isCompleted;
      const action = updateTask(taskId, taskObj);
      dispatch(action);
    },
    setIsEditable (taskId, taskObj) {
      const action = setTaskIsEditable(taskId, taskObj);
      dispatch(action);
    },
    deleteTask (taskId) {
      const action = deleteTask(taskId);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
