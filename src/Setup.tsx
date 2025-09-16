import RadioSwitch from './RadioSwitch';
import type { Configuration, Format, Unit } from './types';

export default function Setup({
  inputUnit,
  handleInputUnitChange,
  inputFormat,
  handleInputFormatChange,
  outputConfiguration,
  handleOutputConfigurationChange,
  outputUnit,
  handleOutputUnitChange,
  outputFormat,
  handleOutputFormatChange,
}: {
  inputUnit: Unit;
  handleInputUnitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputFormat: Format;
  handleInputFormatChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  outputConfiguration: Configuration;
  handleOutputConfigurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  outputUnit: Unit;
  handleOutputUnitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  outputFormat: Format;
  handleOutputFormatChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const configSwitch = (
    <RadioSwitch
      name="outputConfiguration"
      label="Configuration"
      options={[
        {
          value: 'matchInput',
          label: 'Match Input',
        },
        {
          value: 'custom',
          label: 'Custom',
        },
      ]}
      value={outputConfiguration}
      onChange={handleOutputConfigurationChange}
    />
  );
  const matchingOutput = (
    <fieldset className="setup-field">
      <legend>Output Setup</legend>
      {configSwitch}
    </fieldset>
  );
  const customOutput = (
    <fieldset className="setup-field">
      <legend>Output</legend>
      {configSwitch}
      <RadioSwitch
        name="outputUnit"
        label="Unit"
        options={[
          {
            value: 'mm',
            label: 'Millimeters',
          },
          {
            value: 'inch',
            label: 'Inch',
          },
        ]}
        value={outputUnit}
        onChange={handleOutputUnitChange}
      />
      <RadioSwitch
        name="outputFormat"
        label="Format"
        options={[
          {
            value: 'decimal',
            label: 'Decimal',
          },
          {
            value: 'fractional',
            label: 'Fractional',
          },
        ]}
        value={outputFormat}
        onChange={handleOutputFormatChange}
      />
    </fieldset>
  );

  return (
    <div className="setup">
      <fieldset className="setup-field">
        <legend>Input Setup</legend>
        <RadioSwitch
          name="inputUnit"
          label="Unit"
          options={[
            {
              value: 'mm',
              label: 'Millimeters',
            },
            {
              value: 'inch',
              label: 'Inches',
            },
          ]}
          value={inputUnit}
          onChange={handleInputUnitChange}
        />
        <RadioSwitch
          name="inputFormat"
          label="Format"
          options={[
            { value: 'decimal', label: 'Decimal' },
            { value: 'fractional', label: 'Fractional' },
          ]}
          value={inputFormat}
          onChange={handleInputFormatChange}
        />
      </fieldset>

      {outputConfiguration === 'matchInput' ? matchingOutput : customOutput}
    </div>
  );
}
