import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import Filter from '../common/filter';
import DaysList from '../calendar/week/daysList';
import NewTaskForm from './new-task-form';
import {
  markAllTasksAsDone,
  fetchTodos
} from '../../actions';

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
                    filtersList={this.props.filtersList}
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
                  </div>
                </div>
              )
          }
        </div>
        <DaysList 
          tasks={this.props.tasks}
        />
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
    }).every(isCompleted => isCompleted),
      filtersList: ['ALL', 'COMPLETED', 'UNCOMPLETED']
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
