import React from 'react';

function VideoInfo({ videoData }) {
  return (
    <div style={{
      padding: '1.5rem',
      borderRadius: '12px',
      maxWidth: '600px',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif',
      color: 'white' // Grayish text
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
         Project Name: <span style={{ fontWeight: 'normal' }}>{videoData?.title}</span>
      </h2>
      <p style={{
        fontSize: '1rem',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.6'
      }}>
         Script: {videoData?.script}
      </p>
      <h2 style={{ fontSize: '1.25rem', marginTop: '20px' }}>
         Video Style: <span style={{ fontWeight: 'normal' }}>{videoData?.videoStyle}</span>
      </h2>
    </div>
  );
}


export default VideoInfo;
