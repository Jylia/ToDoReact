import React from 'react';
import { connect } from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import DayView from './dayView';
import {
} from '../../../actions';
import {currentWeek} from '../../../helpers/dateHelper';

export class DaysList extends React.Component {
  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        height: '100%'
      },
      gridList: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      },
      titleStyle: {
        height: '100%',
      }
    };

    return (
      <div>
        <GridList
          cols={2}
          cellHeight='auto'
          padding={1}
          style={styles.gridList}
        >
          {currentWeek().map((day) => (
            <GridTile
              key={day.title}
              actionPosition="left"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              cols={1}
              rows={1}
            >
              <DayView
                day={day}
                tasks={this.props.tasks}
              />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysList);
