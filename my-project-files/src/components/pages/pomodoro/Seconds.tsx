interface SecondsProps {
  value: string;
}

export default function Seconds(props: SecondsProps) {
  return (
    <div className="seconds">
      <input type="text" value={props.value} disabled />
    </div>
  );
}
