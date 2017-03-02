import React from 'react';
import { connect } from 'react-redux';
import {
  updateTask
} from '../../actions';

export class TaskItemName extends React.Component {
  state = {
    isSaving: false
  }

  saveTask(value) {
    this.setState({isSaving: true}, () => {
      this.props.taskItem.name = value;
      this.props.edit(this.props.taskItem.id, this.props.taskItem);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.taskItem.isEditable) {
      this.setState({isSaving: false});
    }
  }

  render() {
    const {
      taskItem,
    } = this.props;

    if (taskItem.isEditable) {
      if (this.state.isSaving) {
        return (<span>Loading...</span>);
      }
      return (
        <input type="text"
          autoFocus
          onKeyPress={(e) => {
            if (e.key === 'Enter') {this.saveTask(e.target.value)}}
          }
          defaultValue={taskItem.name}
          onBlur={(e) => {this.saveTask(e.target.value)}}
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
    edit (taskId, taskObj) {
      taskObj.isEditable = false;
      const action = updateTask(taskId, taskObj);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemName);
