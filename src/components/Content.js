import React from "react";
import { isString } from "lodash";
import PropTypes from "prop-types";

export const HTMLContent = React.forwardRef(({ content, className, elmType }, ref) => {
	return isString(content) ?
		React.createElement(elmType || "div", { className, ref, dangerouslySetInnerHTML: { __html: content } }) : //<div className={className} ref={ref} dangerouslySetInnerHTML={{ __html: content }} /> :
		React.createElement(elmType || "div", { className, ref }, content);
});

const Content = ({ content, className }) => (
	<div className={className}>{content}</div>
);

Content.propTypes = {
	content: PropTypes.node,
	className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
