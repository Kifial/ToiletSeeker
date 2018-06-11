import React from 'react';
import { connect } from 'react-redux';
import {
  likeComment,
  dislikeComment,
  removeLikeFromComment,
  removeDislikeFromComment
} from '../../actions/api';
import FeedItem from '../../components/FeedItem/index.jsx';

require('./index.scss');

const propTypes = {
  items: React.PropTypes.array
};

class FeedList extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this)
    this.handleDislike = this.handleDislike.bind(this)
    this.handleRemoveLike = this.handleRemoveLike.bind(this)
    this.handleRemoveDislike = this.handleRemoveDislike.bind(this)
  }
  handleLike(id) {
    this.props.dispatch(likeComment(id));
  }
  handleDislike(id) {
    this.props.dispatch(dislikeComment(id));
  }
  handleRemoveLike(id) {
    this.props.dispatch(removeLikeFromComment(id));
  }
  handleRemoveDislike(id) {
    this.props.dispatch(removeDislikeFromComment(id));
  }
  render() {
    return (
      <div className="feed-list">
        {this.props.items.map(item =>
          <FeedItem
            key={item.id}
            { ...item }
            handleLike={this.handleLike}
            handleDislike={this.handleDislike}
            handleRemoveLike={this.handleRemoveLike}
            handleRemoveDislike={this.handleRemoveDislike}
          />
        )}
      </div>
    )
  }
}

FeedList.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    items: state.place.comments
  }
};

FeedList = connect(
  mapStateToProps
)(FeedList);

export default FeedList;