import { get as _get } from "lodash";
import { css } from "styled-components";
import { colors, breakpoints } from "./common/themeDefaults";

export const FONT_FAMILY = "'Open Sans', sans-serif";
  //"'Frank Ruhl Libre', serif";

export const HEADING_FAMILY =  "'Open Sans', sans-serif";
  //"'Amatic SC', cursive";

const getBreakpintValue = (br, theme) => {
	let value;
	if (theme.global.deviceBreakpoints[br]) {
		const brName = theme.global.deviceBreakpoints[br],
			brData = theme.global.breakpoints[brName];

		if (brData && brData.value) {
			value = brData.value;
		}
		else if (!brData) {
			throw new Error(`no breakpoint data for: ${brName}`);
		}
	}
	else {
		throw new Error(`unknown breakpoint name: ${br}`);
	}
	return value;
};

export const breakpoint = (br, gt = false) =>
	(strings, ...interpolations) =>
		({ theme }) => {
			const brValue = getBreakpintValue(br, theme),
				cond = gt ? "min-width" : "max-width";

			return brValue ? css`
                @media screen and (${cond}: ${brValue}px) {
                    ${css(strings, ...interpolations)}
               }
            ` : "";
		};

const getFromTheme = (theme, path = null) => path ?
	_get(theme, path) :
	(path) => _get(theme, path);

export const getColor = (theme, color) => color ?
	getFromTheme(theme, `global.colors.${color}`) :
	(color) => getFromTheme(theme, `global.colors.${color}`);

const getBorderSize = (theme, size) => size ?
	getFromTheme(theme, `global.borderSize.${size}`) :
	(size) => getFromTheme(theme, `global.borderSize.${size}`);

const throwUnknownColor = (name) => {
  throw new Error(`unknown color name: ${name}`);
};

export const color = (name, style = "color") =>
	(/*strings, ...interpolations*/) =>
		({ theme }) => {
			if (!theme.global.colors[name] && name.indexOf("#") && !~name.indexOf(".")) {
				throwUnknownColor(name);
			}

			const value = !name.indexOf("#") ? name : getColor(theme, name);

			if (!value) {
        throwUnknownColor(name);
      }

			style = style === "bg" ? "background-color" : style;

			return style === false ? value :
				css`${style}: ${value};`;
		};

export const border = ({ color, style, size, valOnly } = {}) =>
	(strings) =>
		({ theme }) => {
			let borders = [];

			const colorGetter = getColor(theme),
				borderSizeGetter = getBorderSize(theme);

			style = style || "solid";
			color = (color ? (colorGetter(color) ? colorGetter(color) : color) : null) || colorGetter("border.light");
			size = (size ? (borderSizeGetter(size) ? borderSizeGetter(size) : size) : null) || borderSizeGetter("xsmall");

			if (!valOnly) {
				if (strings && strings.length) {
					borders = strings[0].split(" ").map((s) => `border-${s}`);
				}
				else {
					borders.push("border");
				}
			}

			const bValue = `${size} ${style} ${color}`;

			return valOnly ?
				bValue :
				css`${borders.map((b) => `${b}:${bValue};`)}`;
		};

export const fontFamily = `font-family: ${FONT_FAMILY};`;
export const headingFamily = `font-family: ${HEADING_FAMILY};`;

export default {
	button: {
		border: {
			radius: "4px",
			// color: "status-critical",
		},
		padding: {
			vertical: "4px",
		}
	},
	global: {
		colors,
		breakpoints,
		deviceBreakpoints: {
			wide: "wide",
			"s-phone": "xsmall",
			"xs-phone": "xxsmal",
		},
		font: {
			family: FONT_FAMILY,
			headingFamily: HEADING_FAMILY,
			size: "1rem",
		}
	},
	heading: {
		font: {
			family: HEADING_FAMILY,
		}
	},
	select: {
		color: "black",
		// background: "brand-bg-dark",
		font: {
			family: HEADING_FAMILY
		},
		options: {
			container: {
				// background: "brand-bg",
				font: {
					family: HEADING_FAMILY
				}
			},
			text: {
				color: "brand-dark",
				font: {
					family: HEADING_FAMILY
				}
			}
		}
	}
};
