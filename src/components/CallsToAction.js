import React from "react";
import PageTextBox from "./PageTextBox";
import EmailRegForm from "./EmailRegForm";

export default ({
                  crowdFundingText,
                  registerCtaText,
                  registerCtaSubText,
                  readBookUrl,
                  readBookText,
                }) => {
  return <>
    <PageTextBox text={crowdFundingText}
                 image="/v1597496828/site/stars-people_av6uaw.png"
                 imageAlt={crowdFundingText}/>

    <EmailRegForm mainText={registerCtaText} subText={registerCtaSubText}/>

    <PageTextBox text={readBookText}
                 link={readBookUrl}
                 image="/v1598015134/site/jonathan-borba-3eC5n6gHwe8-unsplash.png"
                 imageAlt={readBookText}/>
  </>;
};