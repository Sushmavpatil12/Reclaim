export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxMDc3OTRjMi04MWU2LTQ1NmMtOTVmZC0yMmUxNGEwNzZlNzQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMjI3NDIxNSwiZXhwIjoxNzMzODEwMjE1fQ.oZhyha1hPcDJJbzGLaJS4lv91oYMiS1xIn8dkidn3I0";

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};
