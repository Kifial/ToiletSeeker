import React from 'react';
import { connect } from 'react-redux';
import MapDirectionsForm from '../../components/MapDirectionsForm/index.jsx';
import Snackbar from 'material-ui/Snackbar';

require('./index.scss');

const propTypes = {
  firstStepSnackbar: React.PropTypes.bool,
  secondStepSnackbar: React.PropTypes.bool
};

class DirectionsMap extends React.Component {
  constructor(props) {
    super(props);
    this.closeFirstStepSnackbar = this.closeFirstStepSnackbar.bind(this);
    this.closeSecondStepSnackbar = this.closeSecondStepSnackbar.bind(this);
  }
  closeFirstStepSnackbar() {
    this.props.dispatch({
      type: 'MAP_CLOSE_FIRST_STEP_SNACKBAR'
    });
  }
  closeSecondStepSnackbar() {
    this.props.dispatch({
      type: 'MAP_CLOSE_SECOND_STEP_SNACKBAR'
    });
  }
  render() {
    return (
      <div className="directions-map">
        <MapDirectionsForm />
        <Snackbar
          open={this.props.firstStepSnackbar}
          message="Choose first point on map"
          autoHideDuration={6000}
          onRequestClose={this.closeFirstStepSnackbar}
        />
        <Snackbar
          open={this.props.secondStepSnackbar}
          message="Choose second point on map"
          autoHideDuration={6000}
          onRequestClose={this.closeSecondStepSnackbar}
        />
      </div>
    )
  }
}

DirectionsMap.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    firstStepSnackbar: state.map.firstStepSnackbar,
    secondStepSnackbar: state.map.secondStepSnackbar,
  }
};

DirectionsMap = connect(
  mapStateToProps
)(DirectionsMap);

export default DirectionsMap;