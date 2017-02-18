import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { List } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
// import Firebase from 'firebase';
import TaskItem from './task-item';
import NewTaskForm from './new-task-form';
import {
  markAllTasksAsDone,
  filterTasks
} from '../actions';

import './styles.css';


class TaskList extends React.Component {
  render() {
    const {
      markAllAsDone,
      filterTodos
    } = this.props;

    const style = {
      margin: 12,
    };

    return (
      <div>
        <div className="TaskList">
          {
            this.props.isLoading ? (
              <div>Loading data...</div>
              ) : (
                <div className="container">
                  <div>
                    <RaisedButton
                      label="All"
                      disabled={this.props.visibilityFilter === 'ALL'}
                      style={style}
                      onTouchTap={() => filterTodos('ALL')}
                    />
                    <RaisedButton
                      label="Completed"
                      disabled={this.props.visibilityFilter === 'COMPLETED'}
                      style={style}
                      onTouchTap={() => filterTodos('COMPLETED')}
                    />
                    <RaisedButton
                      label="Uncompleted"
                      disabled={this.props.visibilityFilter === 'UNCOMPLETED'}
                      style={style}
                      onTouchTap={() => filterTodos('UNCOMPLETED')}
                    />
                  </div>
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
  const visibilityFilter = state.filterReducer;
  return {
    tasks: Object.entries(state.todoReducer.tasks).reduce((acc, [key, taskItem]) => {
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
    isAllMarkedAsDone: state.todoReducer.isAllMarkedAsDone,
    visibilityFilter: visibilityFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markAllAsDone (isAllMarkedAsDone) {
      const action = markAllTasksAsDone(isAllMarkedAsDone);
      dispatch(action);
    },
    filterTodos (filterType) {
      const action = filterTasks(filterType);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
