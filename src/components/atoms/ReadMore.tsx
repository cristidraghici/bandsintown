import React, { useState, ComponentProps } from "react";

interface ReadMoreProps extends ComponentProps<"span"> {
  children?: string;
  maxLength: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({
  children,
  maxLength,
  ...rest
}) => {
  const [isTruncated, setIsTruncated] = useState(true);

  if (!children) return null;

  if (children.length <= maxLength) {
    return <>{children}</>;
  }

  const resultString = isTruncated
    ? `${children.slice(0, maxLength)}...`
    : children;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTruncated(!isTruncated);
  };

  return (
    <span {...rest}>
      {resultString}{" "}
      <a className="ReadMore" href="#" onClick={onClick}>
        {isTruncated ? "Read more" : "Show less"}
      </a>
    </span>
  );
};

export default ReadMore;
