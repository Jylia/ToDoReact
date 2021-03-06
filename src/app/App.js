import React from 'react';
import TaskList from './components/tasks/taskList';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.muiTheme = getMuiTheme();
  }

  render() {
    const style = {
      margin: 24,
    };

    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div className="App">
          <div className="App-header">
            <h2 style={style}>ToDo Lists</h2>
          </div>
          <div className="App-intro">
            <TaskList/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
