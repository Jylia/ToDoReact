import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {
  filterTasks
} from '../../actions';

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
        {
          this.props.filtersList.map((filterItem) =>
            <RaisedButton
              label={filterItem}
              key={filterItem}
              disabled={this.props.visibilityFilter === filterItem}
              style={style}
              onTouchTap={() => filterTodos(filterItem)}
            />
          )
        }
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
