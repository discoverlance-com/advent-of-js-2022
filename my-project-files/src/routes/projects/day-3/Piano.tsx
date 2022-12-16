import PianoKey from "~/app/components/pages/piano/PianoKey";
import { pianoKeys } from "~/app/lib/piano/keys";
import classes from "./day-3.module.css";

export default function PianoProject() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.piano}>
        <svg
          width="1387"
          height="467"
          viewBox="0 0 1387 467"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {pianoKeys.map((item) => (
            <PianoKey {...item} key={item.audio} />
          ))}
        </svg>
      </div>
    </div>
  );
}
