import setPrecision from './setPrecision';
export default function fracToDec(
  whole: number,
  numerator: number,
  denominator: number
) {
  let float = numerator / denominator;
  let sum = whole + float;
  return setPrecision(sum);
}
