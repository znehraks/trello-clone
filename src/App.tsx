import React from "react";
import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "./components/atoms";

const App = () => {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <>
      <input
        value={minutes}
        onChange={onMinuteChange}
        type="number"
        placeholder="Minutes"
      ></input>
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      ></input>
    </>
  );
};

export default App;
