import React, { useState, ComponentProps } from "react";

interface ImagePreviewProps extends ComponentProps<"div"> {
  thumbUrl: string;
  imageUrl: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  className = "",
  thumbUrl,
  imageUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
    <div className={`ImagePreview ${className}`}>
      <a href="{imageUrl}" target="_blank" onClick={handleClick}>
        <img src={thumbUrl} alt="Preview" style={{ cursor: "pointer" }} />
      </a>

      {isModalOpen && (
        <div className="ImagePreview_Modal" onClick={handleClose}>
          <img src={imageUrl} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
