import React from 'react';
import { connect } from 'react-redux';
import { getStatistics } from '../../actions/api';
import Paper from 'material-ui/Paper';

require('./index.scss');

const propTypes = {
  login: React.PropTypes.string,
  statistics: React.PropTypes.array
};

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(getStatistics(this.props.login));
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
        <div className="profile-statistics">
          <div className="profile-statistics__title">Your statistics</div>
          <div className="profile-statistics__list">
            {this.props.statistics.map((item, i) =>
              <div className="profile-statistics__list-item" key={i}>
                <div className="profile-statistics__list-number">{item.number}</div>
                <div className="profile-statistics__list-text">{item.text}</div>
              </div>
            )}
          </div>
        </div>
      </Paper>
    )
  }
}

Statistics.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    login: state.profile.login,
    statistics: state.profile.statistics
  }
};

Statistics = connect(
  mapStateToProps
)(Statistics);

export default Statistics;