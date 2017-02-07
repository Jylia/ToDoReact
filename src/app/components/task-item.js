import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

class TaskItem extends React.Component {
  openInput( name, id ) {

    let nodeId = 'task-name-' + id.toString();
    ReactDOM.render(
      <input type="text"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {this.props.updateTaskName(e, id)}}
        }
        defaultValue={name}
        onBlur={(e) => this.props.updateTaskName(e, id)} />,
      document.getElementById(nodeId));
  }

  render() {
    const {
      task: taskItem,
      toggleCompleted,
      deleteTask,
    } = this.props;

    let taskItemNodeId = "task-name-" + taskItem.id.toString();

		return (
      <div className="TaskItem" style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Checkbox onCheck={() => toggleCompleted(taskItem.id)} checked={taskItem.isCompleted} style={{width: 'auto'}} />
        <div>
          <span onClick={() => this.openInput(taskItem.name, taskItem.id)} id={taskItemNodeId}>{taskItem.name}</span>
          <FlatButton label="Delete Task" secondary={true} onTouchTap={() => deleteTask(taskItem.id)} />
        </div>
      </div>
		);
	}
}

export default TaskItem;
