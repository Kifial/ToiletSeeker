import React from 'react';
import LikesLine from '../LikesLine/index.jsx';
import LikeIcon from 'material-ui/svg-icons/action/thumb-up';
import DislikeIcon from 'material-ui/svg-icons/action/thumb-down';

require('./index.scss');

const propTypes = {
  id: React.PropTypes.string,
  text: React.PropTypes.string,
  date: React.PropTypes.string,
  name: React.PropTypes.string,
  avatar: React.PropTypes.string,
  likes: React.PropTypes.number,
  dislikes: React.PropTypes.number,
  liked: React.PropTypes.bool,
  disliked: React.PropTypes.bool
};

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }
  handleLike() {
    if (this.props.liked) {
      this.props.handleRemoveLike(this.props.id);
    } else {
      if (this.props.disliked) {
        this.props.handleRemoveDislike(this.props.id);
      }
      this.props.handleLike(this.props.id);
    }
  }
  handleDislike() {
    if (this.props.disliked) {
      this.props.handleRemoveDislike(this.props.id);
    } else {
      if (this.props.liked) {
        this.props.handleRemoveLike(this.props.id);
      }
      this.props.handleDislike(this.props.id);
    }
  }
  render() {
    return (
      <div className="feed-item">
        <div className="feed-item__info-box">
          <div className="feed-item__avatar-box">
            <img src={this.props.avatar} alt="avatar" />
          </div>
          <div className="feed-item__text-box">
            <div className="feed-item__user-name">{this.props.name}</div>
            <div className="feed-item__date">{this.props.date}</div>
            <div className="feed-item__text">{this.props.text}</div>
          </div>
        </div>
        <div className="feed-item__rating-box">
          <div className="feed-item__likes-box">
            <div className="feed-item__likes">
              <LikeIcon
                className={'feed-item__like-icon ' + (this.props.liked ? 'feed-item__like-icon--active' : '')}
                onClick={this.handleLike}
              />
              <span className="feed-item__likes-count">{this.props.likes}</span>
            </div>
            <div className="feed-item__dislikes">
              <DislikeIcon
                className={'feed-item__dislike-icon ' + (this.props.disliked ? 'feed-item__dislike-icon--active': '')}
                onClick={this.handleDislike}
              />
              <span className="feed-item__likes-count">{this.props.dislikes}</span>
            </div>
          </div>
          <LikesLine
            likes={this.props.likes}
            dislikes={this.props.dislikes}
          />
          <div className="feed-item__rating-fields">
            {this.props.ratingFields.map(item =>
              <div key={item.id} className="feed-item__rating-field">
                <div className="feed-item__rating-field-name">{item.name}:</div>
                <div className="feed-item__rating-field-value">{item.value}/5</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

FeedItem.propTypes = propTypes;

export default FeedItem;