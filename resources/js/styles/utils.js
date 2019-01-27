import styled, { css } from "styled-components"
import theme from "./theme"

// MEDIA BREAKPOINTS
// Constructor iterates through breakpoints and create a media template
/**
 * Creates min-width media queries. Types are pulled from theme.media
 * @param  {string} Media query contents (usually done with an eval `` statement)
 * @example
 * media.md`
 *   display: none;
 * `
*/
let media = Object.keys(theme.breakpoints.values).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.breakpoints.values[label] / 16}em) {
      ${css(...args)};
    }
  `
  return acc
}, {})

export { media }