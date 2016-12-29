import React from 'react';
import Checkbox from 'material-ui/Checkbox';

class TaskItem extends React.Component {
	render () {
    const {
      task: taskItem,
      toggleCompleted,
    } = this.props;

		return (
      <div className="TaskItem" style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Checkbox onCheck={() => toggleCompleted(taskItem.id)} checked={taskItem.isCompleted} style={{width: 'auto'}} />
        <div>
          {taskItem.name}
        </div>
      </div>
		);
	}
}

export default TaskItem;
