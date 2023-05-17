import Image from "next/image";
import styles from "./button.module.scss";

export const Button = ({
  mainDiv,
  style,
  type,
  inlineStyle,
  className,
  onClick,
  name,
  icon,
  iconPath,
  disabled,
  id,
}) => {
  return (
    <div
      className={`${styles["main_container"]} ${mainDiv}`}
      style={{ ...style }}
    >
      <button
        type={`${type || "button"}`}
        style={{ ...inlineStyle }}
        className={`${className || null}`}
        onClick={onClick}
        disabled={disabled}
        id={id}
      >
        {name}
        {icon && (
          <span>
            <Image src={iconPath}></Image>
          </span>
        )}
      </button>
    </div>
  );
};
