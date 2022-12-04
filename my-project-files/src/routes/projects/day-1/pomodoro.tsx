import { useRef } from "react";
import Timer from "~/app/components/pages/pomodoro/Timer";
import "./global-day-1.css";

export default function PomodoroProject() {
  const ringElementRef = useRef<HTMLDivElement>(null);
  return (
    <div className="pomodoro">
      <div className="wrapper">
        <div className="ring" ref={ringElementRef}>
          <svg width="518" height="518" viewBox="0 0 518 518">
            <circle strokeWidth="9px" x="0" y="y" cx="259" cy="259" r="254" />
          </svg>
        </div>

        <Timer ringElementRef={ringElementRef} />
      </div>
    </div>
  );
}
