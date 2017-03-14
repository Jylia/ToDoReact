import React from 'react';
import { connect } from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TaskItem from '../../tasks/taskItem';
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
  render() {
    return (
      <Card>
        {
          getTasksForCurrentDate(this.props.day.date, Object.entries(this.props.tasks)).length ? 
            <div>
              <CardHeader
                title={`${this.props.day.title} ${toDateString(this.props.day.date)}`}
                subtitle={`${getTasksForCurrentDate(this.props.day.date, Object.entries(this.props.tasks)).length} tasks`}
                avatar={this.props.day.img}
              />
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
            </div>
          :
            <div>
              <CardHeader
                title={`${this.props.day.title} ${toDateString(this.props.day.date)}`}
                subtitle={`${nonDateTasks(this.props.day.date, Object.entries(this.props.tasks)).length} tasks`}
                avatar={this.props.day.img}
              />
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
            </div>
        }
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DayView);
