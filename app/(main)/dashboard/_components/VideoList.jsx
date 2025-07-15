"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { useAuthContext } from "@/app/provider";
import { useConvex } from "convex/react";
import { RefreshCcw } from "lucide-react";

function VideoList() {
  const [videoList, setVideoList] = useState([]);
  const convex = useConvex();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && user.uid) {
      GetUserVideoList(user.uid);
    }
  }, [user]);

  const GetUserVideoList = async (uid) => {
    if (!uid) return;
    try {
      const result = await convex.query(api.videoData.GetUserVideos, {
        uid: uid,
      });
      setVideoList(result);
      console.log(result);

      const isPendingVideo = result?.find((item) => item.status === "pending");
      isPendingVideo && GetPendingVideoStatus(isPendingVideo);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  const GetPendingVideoStatus = (pendingVideo) => {
    const intervalId = setInterval(async () => {
      const result = await convex.query(api.videoData.GetVideoById, {
        videoId: pendingVideo?._id,
      });

      if (result?.status === "completed") {
        clearInterval(intervalId);
        console.log("Video Completed");
        GetUserVideoList(pendingVideo?.uid);
      } else {
        console.log("Still Pending");
      }
    }, 5000);
  };

  return (
    <div>
      {videoList?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-28">
          <Image src={"/logo.svg"} alt="logo" width={60} height={60} />
          <h2>You don't have any videos created yet</h2>
          <Link href={"/create-new-video"}>
            <Button className="mt-5">+ Create New Video</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-10">
          {videoList?.map((video, index) => (
            <Link href={`play-video/${video?._id}`} key={video._id ?? index}>
              <div className="flex flex-col items-center space-y-2">
                {video?.images?.[0] && video.images[0].trim() !== "" ? (
                  video?.status === "completed" ? (
                    <Image
                      src={video.images[0]}
                      alt={video?.title || "Video"}
                      width={180}
                      height={250}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="aspect-[2/3] w-[180px] h-[250px] flex flex-col items-center justify-center bg-slate-900 text-white rounded-lg">
                      <RefreshCcw className="animate-spin w-6 h-6 mb-2" />
                      <h2 className="text-sm">Generating...</h2>
                    </div>
                  )
                ) : (
                  <div className="aspect-[2/3] w-[180px] h-[250px] flex flex-col items-center justify-center bg-slate-800 text-white rounded-lg">
                    <h2 className="text-sm">No Image</h2>
                  </div>
                )}
                <h2 className="text-center text-white font-semibold text-sm">
                  {video?.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoList;
