import { useState } from 'react';
import './App.css';
import Setup from './Setup';
import type { Configuration, Format, InputInfo, Unit } from './types';
import fracToDec from './functions/fracToDec';
import raiseTwo from './functions/raiseTwo';
import DecimalInput from './DecimalInput';
import FractionalInput from './FractionalInput';
import Qty from 'js-quantities';
import decToFrac from './functions/decToFrac';

function App() {
  const [wasPressed, setWasPressed] = useState(false);
  const [inputUnit, setInputUnit] = useState<Unit>('mm');
  const [inputFormat, setInputFormat] = useState<Format>('decimal');
  const [outputConfiguration, setOutputConfiguration] =
    useState<Configuration>('matchInput');
  const [outputUnit, setOutputUnit] = useState<Unit>('mm');
  const [outputFormat, setOutputFormat] = useState<Format>('decimal');
  const [openingWidth, setOpeningWidth] = useState<InputInfo>({
    value: 0,
    whole: 0,
    numerator: 0,
    denominator: 2,
    unit: inputUnit,
  });
  const [openingHeight, setOpeningHeight] = useState<InputInfo>({
    value: 0,
    whole: 0,
    numerator: 0,
    denominator: 2,
    unit: inputUnit,
  });
  const [tenonLength, setTenonLength] = useState<InputInfo>({
    value: 0,
    whole: 0,
    numerator: 0,
    denominator: 2,
    unit: inputUnit,
  });
  const [stileWidth, setStileWidth] = useState<InputInfo>({
    value: 0,
    whole: 0,
    numerator: 0,
    denominator: 2,
    unit: inputUnit,
  });
  const [gap, setGap] = useState<InputInfo>({
    value: 0,
    whole: 0,
    numerator: 0,
    denominator: 2,
    unit: inputUnit,
  });
  const getStileCut = () => {
    let gapQuantity = Qty(gap.value, inputUnit);
    let fullGap = gapQuantity.mul(2);
    let heightQuantity = Qty(openingHeight.value, inputUnit);
    let difference = heightQuantity.sub(fullGap);
    if (outputUnit !== inputUnit) {
      let conversion = difference.to(outputUnit);
      return conversion;
    } else {
      return difference;
    }
  };
  const getRailCut = () => {
    let tenonQuantity = Qty(tenonLength.value, inputUnit);
    let fullTenonLength = tenonQuantity.mul(2);
    let stileWidthQuantity = Qty(stileWidth.value, inputUnit);
    let fullStileWidth = stileWidthQuantity.mul(2);
    let gapQuantity = Qty(gap.value, inputUnit);
    let fullGap = gapQuantity.mul(2);
    let minuend = Qty(openingWidth.value, inputUnit).add(fullTenonLength);
    let subtrahend = fullStileWidth.add(fullGap);
    let difference = minuend.sub(subtrahend);
    if (outputUnit !== inputUnit) {
      let conversion = difference.to(outputUnit);
      return conversion;
    } else {
      return difference;
    }
  };
  const badge = () => {
    return <span className="badge">{inputUnit}</span>;
  };
  const displayStileCut = () => {
    let cutLength = getStileCut();

    if (outputFormat === 'decimal') {
      return cutLength.toString();
    } else {
      let fractionArr = decToFrac(cutLength.scalar);
      let whole = fractionArr[0] > 0 ? `${fractionArr[0]}` : '';
      let frac =
        fractionArr[1] > 0 ? `${fractionArr[1]}/${fractionArr[2]}` : '';
      return (
        <>
          {whole} {frac} {badge()}
        </>
      );
    }
  };
  const displayRailCut = () => {
    let cutLength = getRailCut();
    if (outputFormat === 'decimal') {
      return cutLength.toString();
    } else {
      let fractionArr = decToFrac(cutLength.scalar);
      let whole = fractionArr[0] > 0 ? `${fractionArr[0]}` : '';
      let frac =
        fractionArr[1] > 0 ? `${fractionArr[1]}/${fractionArr[2]}` : '';
      return (
        <>
          {whole} {frac} {badge()}
        </>
      );
    }
  };

  const handleOpeningWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fractionArray = decToFrac(parseFloat(e.target.value));
    setOpeningWidth({
      value: parseFloat(e.target.value),
      whole: fractionArray[0],
      numerator: fractionArray[1],
      denominator: fractionArray[2],
      unit: inputUnit,
    });
  };
  const handleOpeningWidthWholeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newWhole = parseFloat(e.target.value);
    let remainder = openingWidth.value - Math.floor(openingWidth.value);
    let newValue = newWhole + remainder;
    setOpeningWidth({
      value: newValue,
      whole: newWhole,
      numerator: openingWidth.numerator,
      denominator: openingWidth.denominator,
      unit: inputUnit,
    });
  };
  const handleOpeningWidthNumeratorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newNumerator = parseInt(e.target.value);
    let newValue = fracToDec(
      openingWidth.whole,
      newNumerator,
      openingWidth.denominator
    );
    setOpeningWidth({
      value: newValue,
      whole: openingWidth.whole,
      numerator: newNumerator,
      denominator: openingWidth.denominator,
      unit: inputUnit,
    });
  };
  const handleOpeningWidthDenominatorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let newDenominator = parseInt(e.target.value);
    let newValue = fracToDec(
      openingWidth.whole,
      openingWidth.numerator,
      newDenominator
    );
    setOpeningWidth({
      value: newValue,
      whole: openingWidth.whole,
      numerator: openingWidth.numerator,
      denominator: newDenominator,
      unit: inputUnit,
    });
  };

  const handleOpeningHeightChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = parseFloat(e.target.value);
    const fractionArray = decToFrac(newValue);
    setOpeningHeight({
      value: newValue,
      whole: fractionArray[0],
      numerator: fractionArray[1],
      denominator: fractionArray[2],
      unit: inputUnit,
    });
  };
  const handleOpeningHeightWholeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newWhole = parseFloat(e.target.value);
    let remainder = openingHeight.value - Math.floor(openingHeight.value);
    let newValue = newWhole + remainder;
    setOpeningHeight({
      value: newValue,
      whole: newWhole,
      numerator: openingHeight.numerator,
      denominator: openingHeight.denominator,
      unit: inputUnit,
    });
  };
  const handleOpeningHeightNumeratorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newNumerator = parseInt(e.target.value);
    let newValue = fracToDec(
      openingHeight.whole,
      newNumerator,
      openingHeight.denominator
    );
    setOpeningHeight({
      value: newValue,
      whole: openingHeight.whole,
      numerator: newNumerator,
      denominator: openingHeight.denominator,
      unit: inputUnit,
    });
  };
  const handleOpeningHeightDenominatorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let newDenominator = parseFloat(e.target.value);
    let newValue = fracToDec(
      openingHeight.whole,
      openingHeight.numerator,
      newDenominator
    );
    setOpeningHeight({
      value: newValue,
      whole: openingHeight.whole,
      numerator: openingHeight.numerator,
      denominator: newDenominator,
      unit: inputUnit,
    });
  };
  const handleTenonLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);
    const fractionArray = decToFrac(newValue);
    setTenonLength({
      value: newValue,
      whole: fractionArray[0],
      numerator: fractionArray[1],
      denominator: fractionArray[2],
      unit: inputUnit,
    });
  };
  const handleTenonLengthWholeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newWhole = parseFloat(e.target.value);
    let remainder = tenonLength.value - Math.floor(tenonLength.value);
    let newValue = newWhole + remainder;
    setTenonLength({
      value: newValue,
      whole: newWhole,
      numerator: tenonLength.numerator,
      denominator: tenonLength.denominator,
      unit: inputUnit,
    });
  };
  const handleTenonLengthNumeratorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newNumerator = parseInt(e.target.value);
    let newValue = fracToDec(
      tenonLength.whole,
      newNumerator,
      tenonLength.denominator
    );
    setTenonLength({
      value: newValue,
      whole: tenonLength.whole,
      numerator: newNumerator,
      denominator: tenonLength.denominator,
      unit: inputUnit,
    });
  };
  const handleTenonLengthDenominatorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let newDenominator = parseFloat(e.target.value);
    let newValue = fracToDec(
      tenonLength.whole,
      tenonLength.numerator,
      newDenominator
    );
    setTenonLength({
      value: newValue,
      whole: tenonLength.whole,
      numerator: tenonLength.numerator,
      denominator: newDenominator,
      unit: inputUnit,
    });
  };

  const handleStileWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);
    const fractionArray = decToFrac(newValue);
    setStileWidth({
      value: newValue,
      whole: fractionArray[0],
      numerator: fractionArray[1],
      denominator: fractionArray[2],
      unit: inputUnit,
    });
  };
  const handleStileWidthWholeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newWhole = parseFloat(e.target.value);
    let remainder = stileWidth.value - Math.floor(stileWidth.value);
    let newValue = newWhole + remainder;
    setStileWidth({
      value: newValue,
      whole: newWhole,
      numerator: stileWidth.numerator,
      denominator: stileWidth.denominator,
      unit: inputUnit,
    });
  };
  const handleStileWidthNumeratorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newNumerator = parseInt(e.target.value);
    let newValue = fracToDec(
      stileWidth.whole,
      newNumerator,
      stileWidth.denominator
    );
    setStileWidth({
      value: newValue,
      whole: stileWidth.whole,
      numerator: newNumerator,
      denominator: stileWidth.denominator,
      unit: inputUnit,
    });
  };
  const handleStileWidthDenominatorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let newDenominator = parseFloat(e.target.value);
    let newValue = fracToDec(
      stileWidth.whole,
      stileWidth.numerator,
      newDenominator
    );
    setStileWidth({
      value: newValue,
      whole: stileWidth.whole,
      numerator: stileWidth.numerator,
      denominator: newDenominator,
      unit: inputUnit,
    });
  };

  const handleGapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);
    const fractionArray = decToFrac(newValue);
    setGap({
      value: newValue,
      whole: fractionArray[0],
      numerator: fractionArray[1],
      denominator: fractionArray[2],
      unit: inputUnit,
    });
  };
  const handleGapWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newWhole = parseFloat(e.target.value);
    let remainder = gap.value - Math.floor(gap.value);
    let newValue = newWhole + remainder;
    setGap({
      value: newValue,
      whole: newWhole,
      numerator: gap.numerator,
      denominator: gap.denominator,
      unit: inputUnit,
    });
  };
  const handleGapNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newNumerator = parseInt(e.target.value);
    let newValue = fracToDec(gap.whole, newNumerator, gap.denominator);
    setGap({
      value: newValue,
      whole: gap.whole,
      numerator: newNumerator,
      denominator: gap.denominator,
      unit: inputUnit,
    });
  };
  const handleGapDenominatorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let newDenominator = parseFloat(e.target.value);
    let newValue = fracToDec(gap.whole, gap.numerator, newDenominator);
    setGap({
      value: newValue,
      whole: gap.whole,
      numerator: gap.numerator,
      denominator: newDenominator,
      unit: inputUnit,
    });
  };
  const handleInputUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newUnit: Unit = e.target.value === 'mm' ? 'mm' : 'inch';
    setInputUnit(newUnit);
    if (outputConfiguration === 'matchInput') {
      setOutputUnit(newUnit);
    }
    setOpeningWidth({
      value: openingWidth.value,
      whole: openingWidth.whole,
      numerator: openingWidth.numerator,
      denominator: openingWidth.denominator,
      unit: newUnit,
    });
    setOpeningHeight({
      value: openingHeight.value,
      whole: openingHeight.whole,
      numerator: openingHeight.numerator,
      denominator: openingHeight.denominator,
      unit: newUnit,
    });
    setTenonLength({
      value: tenonLength.value,
      whole: tenonLength.whole,
      numerator: tenonLength.numerator,
      denominator: tenonLength.denominator,
      unit: newUnit,
    });
    setStileWidth({
      value: stileWidth.value,
      whole: stileWidth.whole,
      numerator: stileWidth.numerator,
      denominator: stileWidth.denominator,
      unit: newUnit,
    });
    setGap({
      value: gap.value,
      whole: gap.whole,
      numerator: gap.numerator,
      denominator: gap.denominator,
      unit: newUnit,
    });
  };
  const handleInputFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'decimal') {
      setInputFormat('decimal');
      if (outputConfiguration === 'matchInput') {
        setOutputFormat('decimal');
      }
    } else {
      setInputFormat('fractional');
      if (outputConfiguration === 'matchInput') {
        setOutputFormat('fractional');
      }
    }
  };
  const handleOutputConfigurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === 'matchInput') {
      setOutputConfiguration('matchInput');
      setOutputFormat(inputFormat);
      setOutputUnit(inputUnit);
    } else {
      setOutputConfiguration('custom');
    }
  };
  const handleOutputFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (outputConfiguration === 'matchInput') {
      if (outputFormat === inputFormat) {
        return;
      } else {
        setOutputFormat(inputFormat);
        return;
      }
    }
    if (e.target.value === 'decimal') {
      setOutputFormat('decimal');
    } else if (e.target.value === 'fractional') {
      setOutputFormat('fractional');
    }
  };
  const handleOutputUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (outputConfiguration === 'matchInput') {
      setOutputUnit(inputUnit);
      return;
    } else {
      let newValue: Unit = e.target.value === 'mm' ? 'mm' : 'inch';
      setOutputUnit(newValue);
      return;
    }
  };
  const decimalInputs = (
    <>
      <DecimalInput
        name="openingWidth"
        label="Opening Width"
        inputInfo={openingWidth}
        onChange={handleOpeningWidthChange}
      />
      <DecimalInput
        name="openingHeight"
        label="Opening Height"
        inputInfo={openingHeight}
        onChange={handleOpeningHeightChange}
      />
      <DecimalInput
        name="tenonLength"
        label="Tenon Length"
        inputInfo={tenonLength}
        onChange={handleTenonLengthChange}
      />
      <DecimalInput
        name="stileWidth"
        label="Stile Width"
        inputInfo={stileWidth}
        onChange={handleStileWidthChange}
      />
      <DecimalInput
        name="gap"
        label="Gap"
        inputInfo={gap}
        onChange={handleGapChange}
      />
    </>
  );
  const fractionalInputs = (
    <>
      <FractionalInput
        name="openingWidth"
        label="Opening Width"
        inputInfo={openingWidth}
        onWholeChange={handleOpeningWidthWholeChange}
        onNumeratorChange={handleOpeningWidthNumeratorChange}
        onDenominatorChange={handleOpeningWidthDenominatorChange}
      />
      <FractionalInput
        name="openingHeight"
        label="Opening Height"
        inputInfo={openingHeight}
        onWholeChange={handleOpeningHeightWholeChange}
        onNumeratorChange={handleOpeningHeightNumeratorChange}
        onDenominatorChange={handleOpeningHeightDenominatorChange}
      />
      <FractionalInput
        name="tenonLength"
        label="Tenon Length"
        inputInfo={tenonLength}
        onWholeChange={handleTenonLengthWholeChange}
        onNumeratorChange={handleTenonLengthNumeratorChange}
        onDenominatorChange={handleTenonLengthDenominatorChange}
      />
      <FractionalInput
        name="stileWidth"
        label="Stile Width"
        inputInfo={stileWidth}
        onWholeChange={handleStileWidthWholeChange}
        onNumeratorChange={handleStileWidthNumeratorChange}
        onDenominatorChange={handleStileWidthDenominatorChange}
      />
      <FractionalInput
        name="gap"
        label="Gap"
        inputInfo={gap}
        onWholeChange={handleGapWholeChange}
        onNumeratorChange={handleGapNumeratorChange}
        onDenominatorChange={handleGapDenominatorChange}
      />
    </>
  );

  return (
    <>
    <div className="body">
      <section className="setup-box">
        <Setup
          inputUnit={inputUnit}
          handleInputUnitChange={handleInputUnitChange}
          inputFormat={inputFormat}
          handleInputFormatChange={handleInputFormatChange}
          outputConfiguration={outputConfiguration}
          handleOutputConfigurationChange={handleOutputConfigurationChange}
          outputUnit={outputUnit}
          handleOutputUnitChange={handleOutputUnitChange}
          outputFormat={outputFormat}
          handleOutputFormatChange={handleOutputFormatChange}
        />
      </section>
      <section className="input-box">
        <fieldset className="input-field">
          <legend className="section-header">Inputs</legend>
          {inputFormat === 'decimal' ? decimalInputs : fractionalInputs}
        </fieldset>
        <button
          onClick={() => {
            setWasPressed(true);
          }}
        >
          Update Cuts
        </button>
      </section>
      <section className="results">
      <fieldset>
        <legend className="main-title">Stile Cut</legend>
        <p>
          {wasPressed === true
            ? displayStileCut()
            : 'Press the button to see your results'}
        </p>
      </fieldset>
      <fieldset>
        <legend className="main-title">Rail Cut</legend>
        <p>
          {wasPressed === true
            ? displayRailCut()
            : 'Press the button to see your results'}
        </p>
      </fieldset>
      </section>
      </div>
    </>
  );
}

export default App;
