import React from 'react';
import { connect } from 'react-redux';
import { createDirection } from '../../actions/map';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

require('./index.scss');

const propTypes = {
  origin: React.PropTypes.string,
  destination: React.PropTypes.string,
  onlyClosestPlaces: React.PropTypes.bool,
  directions: React.PropTypes.any,
  directionsActive: React.PropTypes.bool
};

class MapDirectionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.showClosestPlaces = this.showClosestPlaces.bind(this);
    this.resetClosestPlaces = this.resetClosestPlaces.bind(this);
    this.handleClosestPlaces = this.handleClosestPlaces.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startMakingDirection = this.startMakingDirection.bind(this);
    this.resetMakingDirection = this.resetMakingDirection.bind(this);
    this.handleMakeDirection = this.handleMakeDirection.bind(this);
  }
  showClosestPlaces() {
    this.props.dispatch({
      type: 'MAP_SHOW_CLOSEST_PLACES'
    });
  }
  resetClosestPlaces() {
    this.props.dispatch({
      type: 'MAP_RESET_CLOSEST_PLACES'
    });
  }
  handleClosestPlaces() {
    if (this.props.onlyClosestPlaces) {
      this.resetClosestPlaces();
    } else {
      this.showClosestPlaces();
    }
  }
  handleInput(e) {
    this.props.dispatch({
      type: 'MAP_DIRECTIONS_FORM_HANDLE_INPUT',
      name: e.target.name,
      value: e.target.value
    });
  }
  handleSubmit() {
    this.props.dispatch(createDirection(
      this.props.origin,
      this.props.destination
    ));
  }
  startMakingDirection() {
    this.props.dispatch({
      type: 'MAP_START_MAKING_DIRECTION'
    });
  }
  resetMakingDirection() {
    this.props.dispatch({
      type: 'MAP_RESET_MAKING_DIRECTION'
    });
  }
  handleMakeDirection() {
    if (!this.props.directionsActive) {
      this.startMakingDirection();
    } else {
      this.resetMakingDirection();
    }
  }
  render() {
    return (
      <div className="map-directions-form">
        <div className="map-directions-form__left">
          <div className="map-directions-form__input-box">
            <input
              type="text"
              name="origin"
              className="ui-input ui-input--row"
              placeholder="Direction origin"
              value={this.props.origin}
              onChange={this.handleInput}
            />
          </div>
          <div className="map-directions-form__input-box">
            <input
              type="text"
              name="destination"
              className="ui-input ui-input--row"
              placeholder="Direction destination"
              value={this.props.destination}
              onChange={this.handleInput}
            />
          </div>
          <FlatButton
            label="Submit"
            primary={true}
            onClick={this.handleSubmit}
            style={{
              margin: '0 15px 0 0'
            }}
          />
          {this.props.directions ?
            <RaisedButton
              label="Show closest"
              secondary={!this.props.onlyClosestPlaces}
              primary={this.props.onlyClosestPlaces}
              onClick={this.handleClosestPlaces}
            /> :
            ''
          }
        </div>
        <div className="map-directions-form__right">
          <FlatButton
            label="By Map Touching"
            secondary={this.props.directionsActive}
            primary={!this.props.directionsActive}
            onClick={this.handleMakeDirection}
          />
        </div>
      </div>
    )
  }
}

MapDirectionsForm.propTypes = propTypes;

const mapStateToProps = (state) => {
  const form = state.forms.mapDirectionsForm;
  return {
    origin: form.origin,
    destination: form.destination,
    onlyClosestPlaces: state.map.onlyClosestPlaces,
    directions: state.map.directions,
    directionsActive: state.map.directionsActive
  }
};

MapDirectionsForm = connect(
  mapStateToProps
)(MapDirectionsForm);

export default MapDirectionsForm;