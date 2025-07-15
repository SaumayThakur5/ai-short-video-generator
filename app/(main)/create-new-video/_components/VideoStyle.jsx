import React, { useState } from 'react';
import Image from 'next/image';

export const options = [
  {
    name: 'Realistic',
    image: '/realistic.png',
  },
  {
    name: 'Cinematic',
    image: '/cinematic.png',
  },
  {
    name: 'Cartoon',
    image: '/cartoon.png',
  },
  {
    name: 'Watercolor',
    image: '/watercolor.png',
  },
];

function VideoStyle({ onHandleInputChange }) {
  const [selectedStyle, setSelectedStyle] = useState();

  return (
    <div className="mt-5">
      <h2>Video Styles</h2>
      <p className="text-sm mb-1 text-gray-400">Select Video Style</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
        {options?.map((option) => (
          <div
            key={option.name}
            onClick={() => {
              setSelectedStyle(option.name);
              onHandleInputChange('videoStyle', option.name);
            }}
            className={`cursor-pointer rounded overflow-hidden ${
              option.name === selectedStyle ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            <Image
              src={option.image}
              alt={option.name}
              width={200}
              height={250}
              className="object-cover h-[70px] lg:h-[90px] xl:h-[180px]"
            />
            <h2 className="text-center">{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoStyle;
