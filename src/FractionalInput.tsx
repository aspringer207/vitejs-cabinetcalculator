import raiseTwo from './functions/raiseTwo';
import type { FractionalInputProps } from './types';

export default function FractionalInput({name, label, inputInfo, onWholeChange, onNumeratorChange, onDenominatorChange}: FractionalInputProps)  {
  return (
    <fieldset className="fraction-box">
      <legend> {label} </legend>
      <input
        id={name.concat('-whole')}
        className="whole"
        type="number"
        step="1"
        min="0"
        value={inputInfo.whole}
        onChange={onWholeChange}
      />
      <div className="fraction">
      <input
        id={name.concat('-numerator')}
        className="numerator"
        type="number"
        step="1"
        value={inputInfo.numerator}
        min="0"
        max="32"
        onChange={onNumeratorChange}
      />
      <select
        id={name.concat('-denominator')}
        className="denominator"
        value={inputInfo.denominator}
        onChange={(e) => {
          onDenominatorChange(e);
        
        }}
      >
        <option value="2">
          2
        </option>
        <option value="4">
          4
        </option>
        <option value="8">
          8
        </option>
        <option value="16">
          16
        </option>
        <option value="32">
          32
        </option>
      </select>
      </div>
    </fieldset>
  );
}
