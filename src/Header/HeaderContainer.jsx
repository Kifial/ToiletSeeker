import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { checkUserAuth } from './actions/api';
import { logOut } from './actions/menu';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AuthButtons from './components/AuthButtons/index.jsx';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

require('./main.scss');

const propTypes = {
  logged: React.PropTypes.bool,
  menuOpen: React.PropTypes.bool
};

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRoute = this.handleRoute.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(checkUserAuth());
  }
  goToProfile() {
    browserHistory.push('/profile');
  }
  handleRoute(route) {
    this.handleToggleMenu();
    switch(route) {
      case 'places':
        browserHistory.push('/map/places');
        break;
      case 'directions':
        browserHistory.push('/map/directions');
        break;
      case 'rating':
        browserHistory.push('/rating');
        break;
      default:
        break;
    }
  }
  logOut() {
    this.props.dispatch(logOut());
  }
  handleToggleMenu() {
    this.props.dispatch({
      type: 'HEADER_TOGGLE_MENU'
    });
  }
  get logged() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        style={{
          marginTop: '-6px'
        }}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Profile"
          onClick={this.goToProfile}
        />
        <Divider />
        <MenuItem
          primaryText="Sign out"
          onClick={this.logOut}
        />
      </IconMenu>
    )
  }
  render() {
    return (
      <header className="header">
        <AppBar
          title={<Link to="/">ToiletSeeker</Link>}
          titleStyle={{
            lineHeight: '54px',
            height: '54px'
          }}
          iconStyleLeft={{
            top: '-5px'
          }}
          iconElementRight={
            this.props.logged ?
              this.logged :
              <AuthButtons />
          }
          onLeftIconButtonTouchTap={this.handleToggleMenu}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.props.menuOpen}
          onRequestChange={this.handleToggleMenu}
          containerClassName="header__menu"
        >
          <MenuItem
            primaryText="Places map"
            onClick={() => this.handleRoute('places')}
          />
          <MenuItem
            primaryText="Directions map"
            onClick={() => this.handleRoute('directions')}
          />
          <MenuItem
            primaryText="Rating"
            onClick={() => this.handleRoute('rating')}
          />
        </Drawer>
      </header>
    )
  }
}

HeaderContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    logged: state.header.logged,
    menuOpen: state.header.menuOpen
  }
};

HeaderContainer = connect(
  mapStateToProps
)(HeaderContainer);

export default HeaderContainer;