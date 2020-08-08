export const getFileIcon = type => {
  if (type.includes("image")) {
    return "mdi-file-image";
  } else if (type.includes("video")) {
    return "mdi-file-video";
  } else if (type.includes("audio")) {
    return "mdi-file-music";
  } else if (type.includes("pdf")) {
    return "mdi-file-pdf";
  } else if (type.includes("wordprocessing")) {
    return "mdi-file-word";
  } else if (type.includes("ms-excel") || type.includes("spreadsheet")) {
    return "mdi-file-excel";
  } else {
    return "mdi-file";
  }
};
