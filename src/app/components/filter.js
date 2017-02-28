import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {
  filterTasks
} from '../actions';

import './styles.css';

export class Filter extends React.Component {
  render() {
    const {
      filterTodos
    } = this.props;

    const style = {
      margin: 24,
    };

    return (
      <div className="filters">
        <RaisedButton
          label="All"
          disabled={this.props.visibilityFilter === 'ALL'}
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
          onTouchTap={() => filterTodos('UNCOMPLETED')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    visibilityFilter: state.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterTodos (filterType) {
      const action = filterTasks(filterType);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
