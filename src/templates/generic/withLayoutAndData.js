import React from "react";
import isFunction from "lodash/isFunction";
import useSiteMetadata from "../../components/useSiteMetadata"
import Layout from "../../components/Layout";
import { fixBannerPath, getImageUrl } from "../../common/imageUrl";

export const getPropsForPage = ({ data }) => ({
  page: {
    ...data.markdownRemark.frontmatter,
    html: data.markdownRemark.html
  },
});

export default (converterFn, layoutProps, children, options) =>
	(Component) =>
		(props) => {
      const { cloudinaryBase } = useSiteMetadata();
			const pageProps = converterFn ? converterFn(props) : getPropsForPage(props);

			layoutProps = layoutProps ? (isFunction(layoutProps) ? layoutProps(pageProps) : layoutProps) : {};

			const { ogTags, ...restLayout } = layoutProps;

			pageProps.page.banner = fixBannerPath(pageProps.page.banner); //"/" + pageProps.page.banner.replace(/\.\.\//g, "");

			return <Layout title={pageProps.page.title}
				ogTags={{
					title: pageProps.page.title,
					description: pageProps.page.description,
					image: getImageUrl(cloudinaryBase, pageProps.page.banner, 600, true),
					url: pageProps.page.path,
					...ogTags,
				}} {...restLayout}>
				<Component {...pageProps} data={props.data} options={options}>
					{isFunction(children) ? children(pageProps, options) : children}
				</Component>
			</Layout>;
		};
