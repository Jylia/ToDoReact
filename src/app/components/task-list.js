import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
// import Firebase from 'firebase';
import TaskItem from './task-item';

class TaskList extends React.Component {
  updateTaskNameById( id, name ) {
    this.db.update({
      [`tasks/${id}/name`]: name,
      [`tasks/${id}/isEditable`]: false,
    });
  }

  markAll() {
    // const newAllCompletedState = !this.state.markAllCheckbox;

    // const updates = {
    //   markAllCheckbox: newAllCompletedState
    // };
    // Object.entries(this.state.tasks).forEach(([key, task]) => {
    //   updates[`tasks/${key}/isCompleted`] = newAllCompletedState;
    // });

    // return this.db.update(updates);
  }

  toggleCompleted(key) {
    // this.db.update({
    //   [`tasks/${key}/isCompleted`]: !this.state.tasks[key].isCompleted
    // });
  }

  deleteTask( key ) {
    // this.db.update({
    //   [`tasks/${key}`]: null
    // })
  }

  setAsEditable( id ) {
    // this.db.update({
    //   [`tasks/${id}/isEditable`]: true 
    // });
  }

  render() {
    return (
      <div>
        <div className="TaskList">
          <h2>Tasks for Today</h2>
          {
            this.props.isLoading ? (
              <div>Loading data...</div>
              ) : (
                <div>
                  <Checkbox
                    label={`Mark All as ${this.props.markAllCheckbox ? 'Uncompleted' : 'Completed'}`}
                    onCheck={() => this.markAll()}
                    checked={this.props.markAllCheckbox}
                  />
                  <div>
                    {
                      Object.entries(this.props.tasks).map(
                        ([key, taskItem]) => 
                          <TaskItem
                            key={key}
                            taskId={taskItem.id}
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    tasks: state.todos,
    markAllCheckbox: false
  }
}

const mapDispatchToProps = () => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
