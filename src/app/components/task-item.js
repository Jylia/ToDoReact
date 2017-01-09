import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

class TaskItem extends React.Component {
  openInput( name ) {
    console.log('Input shoud be shown here');
  }

  render() {
    const {
      task: taskItem,
      toggleCompleted,
      updateTaskName,
      deleteTask,
    } = this.props;

		return (
      <div className="TaskItem" style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Checkbox onCheck={() => toggleCompleted(taskItem.id)} checked={taskItem.isCompleted} style={{width: 'auto'}} />
        <div>
          <span onClick={() => this.openInput(taskItem.name)}>{taskItem.name}</span>
          <input type="text" onChange={(e) => updateTaskName(e, taskItem.id)} />
          <FlatButton label="Delete Task" secondary={true} onTouchTap={() => deleteTask(taskItem.id)} />
        </div>
      </div>
		);
	}
}

export default TaskItem;
