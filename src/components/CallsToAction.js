import React, { } from "react";
import PageTextBox from "./PageTextBox";
import EmailRegForm from "./EmailRegForm";

export default ({
                  crowdFundingText,
                  registerCtaText,
                  registerCtaSubText,
                  readBookUrl,
                  readBookText,
                }) => {

  // const bmcContainerRef = useRef(null);
  // const bmcSetRef = useRef(false);
  // useEffect(() => {
  //
  //   if (!bmcSetRef.current) {
  //     const bmcScript = document.createElement("script");
  //     bmcScript.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
  //     bmcScript.dataset["name"] = "bmc-button";
  //     bmcScript.dataset["slug"] = "yoav";
  //     bmcScript.dataset["color"] = "#BD5FFF";
  //     bmcScript.dataset["font"] = "Cookie";
  //     bmcScript.dataset["text"] = "Help me publish my book";
  //     bmcScript.dataset["outlineColor"] = "#000";
  //     bmcScript.dataset["fontColor"] = "#fff";
  //     bmcScript.dataset["coffeeColor"] = "#fd0";
  //
  //     bmcContainerRef.current.appendChild(bmcScript);
  //
  //     bmcSetRef.current = true;
  //   }
  //
  //   // <script type="text/javascript"
  //   //         src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
  //   //         data-name="bmc-button"
  //   //         data-slug="yoav"
  //   //         data-color="#BD5FFF"
  //   //         data-emoji=""
  //   //         data-font="Cookie"
  //   //         data-text="Help me publish my book"
  //   //         data-outline-color="#000"
  //   //         data-font-color="#fff"
  //   //         data-coffee-color="#fd0"/>
  // }, []);

  return <>
    <a href="https://www.buymeacoffee.com/yoav" target="_blank" rel="noreferrer">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee"
           style={{ height: "60px", width: "217px", marginTop: "20px" }}/>
    </a>

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
