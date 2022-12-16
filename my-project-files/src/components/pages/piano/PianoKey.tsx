import { useCallback } from "react";
import { pianoKeys } from "~/app/lib/piano/keys";
import classes from "~/app/routes/projects/day-3/day-3.module.css";

type PianoKey = typeof pianoKeys[0];

interface PianoKeyProps extends PianoKey {}

export default function PianoKey(props: PianoKeyProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      const audio = new Audio(`projects/piano/audio/${props.audio}`);
      audio.play();
    },
    []
  );
  return (
    <a href="#" onClick={handleClick}>
      <path className={classes[props.className]} d={props.path} />
    </a>
  );
}
