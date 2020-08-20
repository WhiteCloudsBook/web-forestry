import React from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";
import { color, border, breakpoint } from "../theme";
import useSiteMetadata from "./useSiteMetadata";
import Image from "./Image";
import SocialLinks from "./SocialLinks";

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  ${color("page-bg", "background-color")}
  ${border()`top`}
`;

const BottomSection = styled.div`
  display: flex;

  ${color("brand-bg-dark", "background-color")}
  height: 45px;
  flex-grow: 0;
  align-items: flex-end;
  padding: 0 4px;
`;

const Rights = styled.span`
  color: #fff;
  font-size: 12px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  position:relative;
  justify-content: space-between;
  padding: 10px 4px;
`;

const FooterContent = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  ${breakpoint("phone")`
    flex-direction: column;
    margin-bottom: 10px;
  `}
`;

const bottomSectionMixin = css`
  //flex-grow: 1;
  //width: 30%;
  display: flex;

  ${breakpoint("phone")`
    width: 100%;
    justify-content: center;
    margin-bottom: 25px;
  `}
`;

const Logo = styled.div`
  ${bottomSectionMixin}

	height: 100%;
	display: block;

	${breakpoint("phone")`
		display: flex;
		justify-content: center;
	`}

	img {
		max-width: 100px;
		height: auto;

		${breakpoint("phone")`
		  width: 80px;
		`}
	}
`;

const FooterSocialLinks = styled(SocialLinks)`
  ${bottomSectionMixin}
  max-width: 200px;
  
   ${breakpoint("phone")`
    justify-content: space-evenly;
  `}
`;

export default () => {
  const { logo } = useSiteMetadata();

  return <Footer>
    <MainSection>
      <FooterContent>
        <FooterSocialLinks />
        <Logo>
          <Link to="/">
            <Image path={logo} alt="logo" />
          </Link>
        </Logo>
      </FooterContent>
    </MainSection>
    <BottomSection>
      <Rights>All rights reserved, Yoav Niran - {new Date().getFullYear()}.</Rights>
    </BottomSection>
  </Footer>;
};