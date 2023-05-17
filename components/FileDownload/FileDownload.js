import React from "react";

const FileDownload = (url, filename = "file") => {
  filename = url.split("/").pop();
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
      if (error.name === "TypeError" && error.message.includes("CORS")) {
        console.error("CORS error detected");
        // Handle CORS error here
      }
    });
};

export default FileDownload;
