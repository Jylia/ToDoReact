import React from 'react';
import { connect } from 'react-redux';
import {Card, CardText} from 'material-ui/Card';
import TaskItem from '../tasks/taskItem';

export class DayView extends React.Component {
  render() {
    return (
      <Card>
        <CardText>
          { Object.entries(this.props.tasks).length ?
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
            :
            <span>No tasks</span>
          }
        </CardText>
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
