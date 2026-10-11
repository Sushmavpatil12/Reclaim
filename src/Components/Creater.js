import React, { useState } from 'react';

const VideoSdkComponent = () => {
  const [meetingId, setMeetingId] = useState('');
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxMDc3OTRjMi04MWU2LTQ1NmMtOTVmZC0yMmUxNGEwNzZlNzQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMjIzNjkwMiwiZXhwIjoxNzAyMzIzMzAyfQ.APieALYXvUrAZ_t5SR1caadLLN-lA2c8erTMSgVm9Ao";

  const createMeeting = async () => {
    try {
      const response = await fetch('https://api.videosdk.live/v2/rooms', {
        method: 'POST',
        headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      });
      const { roomId } = await response.json();
      setMeetingId(roomId);
    } catch (error) {
      console.error('Error:', error);
      // Handle error - You can set an error state or display an alert here
    }
  };

  const copyText = () => {
    const textToCopy = document.getElementById('meetingId');
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = textToCopy.innerText;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Text copied!');
  };

  return (
    <div className="card-body">
      <h5 className="card-title text-primary">Create Meeting ID 🎉</h5>
      <p className="mb-4">
        Click the Generate Meeting to create a new Meeting<br/>
      </p>
      <b><p id="meetingId">{meetingId}</p></b>
      <br/>
      <div className="d-flex">
        <button className="btn btn-primary" onClick={createMeeting}>Generate Meeting</button>
        <button className="btn btn-outline-primary" style={{ display: meetingId ? 'block' : 'none' }} onClick={copyText}>Copy Code</button>
      </div>
    </div>
  );
};

export default VideoSdkComponent;
