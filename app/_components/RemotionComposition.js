"use client"
import React, { useState, useEffect } from 'react'
import { useVideoConfig, useCurrentFrame, Sequence, Audio, Img, AbsoluteFill } from 'remotion';

function RemotionComposition({ videoData, setDurationInFrame }) {
    const captions = videoData?.captionJson;
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame(); // ✅ Get current frame
    const imageList = videoData?.images;
    const [totalDuration, setTotalDuration] = useState(0);
    
    useEffect(() => {
        if (videoData && captions?.length > 0) {
            const duration = captions[captions.length - 1]?.end * fps;
            setTotalDuration(duration);
            setDurationInFrame(duration);
        }
    }, [videoData, captions, fps]);

    // ✅ Fix caption logic
    const getCurrentCaption = () => {
        const currentTime = frame / fps;
        const currentCaption = captions?.find(
            (item) => currentTime >= item.start && currentTime <= item.end
        );
        return currentCaption?.word || '';
    };

    if (totalDuration <= 0) return null;

    return (
        <div>
            <AbsoluteFill>
                {imageList?.map((item, index) => {
                    const startTime = (index * totalDuration) / imageList.length;
                    return (
                        <Sequence key={index} from={startTime} durationInFrames={totalDuration}>
                            <AbsoluteFill>
                                <Img
                                    src={item}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </AbsoluteFill>
                        </Sequence>
                    );
                })}
                {videoData?.audiourl && (
                    <Sequence from={0} durationInFrames={totalDuration}>
                        <Audio src={videoData?.audiourl} />
                    </Sequence>
                )}
            </AbsoluteFill>
            
            <AbsoluteFill>
                <h2 style={{
                    position: 'absolute',
                    bottom: 50,
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 40,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}>
                    {getCurrentCaption()}
                </h2>
            </AbsoluteFill>
        </div>
    )
}

export default RemotionComposition;
