import { createGlobalStyle } from "styled-components";
import { breakpoint, color, border } from "../theme";

const GlobalStyles = createGlobalStyle`

	html {
		background-color: white;
		overflow-x: hidden;
		overflow-y: scroll;
		text-rendering: optimizeLegibility;
		font-size: 18px;
		box-sizing: border-box;
		margin: 0;
		padding: 0;

		${breakpoint("tablet")`
			font-size:16px;
		`}

		${breakpoint("phone")`
			font-size:14px;
		`}
	}

	body {
  		//font-family: 'Frank Ruhl Libre', serif;
    font-family: 'Open Sans', sans-serif;
		line-height: 1.5;
		${color("page-bg", "bg")}
		${color("text.light")}
    	margin: 0;
    	padding: 0;
	}

	*, *::before, *::after {
		box-sizing: inherit;
	}

	article,
	aside,
	figure,
	footer,
	header,
	hgroup,
	section {
		display: block;
	}

	a {
		text-decoration: none;
		cursor: pointer

		&:hover {
			${color("brand")}
		}

		// ${breakpoint("phone")`
		// 	text-decoration: underline;
		// `}
	}

	img {
  		height: auto;
  		max-width: 100%;
	}

	span {
  		font-style: inherit;
  		font-weight: inherit;
	}

	h1, h2, h3, h4 {
  		font-weight: bold;
  		margin: 1rem 0 0.5rem 0;
  		padding: 0;
	}

	h2 {
		margin: 1.2rem 0 0.6rem 0;
	}

	h1 {
  		font-size: 2.2rem;
	}

	h2 {
  		font-size: 1.7rem;
	}

	h3{
		font-size: 1.4rem;
	}

	h4{
		font-size: 1.2rem;
	}

	ul, ol {
  		margin-block-start: 0;
  		margin-block-end: 0;
	}


	section {
  		display: flex;
  		padding: 0 20px;
		  ${breakpoint("s-phone")`
		  	padding: 0 5px;
		  `}
	}

	hr {
		${border({ style: "dotted" })}
	}

	// blockquote {
	// 	
	// 	padding: 10px;
	// 	font-style: italic;
  //
	// 	p:first-of-type {
	// 		::before {
	// 			content: '”';
	// 			position: relative;
	// 			font-weight: bold;
	// 		}
	// 	}
  //
	// 	p:last-of-type {
	// 		::after {
	// 			content: '“';
	// 			position: relative;
	// 			font-weight: bold;
	// 		}
	// 	}
	// }
`;

export default GlobalStyles;
