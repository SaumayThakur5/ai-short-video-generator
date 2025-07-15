//actually now the my user.uid meaning is changed as you can see from this code
"use client"
import React, { useState, useEffect } from 'react';
import Topic from './_components/Topic';
import VideoStyle from './_components/VideoStyle';
import Voice from './_components/Voice';
import Captions from './_components/Captions';
import { Button } from '@/components/ui/Button';
import { WandSparkles } from 'lucide-react';
import Preview from './_components/Preview';
import axios from 'axios';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuthContext } from '@/app/provider';

function CreateNewVideo() {
  const [formData, setFormData] = useState({});
  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);
  const { user } = useAuthContext();
  useEffect(() => {
  console.log("Auth User:", user);
}, [user]);


  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [fieldName]: fieldValue
      };
      console.log('Updated formData:', newData);
      return newData;
    });
  };

  const GenerateVideo = async () => {
  if (
    !formData?.topic ||
    !formData?.script ||
    !formData?.videoStyle ||
    !formData?.caption ||
    !formData?.voice
  ) {
    console.log("ERROR", "Enter All Fields");
    return;
  }

  if (!user || !user.uid ) {
  console.error("ERROR User info missing");
  return;
}

const resp = await CreateInitialVideoRecord({
  title: formData.title,
  topic: formData.topic,
  script: formData.script,
  videoStyle: formData.videoStyle,
  caption: formData.caption,
  voice: formData.voice,
  uid: user.uid,
  createdBy: user.email,
});
console.log(resp);

  const result = await axios.post("/api/generate-video-data", {
    ...formData,
    recordId: resp,
  });

  console.log(result);
};

  return (
    <div>
      <h2 className='text-3xl'>Create New Video</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-7'>
        <div className='col-span-2 p-7 border rounded-xl h-[70vh] overflow-auto'>
          <Topic onHandleInputChange={onHandleInputChange} />
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          <Voice onHandleInputChange={onHandleInputChange} />
          <Captions onHandleInputChange={onHandleInputChange} />
          <Button className="w-full mt-5" onClick={GenerateVideo}>
            <WandSparkles />Generate Video
          </Button>
        </div>
        <div>
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewVideo;
