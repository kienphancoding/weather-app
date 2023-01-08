import style from "./ErrorLocation.module.scss"
import clsx from "clsx";
import { memo } from "react";

const ErrorLocation = () => {
  return (
    <div>
      <div className={clsx(style.number)}>???</div>
      <div className={clsx(style.text)}>
        <span>
          Unable to access location
        </span>
      </div>
    </div>
  );
};

export default memo(ErrorLocation);
