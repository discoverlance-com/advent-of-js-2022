import styles from "~/app/routes/projects/day-1/global-day-1.module.css";

interface SecondsProps {
  value: string;
  updateSeconds: (seconds: string) => void;
  isTimerActive: boolean;
}

export default function Seconds(props: SecondsProps) {
  return (
    <div className={styles.seconds}>
      <input
        onChange={(event) => props.updateSeconds(event.target.value)}
        type="text"
        value={props.value}
        title="Must be valid seconds"
        disabled={props.isTimerActive}
        onBlur={(event) => {
          if (event.target.validity.patternMismatch) {
            console.log("pattern mismatch");
            event.target.value = "00";
          }
        }}
        pattern="[0-5]?[0-9]"
      />
    </div>
  );
}
