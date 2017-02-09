import React from 'react';
import ReactDOM from 'react-dom';

import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
// import TaskItem from './task-item';
import { database } from 'firebase';

class TaskItemName extends React.Component {
  render() {
    const {
      task: taskItem,
      action,
      db
    } = this.props;

    const updateTaskName = ( e, key ) => {
      db.update({
        [`tasks/${key}/name`]: e.target.value
      });
      this.props.callback();
    };

    switch (action) {
      case 'EDIT_TO_DO':
        return (
            <input type="text"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {updateTaskName(e, taskItem.id);}}
              }
              defaultValue={taskItem.name}
              onBlur={(e) => updateTaskName(e, taskItem.id)}
            />
        );
      default:
        return (
          <span>{taskItem.name}</span>
        );
    }
  }
};

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
      document.getElementById(nodeId)
    );
  }

  render() {
    const {
      task: taskItem,
      toggleCompleted,
      deleteTask,
      db
    } = this.props;

    let taskItemNodeId = "task-name-" + taskItem.id.toString();

    return (
      <div className="TaskItem" style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Checkbox onCheck={() => toggleCompleted(taskItem.id)} checked={taskItem.isCompleted} style={{width: 'auto'}} />
        <div>
          <span id={taskItemNodeId} onClick={() => { this.action = 'EDIT_TO_DO'; this.forceUpdate(); }}>
            <TaskItemName
              task={taskItem}
              action={this.action}
              db={db}
              callback={() => { this.action =''; this.forceUpdate(); }}
            /></span>
          <FlatButton label="Delete Task" secondary={true} onTouchTap={() => deleteTask(taskItem.id)} />
        </div>
      </div>
    );
  }
}

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
                            state={this.state}
                            db={this.db}
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
