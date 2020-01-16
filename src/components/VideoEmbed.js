import React from "react";
import PropTypes from "prop-types";

const VideoEmbed = ({ videoId, videoType, videoTitle, ratio }) => {
  let videoUrl = '';

  ratio = ratio || 1.778;

  if (videoType === "vimeo") {
    videoUrl = `https://player.vimeo.com/video/${videoId}?color=ededed`;
  }
  if (videoType === "youtube") {
    videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&amp;controls=0&amp;showinfo=0`;
  }

  return (
    <div className="video-embed" style={{"padding-bottom": `${100/parseFloat(ratio)}%`}}>
      <iframe src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              title={videoTitle}
              webkitallowfullscreen
              mozallowfullscreen
              allowFullScreen/>
    </div>
  );
};

VideoEmbed.propTypes = {
  // eslint-disable-next-line react/no-typos
  videoType: PropTypes.string,
  // eslint-disable-next-line react/no-typos
  videoId: PropTypes.string
};

export default VideoEmbed;
