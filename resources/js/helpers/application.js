export const getRandomColor = () => {
	const colors = [
		"#F3A712",
		"#29335C",
		"#E4572E",
		"#669BBC",
		"#6F1D1B",
		"#A0CCDA"
	]
	return colors[Math.floor(Math.random() * 6)]
}

export const isMobile = width => {
	return /xs|sm/.test(width)
}
