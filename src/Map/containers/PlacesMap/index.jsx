import React from 'react';
import { connect } from 'react-redux';
import { checkIn } from '../../actions/api';
import CreatePlaceModal from '../../components/CreatePlaceModal/index.jsx';
import MapSearch from '../../components/MapSearch/index.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddLocationIcon from 'material-ui/svg-icons/maps/add-location';
import Snackbar from 'material-ui/Snackbar';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
require('./index.scss');

const propTypes = {
  checkIn: React.PropTypes.bool,
  checkInSuccess: React.PropTypes.bool,
  checkInSuccessMessage: React.PropTypes.string,
  selectedMarker: React.PropTypes.string
};

class PlacesMap extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckIn = this.handleCheckIn.bind(this);
    this.openCreatePlaceModal = this.openCreatePlaceModal.bind(this);
    this.closeCheckInSnackbar = this.closeCheckInSnackbar.bind(this);
  }
  openCreatePlaceModal() {
    this.props.dispatch({
      type: 'CREATE_PLACE_MODAL_OPEN'
    });
  }
  closeCheckInSnackbar() {
    this.props.dispatch({
      type: 'MAP_CLOSE_CHECK_IN_SNACKBAR'
    });
  }
  handleCheckIn() {
    this.props.dispatch({
      type: 'MAP_DISABLE_CHECK_IN'
    });
    this.props.dispatch(checkIn(this.props.selectedMarker));
  }
  render() {
    return (
      <div className="places-map">
        <MapSearch />
        <CreatePlaceModal />
        <FloatingActionButton
          secondary={true}
          className="map__create-place"
          onClick={this.openCreatePlaceModal}
        >
          <ContentAdd
            style={{
              width: '30px'
            }}
          />
        </FloatingActionButton>
        {this.props.checkIn ?
          <BottomNavigation
            selectedIndex={0}
            style={{
              position: 'fixed',
              bottom: '0',
              left: '0'
            }}
          >
            <BottomNavigationItem
              label="Check-in"
              icon={<AddLocationIcon />}
              onClick={this.handleCheckIn}
            />
          </BottomNavigation> :
          ''
        }
        <Snackbar
          open={this.props.checkInSuccess}
          message={this.props.checkInSuccessMessage}
          autoHideDuration={4000}
          onRequestClose={this.closeCheckInSnackbar}
        />
      </div>
    )
  }
}

PlacesMap.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    checkIn: state.map.checkIn,
    checkInSuccess: state.map.checkInSuccess,
    checkInSuccessMessage: state.map.checkInSuccessMessage,
    selectedMarker: state.map.selectedMarker
  }
};

PlacesMap = connect(
  mapStateToProps
)(PlacesMap);

export default PlacesMap;