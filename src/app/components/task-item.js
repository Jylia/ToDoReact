import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List';
import TaskItemName from './task-name';
import {
  markTaskAsDone,
  deleteTask,
  setIsEditableTask
} from '../actions';

class TaskItem extends React.Component {
  render() {
    const {
      taskItem,
      toggleCompleted,
      deleteTask,
      setIsEditable
    } = this.props;

    return (
      <div className="TaskItem">
        <ListItem>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <Checkbox
                onCheck={() => toggleCompleted(taskItem.id)}
                checked={taskItem.isCompleted}
              />
            </div>
            <div onClick={() => { setIsEditable(taskItem.id) }} style={{flexGrow: 2, flexBasis: '100%'}}>
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
    toggleCompleted (taskId) {
      const action = markTaskAsDone(taskId);
      dispatch(action);
    },
    deleteTask (taskId) {
      const action = deleteTask(taskId);
      dispatch(action);
    },
    setIsEditable (taskId) {
      const action = setIsEditableTask(taskId);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
