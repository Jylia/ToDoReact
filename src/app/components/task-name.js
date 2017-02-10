import React from 'react';
import { connect } from 'react-redux';
import {
  setIsNotEditableTask
} from '../actions';

class TaskItemName extends React.Component {
  render() {
    const {
      taskItem,
      setIsNotEditable
    } = this.props;

    if (taskItem.isEditable) {
      return (
        <input type="text"
          autoFocus
          onKeyPress={(e) => {
            if (e.key === 'Enter') {setIsNotEditable(taskItem.id, e.target.value)}}
          }
          defaultValue={taskItem.name}
          onBlur={(e) => {setIsNotEditable(taskItem.id, e.target.value)}}
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
    task: state.todos[props.taskId],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsNotEditable (taskId, name) {
      const action = setIsNotEditableTask(taskId, name);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemName);
