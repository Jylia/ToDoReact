import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { cyan300 } from 'material-ui/styles/colors';
import ActionGrade from 'material-ui/svg-icons/action/delete';
import TaskItemName from './task-name';
import {
  updateTask,
  deleteTask

} from '../../actions';

export class TaskItem extends React.Component {
  render() {
    const {
      taskItem,
      deleteTask,
      edit
    } = this.props;

    const styles = {
      chip: {
        margin: 4
      }
    };

    function prepareObjCompletedToggle(taskItem) {
      taskItem.isEditable = false;
      taskItem.isCompleted = !taskItem.isCompleted;
      return taskItem;
    }

    return (
      <div className="TaskItem">
        <ListItem>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <Checkbox
                onCheck={() => edit(taskItem.id, prepareObjCompletedToggle(taskItem))}
                checked={taskItem.isCompleted}
              />
            </div>
            <div
              onTouchTap={() => {edit(taskItem.id, taskItem, { shoudBeEditable: true}) }}
              style={{flex: 1}}
            >
              <TaskItemName
                taskItem={taskItem}
                updateTaskNameById={this.props.updateTaskNameById}
              />
            </div>
            <div style={{paddingRight: '1rem'}}>
              {taskItem.dueDate}
            </div>
            <div style={{paddingRight: '1rem'}}>
              <Chip
                backgroundColor={cyan300}
                style={styles.chip}
              >
                { this.props.priorityText }
              </Chip>
            </div>
            <div style={{whiteSpace: 'nowrap'}}>
              <IconButton
                onTouchTap={() => deleteTask(taskItem.id)}
              >
                <ActionGrade />
              </IconButton>
            </div>
          </div>
        </ListItem>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const getPriorityText = (priority) => {
    switch (priority) {
      case 1:
        return 'Very Important';
      case 2:
        return 'Important';
      case 3:
        return 'Not Important';
      case 4:
        return 'Can be delayed';
      default:
        return 'Can be delayed';
    }
  } 

  return {
    task: state.todos.tasks[props.taskId],
    priorityText: getPriorityText(state.todos.tasks[props.taskId].priority)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    edit (taskId, taskObj, options) {
      const action = updateTask(taskId, taskObj, options);
      dispatch(action);
    },
    deleteTask (taskId) {
      const action = deleteTask(taskId);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
