
import setPrecision from "./setPrecision"

export default function decToFrac(decimal: number, atomic: number = 32) {

  let roundedDecimal = setPrecision(decimal);
  console.log(roundedDecimal);
  if (Math.floor(decimal) === decimal) {
    return [decimal, 0, 2];
  }
  let coef = roundedDecimal / Math.abs(roundedDecimal) 
  let newDecimal = Math.abs(roundedDecimal)
  let whole = Math.floor(newDecimal); 
  let rem = Math.abs(newDecimal - whole); 
  let candidates: number[][] = [];

  for (let denom = 2; denom <= atomic; denom = denom * 2) {
    for (let num = 1; num < atomic; num++) {
      let frac = num / denom;
      if (frac === rem) {
        candidates.push([num, denom]);
      }
    }
  }
  let numerators = candidates.map((x) => x[0]);
  let smallestNumerator = Math.min(...numerators);
  let result = [whole * coef, ...candidates[numerators.indexOf(smallestNumerator)]];
  return result; 
}