import React from 'react';

class TaskItemName extends React.Component {
  render() {
    const {
      task: taskItem
    } = this.props;

    if (taskItem.isEditable) {
      return (
        <input type="text"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {this.props.updateTaskNameById(this.props.task.id, e.target.value)}}
          }
          defaultValue={taskItem.name}
          onBlur={(e) => this.props.updateTaskNameById(this.props.task.id, e.target.value)}
        />
      );
    }

    return (
      <span>{taskItem.name}</span>
    );
  }
};

export default TaskItemName;
