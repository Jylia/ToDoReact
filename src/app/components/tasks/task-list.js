import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { List } from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TaskItem from './task-item';
import Filter from '../common/filter';
import NewTaskForm from './new-task-form';
import {
  markAllTasksAsDone,
  fetchTodos
} from '../../actions';
import monImg from '../images/Mon.jpg';
import tueImg from '../images/Tue.jpg';
import wedImg from '../images/Wed.jpg';
import thuImg from '../images/Thu.jpg';
import friImg from '../images/Fri.jpg';
import satImg from '../images/Sat.jpg';
import sunImg from '../images/Sun.jpg';

import './styles.css';

export class TaskList extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const {
      markAllAsDone
    } = this.props;

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

    const weekData = [
      {
        img: monImg,
        title: 'Monday'
      },
      {
        img: tueImg,
        title: 'Tuesday'
      },
      {
        img: wedImg,
        title: 'Wednesday'
      },
      {
        img: thuImg,
        title: 'Thursday'
      },
      {
        img: friImg,
        title: 'Friday'
      },
      {
        img: satImg,
        title: 'Saturday'
      },
      {
        img: sunImg,
        title: 'Sunday',
      }
    ];

    return (
      <div>
        <div className="TaskList">
          {
            this.props.isLoading ? (
              <div>Loading data...</div>
              ) : (
                <div className="container">
                  <Filter
                    filtersList={this.props.filtersList}
                    visibilityFilter={this.props.visibilityFilter}
                  />
                  <Checkbox
                      label={`Mark All as ${this.props.isAllMarkedAsDone ? 'Uncompleted' : 'Completed'}`}
                      onCheck={() => markAllAsDone(this.props.isAllMarkedAsDone)}
                      checked={!!Object.keys(this.props.tasks).length &&  this.props.isAllMarkedAsDone}
                      disabled={!Object.keys(this.props.tasks).length}
                  />
                  <div>
                    <NewTaskForm />
                  </div>
                </div>
              )
          }
        </div>
        <div>
          <GridList
            cols={2}
            cellHeight='auto'
            padding={1}
            style={styles.gridList}
          >
            {weekData.map((day) => (
              <GridTile
                key={day.title}
                actionPosition="left"
                titlePosition="top"
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                cols={1}
                rows={1}
              >
                <Card>
                  <CardHeader
                    title={day.title}
                    subtitle={`${Object.entries(this.props.tasks).length} tasks`}
                    avatar={day.img}
                  />
                  <CardText>
                    {
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
                    }
                  </CardText>
                </Card>
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const visibilityFilter = state.filter;
  return {
    tasks: Object.entries(state.todos.tasks).reduce((acc, [key, taskItem]) => {
      switch (visibilityFilter) {
        case 'ALL':
          acc[key] = taskItem;
          break;
        case 'COMPLETED': 
          if (taskItem.isCompleted) {
            acc[key] = taskItem;
          }
          break;
        case 'UNCOMPLETED':
          if (!taskItem.isCompleted) {
            acc[key] = taskItem;
          }
          break;
        default:
          break;
      }
      return acc;
    }, {}),
    isLoading: state.todos.loading.isLoading,
isAllMarkedAsDone: Object.entries(state.todos.tasks).map(([key, taskItem]) => {
return taskItem.isCompleted;
}).every(isCompleted => isCompleted),
filtersList: ['ALL', 'COMPLETED', 'UNCOMPLETED']
}
}

const mapDispatchToProps = (dispatch) => {
return {
markAllAsDone (isAllMarkedAsDone) {
const action = markAllTasksAsDone(isAllMarkedAsDone);
dispatch(action);
    },
    fetchData () {
      dispatch(fetchTodos());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
