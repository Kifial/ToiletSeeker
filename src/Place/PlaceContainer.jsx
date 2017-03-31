import React from 'react';
import { connect } from 'react-redux';
import { getPlaceInfo, checkIn } from './actions/api';
import FeedList from './containers/FeedList/index.jsx';
import CreateCommentModal from './components/CreateCommentModal/index.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import AddLocationIcon from 'material-ui/svg-icons/maps/add-location';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

require('./main.scss');

const propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  tags: React.PropTypes.string,
  vicinity: React.PropTypes.string,
  ratingFields: React.PropTypes.array,
  rating: React.PropTypes.string,
  coords: React.PropTypes.object,
  userCoords: React.PropTypes.object,
  checkIn: React.PropTypes.bool,
  checkInSuccess: React.PropTypes.bool,
  checkInSuccessMessage: React.PropTypes.string
};

class Place extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckIn = this.handleCheckIn.bind(this);
    this.createComment = this.createComment.bind(this);
    this.closeCheckInSnackbar = this.closeCheckInSnackbar.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getPlaceInfo(this.props.params.placeId));
    navigator.geolocation.getCurrentPosition(position => {
      let checkIn = false;
      if (google.maps.geometry &&
        google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          new google.maps.LatLng(this.props.coords.lat, this.props.coords.lng)
        ) <= 100) {
        checkIn = true;
      }
      this.props.dispatch({
        type: 'PLACE_SET_CURRENT_POSITION',
        coords: position.coords,
        checkIn
      });
    });
  }
  handleCheckIn() {
    this.props.dispatch(checkIn(this.props.id));
  }
  createComment() {
    this.props.dispatch({
      type: 'CREATE_COMMENT_MODAL_OPEN'
    });
  }
  closeCheckInSnackbar() {
    this.props.dispatch({
      type: 'PLACE_CLOSE_CHECK_IN_SNACKBAR'
    });
  }
  render() {
    return (
      <Paper
        zDepth={1}
        style={{
          width: '800px',
          margin: '20px auto'
        }}
      >
        <div className="place">
          <div className="place__info-box">
            <div className="place__title">{this.props.name}</div>
            <div className="place__tags">{this.props.tags}</div>
            <div className="place__vicinity">{this.props.vicinity}</div>
            {this.props.rating !== '' ?
              <div className="place__rating">Overall rating: {this.props.rating}/5</div> : ''
            }
          </div>
          <FeedList />
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
          <FloatingActionButton
            secondary={true}
            onClick={this.createComment}
            style={{
              position: 'fixed',
              right: '20px',
              bottom: '30px'
            }}
          >
            <ContentCreate
              style={{
                width: '30px'
              }}
            />
          </FloatingActionButton>
        </div>
        <CreateCommentModal
          placeId={this.props.id}
          ratingFields={this.props.ratingFields}
        />
        <Snackbar
          open={this.props.checkInSuccess}
          message={this.props.checkInSuccessMessage}
          autoHideDuration={4000}
          onRequestClose={this.closeCheckInSnackbar}
        />
      </Paper>
    )
  }
}

Place.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    id: state.place.id,
    name: state.place.name,
    tags: state.place.tags,
    vicinity: state.place.vicinity,
    ratingFields: state.place.ratingFields,
    rating: state.place.rating,
    coords: state.place.coords,
    userCoords: state.place.userCoords,
    checkIn: state.place.checkIn,
    checkInSuccess: state.place.checkInSuccess,
    checkInSuccessMessage: state.place.checkInSuccessMessage
  }
};

Place = connect(
  mapStateToProps
)(Place);

export default Place;