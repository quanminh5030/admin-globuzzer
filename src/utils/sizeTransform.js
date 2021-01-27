// transform file size for displaying in bits, Kb or Mb
export const sizeTransform = (value) => {
  if(value < 1000) {
    return `${value}bits`;
  } else if (value >= 1000 && value < 1000000) {
    return `${value/1000}Kb`;
  } else if (value >= 1000000 && value < 1000000000) {
    return `${value/1000000}Mb`;
  } else {
    return "the size is more than 1Gb"
  }
}