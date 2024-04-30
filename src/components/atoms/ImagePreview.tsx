import React, { useState } from "react";

interface ImagePreviewProps {
  thumbUrl: string;
  imageUrl: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ thumbUrl, imageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsModalOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsModalOpen(false);
  };

  return (
    <div className="ImagePreview">
      <img
        src={thumbUrl}
        alt="Preview"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
      {isModalOpen && (
        <div className="ImagePreview_Modal" onClick={handleClose}>
          <img src={imageUrl} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
