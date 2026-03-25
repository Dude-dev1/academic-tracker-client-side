import React from "react";
import { Edit2, Trash2 } from "react-feather";

const lightColors = [
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-red-100",
  "bg-purple-100",
  "bg-indigo-100",
  "bg-pink-100",
  "bg-teal-100",
  "bg-orange-100",
];

const CourseCard = ({ course, isInstructor, onEdit, onDelete }) => {
  const colorIndex = course._id 
    ? parseInt(course._id.slice(-1), 16) % lightColors.length 
    : Math.floor(Math.random() * lightColors.length);
    
  const bgColor = lightColors[colorIndex] || "bg-gray-100";

  return (
    <div className={`rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 ${bgColor} relative group`}>
      {isInstructor && (
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={onEdit} 
            className="p-1.5 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full text-blue-600 transition-all"
            title="Edit Course"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={onDelete} 
            className="p-1.5 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full text-red-600 transition-all"
            title="Delete Course"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
      
      <div className="mb-4">
        <span className="inline-block px-2 py-1 bg-white bg-opacity-60 rounded text-xs font-semibold text-gray-700 tracking-wider mb-2">
          {course.code}
        </span>
        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{course.name}</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
        {course.description || "No description provided."}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold mr-2">
            {course.tutorName ? course.tutorName.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <p className="text-xs text-gray-500">Tutor</p>
            <p className="text-sm font-medium text-gray-800">{course.tutorName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
