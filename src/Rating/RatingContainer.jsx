import React from 'react';
import { connect } from 'react-redux';
import { getRatingInfo } from './actions/api';

require('./main.scss');

class RatingContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(getRatingInfo());
  }
  render() {
    return (
      <div className="rating-page">
        <div className="rating-page__title"></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
};

RatingContainer = connect(
  mapStateToProps
)(RatingContainer);

export default RatingContainer;