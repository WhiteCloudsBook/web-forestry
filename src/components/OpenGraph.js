import React from "react";
import Helmet from "react-helmet"
import useSiteMetadata from "./useSiteMetadata";

const makeValidUrl = (url, siteUrl) =>
	url.indexOf("http") ? `${siteUrl}${url}` : url;

const twitterTags = ["title", "description", "image"];

const isTwitterTag = (key) => !!~twitterTags.indexOf(key);

const hasColon = (name) => !!~name.indexOf(":");

const OpenGraph = ({ tags }) => {
	const { title, siteUrl, imageUrl, fbAppId, fbPageId } = useSiteMetadata();

	const defaultProps = {
		"type": "website",
		"site_name": title,
		"title": title,
		"url": siteUrl,
		image: imageUrl,
		// "fb:app_id": fbAppId,
		"fb:pages": fbPageId,
	};

	const ogTags = {
		...defaultProps,
		...tags
	};

	ogTags.url = ogTags.url ? makeValidUrl(ogTags.url, siteUrl) : siteUrl;
	ogTags.image = ogTags.image ? makeValidUrl(ogTags.image, siteUrl) : imageUrl;

	return <Helmet>
		{Object.entries(ogTags)
			.map(([name, content]) =>
				<meta key={name} property={hasColon(name) ? name : `og:${name}`} content={content} />)}

		<meta property="twitter:card" content="summary_large_image" />

		{Object.keys(ogTags)
			.filter((key) => isTwitterTag(key))
			.map((key) =>
				<meta key={`twitter:${key}`} property={`twitter:${key}`} content={ogTags[key]} />)}
	</Helmet>;
};

export default OpenGraph;
