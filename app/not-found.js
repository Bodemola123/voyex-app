import React from "react";

function NotFound() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center text-fontfaded">
        <h1 className="text-3xl"> Page not found!!!</h1>
        <p className="">Requested page could not be loaded or is missing.</p>
      </div>
    </div>
  );
}

export default NotFound;
