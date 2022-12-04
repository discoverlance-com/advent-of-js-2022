interface MinutesProps {
  value: string;
}

export default function Minutes(props: MinutesProps) {
  return (
    <div className="minutes">
      <input type="text" value={props.value} disabled />
    </div>
  );
}
