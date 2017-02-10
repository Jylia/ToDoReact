import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import TaskItemName from './task-name';
import { markTaskAsDone } from '../actions';

class TaskItem extends React.Component {
  render() {
    const {
      task: taskItem,
      toggleCompleted,
      deleteTask,
    } = this.props;

    let taskItemNodeId = "task-name-" + taskItem.id.toString();

    return (
      <div className="TaskItem" style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Checkbox 
          onCheck={() => toggleCompleted(taskItem.id)}
          checked={taskItem.isCompleted}
          style={{width: 'auto'}} />
        <div>
          <span id={taskItemNodeId} onClick={() => { this.props.setAsEditable(taskItem.id) }}>
            <TaskItemName
              task={taskItem}
              updateTaskNameById={this.props.updateTaskNameById}
            /></span>
          <FlatButton 
            label="Delete Task" secondary={true}
            onTouchTap={() => deleteTask(taskItem.id)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    task: state.todos[props.taskId],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCompleted (taskId) {
      const action = markTaskAsDone(taskId);
      console.log(action);
      dispatch(action);
    },
    deleteTask () {} 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
