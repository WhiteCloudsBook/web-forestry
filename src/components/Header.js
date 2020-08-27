import React from "react";
import styled from "styled-components";
import useSiteMetadata from "./useSiteMetadata";
import { breakpoint } from "../theme";
import { Link } from "gatsby";
import Image from "./Image";

const Header = styled.header`
  
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
	height: 40px;
	display: block;
  border-radius: 50%;
  border: 1px solid #000;
    
	img {
		width: 100%;
		height: auto;	
	}
`;

export default ({ image }) => {
  const { logo } = useSiteMetadata();

  return <Header>
    <Logo>
      <Link to="/">
        <Image path={logo} alt="logo" />
      </Link>
    </Logo>
  </Header>;
};