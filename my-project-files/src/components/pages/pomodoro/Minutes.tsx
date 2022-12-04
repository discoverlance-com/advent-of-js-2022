import styles from "~/app/routes/projects/day-1/global-day-1.module.css";

interface MinutesProps {
  value: string;
  updateMinutes: (minutes: string) => void;
  isTimerActive: boolean;
}

export default function Minutes(props: MinutesProps) {
  return (
    <div className={styles.minutes}>
      <input
        onChange={(event) => props.updateMinutes(event.target.value)}
        type="text"
        value={props.value}
        title="Must be valid minutes"
        disabled={props.isTimerActive}
        onBlur={(event) => {
          if (event.target.validity.patternMismatch) {
            event.target.value = "15";
          }
        }}
        pattern="[0-5]?[0-9]"
      />
    </div>
  );
}
