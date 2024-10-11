import React, { useEffect, useState } from "react";
import "./Cursor.css"; // Import the CSS for styling

const Cursor = () => {
  const [cursorStyle, setCursorStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorStyle({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Change cursor color based on hover state
  const cursorClass = isHovering ? "custom-cursor hover" : "custom-cursor";

  return (
    <div
      className={cursorClass}
      style={cursorStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="subChild"></div>
    </div>
  );
};

export default Cursor;
