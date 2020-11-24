// get date and time
export const getDate = () => {
	let currentDate = new Date();
	return `${currentDate.getDate()}/${(currentDate.getMonth() + 1)}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`
}
