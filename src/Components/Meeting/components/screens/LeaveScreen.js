export function LeaveScreen({ setIsMeetingLeft }) {
  return (
    <div className="bg-black h-screen  flex flex-col flex-1 items-center justify-center">
      <h1 className="text-white text-4xl">You left the meeting!</h1>
      <div className="mt-12">
        <button
          className="`w-full bg-green-950 text-white px-16 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </button>
      </div>
    </div>
  );
}
