import React from 'react';

const propTypes = {
  likes: React.PropTypes.number.isRequired,
  dislikes: React.PropTypes.number.isRequired
};

const LikesLine = (props) => {
  let likes = props.likes ? (props.likes / (props.likes + props.dislikes)) * 100 : 0;
  let dislikes = props.dislikes ? (props.dislikes / (props.likes + props.dislikes)) * 100 : 0;
  return (
    <div className="feed-item__likes-line-box">
      <div className="feed-item__likes-line">
        {likes ?
          <div
            className="feed-item__likes-line-likes"
            style={{
              width: `${likes}%`
            }}
          ></div> :
          ''
        }
        {dislikes ?
          <div
            className="feed-item__likes-line-dislikes"
            style={{
              width: `${dislikes}%`
            }}
          ></div> :
          ''
        }
      </div>
    </div>
  )
};

LikesLine.propTypes = propTypes;

export default LikesLine;