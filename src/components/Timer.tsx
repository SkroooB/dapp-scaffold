import { FC, useEffect, useState } from "react";

export const Timer: FC<{timer:number}> = ({timer}) => {
  const [time, setTime] = useState(timer);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <div className="flex">
      <p className=" text-4xl">
        Time left: {`${Math.floor(time / 60)}`.padStart(2, "0")}:
        {`${time % 60}`.padStart(2, "0")}
      </p>
    </div>
  );
};
