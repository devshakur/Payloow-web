
// import React from 'react'
// import ReactPlayer from 'react-player'
// import { CiPlay1 } from "react-icons/ci"

// const VideoPlayer = ({ currentVideoUrl }) => {
//   console.log("Video URL:", currentVideoUrl);
//   return (
//     <div className="aspect-w-16 aspect-h-9 mb-5 md:h-[27rem] h-96">
//       <ReactPlayer
//         url={currentVideoUrl}
//         width="100%"
//         height="100%"
//         controls
//         pip={true}
//         stopOnUnmount={false}
//         volume={0.1}
//         playIcon={<button className="text-white bg-primary rounded-full p-2"><CiPlay1 size={30} /></button>}
//         config={{
//           file: {
//             attributes: {
//               controlsList: 'nodownload'
//             }
//           }
//         }}
//         className="rounded-lg shadow-lg"
//       />
//     </div>
//   )
// }

// export default VideoPlayer

import React from 'react';
import ReactPlayer from 'react-player';
import { CiPlay1 } from "react-icons/ci";

const VideoPlayer = ({ currentVideoUrl }) => {
  if (!currentVideoUrl) return null;

  return (
    <div className="relative pb-[56.25%] h-0 mb-5 md:h-[27rem]">
      <ReactPlayer
        url={encodeURI(currentVideoUrl)}
        width="100%"
        height="100%"
        controls
        pip={true}
        stopOnUnmount={false}
        volume={0.5}
        playing={true}
        playIcon={
          <button
            aria-label="Play Video"
            className="text-white bg-primary rounded-full p-2"
          >
            <CiPlay1 size={30} />
          </button>
        }
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
              preload: 'metadata',
            }
          }
        }}
        className="absolute top-0 left-0 rounded-lg shadow-lg"
      />
    </div>
  );
};

export default VideoPlayer;
