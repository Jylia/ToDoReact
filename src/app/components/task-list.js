import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { List } from 'material-ui/List';
import TaskItem from './task-item';
import Filter from './filter';
import NewTaskForm from './new-task-form';
import {
  markAllTasksAsDone,
  fetchTodos
} from '../actions';

import './styles.css';

export class TaskList extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

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
                  <Filter
                    visibilityFilter={this.props.visibilityFilter}
                  />
                  <Checkbox
                      label={`Mark All as ${this.props.isAllMarkedAsDone ? 'Uncompleted' : 'Completed'}`}
                      onCheck={() => markAllAsDone(this.props.isAllMarkedAsDone)}
                      checked={!!Object.keys(this.props.tasks).length &&  this.props.isAllMarkedAsDone}
                      disabled={!Object.keys(this.props.tasks).length}
                  />
                  <div>
                    <NewTaskForm />
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
  const visibilityFilter = state.filter;
  return {
    tasks: Object.entries(state.todos.tasks).reduce((acc, [key, taskItem]) => {
      switch (visibilityFilter) {
        case 'ALL':
          acc[key] = taskItem;
          break;
        case 'COMPLETED': 
          if (taskItem.isCompleted) {
            acc[key] = taskItem;
          }
          break;
        case 'UNCOMPLETED':
          if (!taskItem.isCompleted) {
            acc[key] = taskItem;
          }
          break;
        default:
          break;
      }
      return acc;
    }, {}),
    isLoading: state.todos.loading.isLoading,
    isAllMarkedAsDone: Object.entries(state.todos.tasks).map(([key, taskItem]) => {
      return taskItem.isCompleted;
    }).every(isCompleted => isCompleted)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markAllAsDone (isAllMarkedAsDone) {
      const action = markAllTasksAsDone(isAllMarkedAsDone);
      dispatch(action);
    },
    fetchData () {
      dispatch(fetchTodos());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
