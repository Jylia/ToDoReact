import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {
  createTask
} from '../actions';

class NewTaskForm extends React.Component {
  render() {
    const {
      create
    } = this.props;

    return (
      <div>
        <input type="text"
          autoFocus
          ref={ node => {this.input = node;}}
        />
        <FlatButton 
          label="Add New Task" secondary={false}
          onTouchTap={() => {
            create(this.input.value);
            this.input.value = '';
          }}
        />
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
      const action = createTask(name);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm);
