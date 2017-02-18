import React from 'react';
import { connect } from 'react-redux';
import {
  editTask
} from '../actions';

class TaskItemName extends React.Component {
  render() {
    const {
      taskItem,
      edit
    } = this.props;

    if (taskItem.isEditable) {
      return (
        <input type="text"
          autoFocus
          onKeyPress={(e) => {
            if (e.key === 'Enter') {edit(taskItem.id, e.target.value)}}
          }
          defaultValue={taskItem.name}
          onBlur={(e) => {edit(taskItem.id, e.target.value)}}
        />
      );
    }

    return (
      <span>{taskItem.name}</span>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    task: state.todoReducer[props.taskId],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    edit (taskId, name) {
      const action = editTask(taskId, name);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemName);
