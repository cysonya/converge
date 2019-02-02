import { getIn } from "formik"

const inputError = (form, name) => {
	const error = getIn(form.errors, name)
	const touch = getIn(form.touched, name)
	return touch && error ? error : false
}

export default inputError
