import { useState } from "react";

export default function useFilePreview() {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleFilePreview = (event) => {
    const { type, files } = event.target;
    if (type === "file" && files.length > 0) {
      const file = files[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  };
  return {
    photoPreview,
    handleFilePreview,
  };
}
