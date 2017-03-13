import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import { cyan300, cyan50 } from 'material-ui/styles/colors';
import {
  createTask
} from '../../actions';

export class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      priority: 1,
      dueDate: new Date()
    };
  }

  handleChangeDate = (event, date) => {
    this.setState({
      dueDate: date
    });
  };

  render() {
    const {
      create
    } = this.props;

    const styles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    };

    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            create(this.state.text, this.state.priority, this.state.dueDate);
            this.setState({text: ''})
          }} >
          <TextField
            autoFocus
            hintText="Add new task name"
            value={this.state.text}
            onChange={(e) => this.setState({text: e.target.value})}
          />
          <div>
            <DatePicker
              hintText="Due Date"
              onChange={this.handleChangeDate}
            />
          </div>
          <div style={styles.wrapper}>
            <Chip
              onTouchTap={
                () => {
                  this.setState({priority: 1});
                }
              }
              backgroundColor={this.state.priority === 1 ? cyan300 : cyan50}
              style={styles.chip}
            >
              Very Important
            </Chip>

            <Chip
              onTouchTap={
                () => {
                  this.setState({priority: 2});
                }
              }
              backgroundColor={this.state.priority === 2 ? cyan300 : cyan50}
              style={styles.chip}
            >
              Important
            </Chip>

            <Chip
              onTouchTap={
                () => {
                  this.setState({priority: 3});
                }
              }
              backgroundColor={this.state.priority === 3 ? cyan300 : cyan50}
              style={styles.chip}
            >
              Not Important
            </Chip>

            <Chip
              style={styles.chip}
              onTouchTap={
                () => {
                  this.setState({priority: 4});
                }
              }
              backgroundColor={this.state.priority === 4 ? cyan300 : cyan50}
            >
              Can be delayed
            </Chip>
          </div>
          <div>
            <RaisedButton
              label="Add New Task" primary={true}
              type="submit"
            />
          </div>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    create (name, priority, dueDate) {
      let taskObj = {
        name: name,
        isCompleted: false,
        priority: priority,
        dueDate: dueDate,
        isEdited: false
      }
      const action = createTask(taskObj);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm);
