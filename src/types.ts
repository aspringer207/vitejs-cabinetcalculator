export declare type Unit = 'mm' | 'inch';
export declare type Format = 'decimal' | 'fractional';
export declare type Configuration = 'matchInput' | 'custom';
export declare type InputInfo = {
  value: number;
  whole: number;
  numerator: number;
  denominator: number;
  unit: Unit;
};
export declare type FractionalInputProps = {
  name: string;
  label: string;
  inputInfo: InputInfo;
  onWholeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumeratorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDenominatorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
export declare type Options = {
  label: string;
  value: string;
};
export declare type RadioSwitchProps = {
  name: string;
  label: string;
  options: Options[];
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
