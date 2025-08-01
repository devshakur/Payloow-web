// import React from "react";
// import { SlOptionsVertical } from "react-icons/sl";

// const LearningCard = ({
//   thumbnailUrl,
//   title,
//   progress_percentage,
//   category,
//   students_enrolled,
//   percentageCompleted
// }) => {
//  const getProgressColor = (progress_percentage) => {
//   console.log(progress_percentage);
  
//   switch ((progress_percentage || "").toString().toLowerCase()) {
//     case "completed":
//       return "text-green-500 bg-green-100";
//     case "in progress":
//       return "text-orange-500 bg-orange-100";
//     default:
//       return "text-gray-500 bg-gray-100";
//   }
// };
// const progressValue = Math.min(Math.max(Number(percentageCompleted) || 0, 0), 100);

//   return (
//     <div className="bg-white shadow-lg rounded-lg mb-5">
//       <img src={thumbnailUrl ? thumbnailUrl : '/images/course-img.png'} alt={title} className="h-40 w-full object-cover rounded-t-lg" />

//       <div className="p-5 h-60 flex flex-col justify-between">
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <p className="bg-[#C0D5FD] text-sm px-2 rounded py-1 capitalize">{category}</p>
//           </div>
//           <div className="flex items-center space-x-1 text-xs">
//             <img src="/images/students-icon.svg" alt="" />
//             <p> {students_enrolled} enrolled</p>
//           </div>
//         </div>
//         <h3 className="text-lg font-semibold pb-5 h-2/6 place-items-start">{title}</h3>
//      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
//   <div
//     className="bg-primary h-full rounded-full transition-all duration-500"
//     style={{ width: `${progressValue}%` }}
//   ></div>
// </div>
//         <div className="w-full">
//           <div className="flex items-center justify-between">
//             <p className="w-22 h-8 text-center px-4 font-plus-jakarta bg-[#FFC38EAB]  rounded-md text-[#FF6A00]">
//             in progress
//             </p>
//             <p
//               className={`${getProgressColor(
//                progress_percentage
//               )} text-sm capitalize px-5 rounded py-1`}
//             >
//               {/* {progress_percentage} */} 50
//             </p>

          
//             <span className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/5 text-primary">
//               <SlOptionsVertical />
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LearningCard;

import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { courses } from "../../Admin/Data";

const LearningCard = ({
 thumbnailUrl,
  title,
  progress,
  percentageCompleted,
  tags,
  students_enrolled,
}) => {
  
  
 
  

 

  return (
    <div className="bg-white rounded-xl p-4 shadow border">
      {/* Thumbnail and Title */}
      <img
        src={thumbnailUrl}
        alt="Course Thumbnail"
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Progress bar */}
  {progress?.progress_percentage !== undefined && (
  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
    <div
      className="bg-primary h-full rounded-full transition-all duration-500"
      style={{ width: `${progress?.progress_percentage}%` }}
    ></div>
  </div>
)}



      {/* Progress label */}
      {/* Progress label */}
<div className="flex items-center justify-between mt-2">
  {(() => {
    const percentage = progress?.progress_percentage;

    let label = "Unknown";
    let color = "bg-gray-200 text-gray-700";

    if (percentage === 100) {
      label = "Completed";
      color = "bg-green-100 text-green-600";
    } else if (percentage > 0) {
      label = "In Progress";
      color = "bg-orange-100 text-orange-600";
    } else if (percentage === 0 || percentage === undefined) {
      label = "Not Started";
      color = "bg-gray-100 text-gray-600";
    }

    return (
      <p className={`text-sm px-3 py-1 rounded-md capitalize font-medium ${color}`}>
        {label}
      </p>
    );
  })()}
</div>

      {/* <div className="flex items-center justify-between mt-2">
        <p className="text-sm bg-[#FFC38EAB] text-[#FF6A00] px-3 py-1 rounded-md capitalize">
         {(() => {
  const percentage = progress?.progress_percentage;

  let label = "Unknown";
  let color = "bg-gray-200 text-gray-700";

  if (percentage === 100) {
    label = "Completed";
    color = "bg-green-100 text-green-600";
  } else if (percentage > 0) {
    label = "In Progress";
    color = "bg-orange-100 text-orange-600";
  } else if (percentage === 0) {
    label = "Not Started";
    color = "bg-gray-100 text-gray-600";
  }
        </p>

        <span className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/5 text-primary">
          <SlOptionsVertical />
        </span>
      </div> */}
    </div>
  );
};

export default LearningCard;
