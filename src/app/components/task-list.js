import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import TaskItem from './task-item';
import { database } from 'firebase';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.db = database().ref();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.db.on('value', (snapshot) => {
      this.setState({
        ...snapshot.val(),
        isLoading: false
      });
    });
  }

  componentWllUnmount() {
    this.db.off();
  }

  markAll() {
    const newAllCompletedState = !this.state.markAllCheckbox;

    const updates = {
      markAllCheckbox: newAllCompletedState
    };
    Object.entries(this.state.tasks).forEach(([key, task]) => {
      updates[`tasks/${key}/isCompleted`] = newAllCompletedState;
    });

    return this.db.update(updates);
  }

  toggleCompleted(key) {
    this.db.update({
      [`tasks/${key}/isCompleted`]: !this.state.tasks[key].isCompleted
    });
  }

  updateTaskName( e, key ) {
    this.db.update({
      [`tasks/${key}/name`]: e.target.value
    });
  }

  deleteTask( key ) {
    this.db.update({
      [`tasks/${key}`]: null
    })
  }

  render() {
    return (
      <div>
        <div className="TaskList">
          <h2>Tasks for Today</h2>
          {
            this.state.isLoading ? (
              <div>Loading data...</div>
              ) : (
                <div>
                  <Checkbox
                    label={`Mark All as ${this.state.markAllCheckbox ? 'Uncompleted' : 'Completed'}`}
                    onCheck={() => this.markAll()}
                    checked={this.state.markAllCheckbox}
                  />
                  <div>
                    {
                      Object.entries(this.state.tasks).map(
                        ([key, taskItem]) => 
                          <TaskItem
                            key={key}
                            task={taskItem}
                            toggleCompleted={id => this.toggleCompleted(key)}
                            updateTaskName={e => this.updateTaskName(e, key)}
                            deleteTask={id => this.deleteTask(key)}
                          />
                      )
                    }
                  </div>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default TaskList;
