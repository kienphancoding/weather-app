import style from "./ErrorLocation.module.scss";
import clsx from "clsx";
import { memo } from "react";

const ErrorLocation = () => {
  return (
    <>
      <div className={clsx(style.number)}>???</div>
      <div className={clsx(style.text)}>
        <span>Unable to access location</span>
      </div>
    </>
  );
};

export default memo(ErrorLocation);
