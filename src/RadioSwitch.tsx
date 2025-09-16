import type { RadioSwitchProps } from './types';

export default function RadioSwitch({
  name,
  label,
  options,
  value,
  onChange,
}: RadioSwitchProps ) {

  const optionSet = options.map(
    op => {
    return(
    <>
    <label>
      <input
        type="radio"
        name={name}
        value={op.value}
        checked={value === op.value}
        onChange={(e) => onChange(e)}
      />
      {op.label}
    </label>
    </>
    )})
  return (
    <fieldset className="field">
      <legend>{label}</legend>
      {optionSet}
    </fieldset>
  );
}
