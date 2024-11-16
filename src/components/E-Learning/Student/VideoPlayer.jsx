import React from 'react'
import ReactPlayer from 'react-player'
import { CiPlay1 } from "react-icons/ci"

const VideoPlayer = ({ currentVideoUrl }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 mb-5 md:h-[27rem] h-96">
      <ReactPlayer
        url={currentVideoUrl}
        width="100%"
        height="100%"
        controls
        pip={true}
        stopOnUnmount={false}
        volume={0.1}
        playIcon={<button className="text-white bg-primary rounded-full p-2"><CiPlay1 size={30} /></button>}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload'
            }
          }
        }}
        className="rounded-lg shadow-lg"
      />
    </div>
  )
}

export default VideoPlayer