import React from "react";
import styled from "styled-components";
import { Heading } from "grommet";
import useSiteMetadata from "./useSiteMetadata";
import { color } from "../theme";
import { Link } from "gatsby";
import Image from "./Image";

const Header = styled.header`  
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  box-shadow: 0 -4px 2px ${color("border.light", false)} inset;
`;

const SiteTitle = styled(Heading)`
  margin: 0 8px 0 0;  
  ${color("white")}
`;

const Logo = styled.div`
	height: 40px;
	width: 40px;
	display: block;
  border-radius: 50%;
  box-shadow: 0 2px 2px ${color("border.light", false)};
   
	img {
		width: 100%;
		height: auto;	
	}
`;

export default () => {
  const { logo, title } = useSiteMetadata();

  return <Header>
    <Link to="/">
     <SiteTitle level={1} size="small">{title}</SiteTitle>
    </Link>
    <Logo>
      <Link to="/">
        <Image path={logo} alt="logo"/>
      </Link>
    </Logo>
  </Header>;
};