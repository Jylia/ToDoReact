import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { List } from 'material-ui/List';
// import Firebase from 'firebase';
import TaskItem from './task-item';
import NewTaskForm from './new-task-form';
import {
  markAllTasksAsDone
} from '../actions';

import './styles.css';


class TaskList extends React.Component {
  render() {
    const {
      markAllAsDone
    } = this.props;

    return (
      <div>
        <div className="TaskList">
          {
            this.props.isLoading ? (
              <div>Loading data...</div>
              ) : (
                <div className="container">
                  <Checkbox
                      label={`Mark All as ${this.props.isAllMarkedAsDone ? 'Uncompleted' : 'Completed'}`}
                      onCheck={() => markAllAsDone(!this.props.isAllMarkedAsDone)}
                      checked={this.props.isAllMarkedAsDone}
                  />
                  <div>
                  <div>
                    <NewTaskForm />
                  </div>
                  <List>
                    <h3>Tasks for Today</h3>
                    {
                      Object.entries(this.props.tasks).map(
                        ([key, taskItem]) =>
                        <TaskItem
                          key={key}
                          taskItem={taskItem}
                          taskId={taskItem.id}
                          toggleCompleted={id => this.toggleCompleted(key)}
                          updateTaskName={e => this.updateTaskName(e, key)}
                          deleteTask={id => this.deleteTask(key)}
                          setAsEditable={id => this.setAsEditable(id)}
                          updateTaskNameById={(id, name) => this.updateTaskNameById(id, name)}
                        />
                      )
                    }
                  </List>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.todos.tasks,
    isAllMarkedAsDone: state.todos.isAllMarkedAsDone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markAllAsDone (isAllMarkedAsDone) {
      const action = markAllTasksAsDone(isAllMarkedAsDone);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
