import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Pagination from './components/Pagination/index.jsx';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.setTabSelected = this.setTabSelected.bind(this);
  }
  componentWillMount() {
    this.setTabSelected();
  }
  setTabSelected() {
    let pathArray = this.props.location.pathname.split('/'),
      currentTab = pathArray[pathArray.length - 1],
      tabNumber;
    switch(currentTab) {
      case 'places':
        tabNumber = 0;
        break;
      case 'users':
        tabNumber = 1;
        break;
      case 'rating':
        tabNumber = 2;
        break;
      default:
        break;
    }
    this.props.dispatch({
      type: 'ADMIN_SET_CURRENT_TAB',
      data: currentTab
    });
    this.setState({
      startedTab: tabNumber
    });
  }
  handleTabChange(value) {
    browserHistory.push(`/admin/${value}`);
    this.props.dispatch({
      type: 'ADMIN_SET_CURRENT_TAB',
      data: value
    });
  }
  render() {
    return (
      <Paper
        zDepth={1}
        style={{
          width: '900px',
          margin: '20px auto'
        }}
      >
        <Tabs
          initialSelectedIndex={this.state.startedTab}
          onChange={this.handleTabChange}
        >
          <Tab
            label="Places"
            value="places"
          />
          <Tab
            label="Users"
            value="users"
          />
          <Tab
            label="Rating fields"
            value="rating"
          />
        </Tabs>
        {this.props.children}
        {this.props.pagesCount > 1 ?
          <Pagination /> :
          ''
        }
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pagesCount: state.admin.pagesCount
  }
};

Admin = connect(
  mapStateToProps
)(Admin);

export default Admin;