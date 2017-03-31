import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../Header/HeaderContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;