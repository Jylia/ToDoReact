import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import TaskItem from './task-item';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          id: 1,
          name: 'task1',
          due: new Date(),
          isCompleted: false
        },
        {
          id: 2,
          name: 'task2',
          due: new Date(),
          isCompleted: false
        },
        {
          id: 3,
          name: 'task3',
          due: new Date(),
          isCompleted: true
        },
        {
          id: 4,
          name: 'task4',
          due: new Date(),
          isCompleted: false
        },
        {
          id: 5,
          name: 'task5',
          due: new Date(),
          isCompleted: false
        }
      ]
    };
  }

  toggleCompleted(id) {
    this.setState({
      tasks: this.state.tasks.map(item => {
        if (item.id !== id) {
          return item;
        }
        return Object.assign({}, item, {isCompleted: !item.isCompleted});
      })
    });
  }

  render() {
    return (
      <div>
        <div className="TaskList">
          <h2>Tasks for Today</h2>
  	      <Checkbox label="Mark All as Done" />
        </div>
        <div>
          {this.state.tasks.map(taskItem => 
            <TaskItem
              key={taskItem.id}
              task={taskItem}
              toggleCompleted={id => this.toggleCompleted(id)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default TaskList;
