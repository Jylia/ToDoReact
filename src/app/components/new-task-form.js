import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  createTask
} from '../actions';

export class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  render() {
    const {
      create
    } = this.props;

    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            create(this.state.text);
            this.setState({text: ''})
          }} >
          <TextField
            autoFocus
            hintText="Add new task name"
            value={this.state.text}
            onChange={(e) => this.setState({text: e.target.value})}
          />
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
    create (name) {
      let taskObj = {
        name: name,
        isCompleted: false,
        isEdited: false
      }
      const action = createTask(taskObj);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm);
