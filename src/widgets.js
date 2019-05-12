const leftPad = (number) => {
	const pad = `00${number}`;
	return pad.substring(pad.length - 2, pad.length);
}
export const FormatedTime = secs => {
    const minutes = parseInt(secs / 60, 10)
    const seconds = parseInt(secs % 60, 10)
    return `${minutes} : ${leftPad(seconds).toString()}`
  }
  