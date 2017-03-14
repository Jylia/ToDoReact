import React from 'react';
import { connect } from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TaskItem from '../../tasks/taskItem';
import {
  markAllTasksAsDone,
  fetchTodos
} from '../../../actions';
import {toDateString, isDatesEqual, isOverdueDate} from '../../../helpers/dateHelper';

const getTasksForCurrentDate = (date, tasks) => {
  return tasks.filter(
    (task) => {
      let currentTask = task[1];
      return currentTask && currentTask.dueDate && isDatesEqual(new Date(currentTask.dueDate), date);
    }
  )
}

const nonDateTasks = (date, tasks) => {
  return tasks.filter(
    (task) => {
      let currentTask = task[1];
      return currentTask &&
            (!currentTask.dueDate ||
              isDatesEqual(new Date(currentTask.dueDate), date) ||
              isOverdueDate(new Date(currentTask.dueDate), date)) &&
              !currentTask.isCompleted;
    }
  )
}

export class DayView extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={`${this.props.day.title} ${toDateString(this.props.day.date)}`}
          subtitle={`${Object.entries(this.props.tasks).length} tasks`}
          avatar={this.props.day.img}
        />
        {
          getTasksForCurrentDate(this.props.day.date, Object.entries(this.props.tasks)).length ? 
            <CardText>
              {
                getTasksForCurrentDate(this.props.day.date, Object.entries(this.props.tasks)).map( 
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
            </CardText>
          :
            <CardText>
              {
                this.props.day.isToday && nonDateTasks(this.props.day.date, Object.entries(this.props.tasks)).length ?
                  nonDateTasks(this.props.day.date, Object.entries(this.props.tasks)).map(
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
                :
                  <span>No tasks for this day</span>
              }
            </CardText>
        }
      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(DayView);
