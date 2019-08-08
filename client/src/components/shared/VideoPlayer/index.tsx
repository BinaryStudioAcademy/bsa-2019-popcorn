import React from 'react'
import ReactPlayer from 'react-player'
import "./VideoPlayer.scss";

interface IProps {
  videoPath: string
}

const VideoPlayer: React.SFC<IProps> = (props) => {

  const { videoPath } = props;

  return (
    <div className='player-wrapper'>
      {videoPath && (
        <ReactPlayer
          url={videoPath}
          className="react-player"
          width="100%"
          height="100%"
          playing={true}
          controls={true}
          light={true}
          loop={false}
          wrapper='div'
        />
      )}
    </div>
  );
};

export default VideoPlayer;