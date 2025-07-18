"use client";
import React, { useEffect, useState } from "react";
import RemotionPlayer from "../_components/RemotionPlayer";
import VideoInfo from "../_components/VideoInfo";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";

function PlayVideo() {
  const convex = useConvex();
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    if (videoId) {
      GetVideoDataById();
    }
  }, [videoId]);

  const GetVideoDataById = async () => {
  try {
    const result = await convex.query(api.videoData.GetVideoById, {
      videoId: videoId // Just pass the string directly
    });
    console.log(result);
    setVideoData(result);
  } catch (err) {
    console.error("Error fetching video data:", err);
  }
};
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <RemotionPlayer videoData={videoData} />
      </div>
      <div>
        <VideoInfo videoData={videoData} />
      </div>
    </div>
  );
}

export default PlayVideo;