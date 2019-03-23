export const getRandomColor = () => {
	const colors = ["#29335C", "#E4572E", "#669BBC", "#A0CCDA"]
	return colors[Math.floor(Math.random() * 4)]
}

export const isMobile = width => {
	return /xs|sm/.test(width)
}

export const currency = number => {
	return `$${number}`
}
