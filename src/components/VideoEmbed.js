import React from "react";
import PropTypes from "prop-types";

const VideoEmbed = ({ videoId, videoType }) => {
  if (videoType === "vimeo") {
    return (
      <div className="video-embed">
        <iframe src={'https://player.vimeo.com/video/' + videoId + '?color=ededed'}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                webkitallowfullscreen
                mozallowfullscreen
                allowFullScreen/>
      </div>
    );
  }

  if (videoType === "youtube") {
    return (
      <div className="video-embed">
        <iframe src={'https://www.youtube-nocookie.com/embed/' + videoId + '?rel=0&amp;controls=0&amp;showinfo=0'}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                webkitallowfullscreen
                mozallowfullscreen
                allowFullScreen/>
      </div>
    );
  }

  return null;
};

VideoEmbed.propTypes = {
  // eslint-disable-next-line react/no-typos
  videoType: PropTypes.string,
  // eslint-disable-next-line react/no-typos
  videoId: PropTypes.string,
};

export default VideoEmbed;
