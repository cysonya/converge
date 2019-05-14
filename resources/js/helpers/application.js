export const getRandomColor = () => {
	const colors = ["#29335C", "#E4572E", "#669BBC", "#A0CCDA"]
	return colors[Math.floor(Math.random() * 4)]
}

export const isMobile = width => {
	return /xs|sm/.test(width)
}

export const currency = function(number, options) {
	try {
		var options = options || {}
		var precision = options["precision"] || 0
		var unit = "$"
		var separator = precision > 0 ? options["separator"] || "." : ""
		var delimiter = options["delimiter"] || ","
		// var taxRate = options.taxRate || 0
		// var includeVat = options.includeVat || false

		// if (includeVat) {
		// 	number = number * (taxRate / 100.0 + 1.0)
		// }

		var parts = parseFloat(number)
			.toFixed(precision)
			.split(".")
		if (precision > 0) {
			return (
				unit +
				withDelimiter(parts[0], delimiter) +
				separator +
				parts[1].toString()
			)
		} else {
			return unit + withDelimiter(parts[0], delimiter)
		}
	} catch (e) {
		return unit + number
	}
}

export const withDelimiter = function(number, delimiter, separator) {
	try {
		var delimiter = delimiter || ","
		var separator = separator || "."

		var parts = number.toString().split(".")
		parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter)
		return parts.join(separator)
	} catch (e) {
		return number
	}
}
