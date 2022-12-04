import GearImage from "~/app/assets/images/pomodoro/gear.svg";
import CheckImage from "~/app/assets/images/pomodoro/check.svg";

interface SettingsProps {
  handleReset: () => void;
  minutes: number;
  seconds: number;
}

export default function Settings(props: SettingsProps) {
  return (
    <button className="settings" onClick={props.handleReset}>
      <img
        src={
          props.minutes === 0 && props.seconds === 0 ? CheckImage : GearImage
        }
        alt="Settings"
      />
    </button>
  );
}
