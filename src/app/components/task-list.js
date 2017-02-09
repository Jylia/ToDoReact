import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import { database } from 'firebase';

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

class TaskItem extends React.Component {
  render() {
    const {
      task: taskItem,
      toggleCompleted,
      deleteTask,
    } = this.props;

    let taskItemNodeId = "task-name-" + taskItem.id.toString();

    return (
      <div className="TaskItem" style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Checkbox 
          onCheck={() => toggleCompleted(taskItem.id)}
          checked={taskItem.isCompleted}
          style={{width: 'auto'}} />
        <div>
          <span id={taskItemNodeId} onClick={() => { this.props.setAsEditable(taskItem.id) }}>
            <TaskItemName
              task={taskItem}
              updateTaskNameById={this.props.updateTaskNameById}
            /></span>
          <FlatButton 
            label="Delete Task" secondary={true}
            onTouchTap={() => deleteTask(taskItem.id)} />
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

  updateTaskNameById( id, name ) {
    this.db.update({
      [`tasks/${id}/name`]: name,
      [`tasks/${id}/isEditable`]: false,
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

  setAsEditable( id ) {
    this.db.update({
      [`tasks/${id}/isEditable`]: true 
    });
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
                            setAsEditable={id => this.setAsEditable(id)}
                            updateTaskNameById={(id, name) => this.updateTaskNameById(id, name)}
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
