import React from "react";
import "./StarBorder.css";

type StarBorderProps<T extends React.ElementType> = React.PropsWithChildren<{
  as?: T;
  className?: string;
  color?: string;
  speed?: `${number}s` | number;
}> & React.ComponentProps<T>;

const StarBorder = <T extends React.ElementType>({
  as: Component = "button",
  className = "",
  color = "white",
  speed = "6s",
  children,
  ...rest
}: StarBorderProps<T>) => {
  return (
    <Component className={`star-border-container ${className}`} {...rest}>
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
