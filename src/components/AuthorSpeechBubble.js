import React from "react";
import styled from "styled-components";
import { pageWidthCss } from "../common/styles";
import { HTMLContent } from "./Content";
import AuthorPhoto from "./AuthorPhoto";
import { color, border } from "../theme";
import withModalTrigger from "./hocs/withModalTrigger";
import AuthorBio from "./AuthorBio";

const BubbleContainer = styled.section`
  ${pageWidthCss}
   display: flex;
   align-items: center;
   margin: 20px 0;
`;

const SpeechBubble = styled.div`
  position: relative;
  ${color("overlay-bg-transparent", "bg")}
  ${border}
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;    
  width: calc(100% - 80px);
  margin-left: 30px;
  font-style: italic;
  
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 25px solid transparent;
    ${color("overlay-bg-transparent", "border-right-color")}
    border-left: 0;
    border-top: 0;
    margin-top: -8px;
    margin-left: -25px;
  }
  
  p {
    margin: 0;
  }
`;

const AuthorPhotoWithBio = withModalTrigger(AuthorBio)(AuthorPhoto);

export default ({ children, text }) => {
  return <BubbleContainer>
    <AuthorPhotoWithBio/>
    <SpeechBubble>
      {children ?
        children :
        <HTMLContent content={text}/>}
    </SpeechBubble>
  </BubbleContainer>;
};