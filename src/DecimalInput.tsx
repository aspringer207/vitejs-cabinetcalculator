import type { InputInfo } from "./types";

export default function DecimalInput({
  name,
  label,
  inputInfo,
  onChange
}: {
  name: string,
  label: string,
  inputInfo: InputInfo
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <fieldset className="inner">
      <legend>{label}</legend>
      <input id={"decimal-".concat(name)} type="number" value={inputInfo.value} onChange={onChange} />
    </fieldset>
  );
}
