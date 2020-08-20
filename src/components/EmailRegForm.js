/* eslint no-console: 0 */
import React, { useContext, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Button, ThemeContext, Heading } from "grommet";
import { FormClose } from "grommet-icons/index";
import Modal from "react-modal";
import ReCaptcha from "react-google-recaptcha";
import { breakpoint, getColor } from "../theme";
import { pageWidthCss } from "../common/styles";
import { NotificationContext } from "./Notifications/NotificationProvider";
import PageSeparator from "./PageSeparator";

Modal.setAppElement("#___gatsby");

//TODO: save name to local storage so can be shown instead of form
//TODO: dont show name (replacement) if flag is false

const REGISTERED_KEY = "__wcb_reg_mail";

const isDev = process.env.NODE_ENV === "development";

const getIsRegistered = () => {

	let registered = false;

	try {
		if (window && "localStorage" in window) {
			const stored = localStorage.getItem(REGISTERED_KEY);
			registered = !!stored;
		}
	}
	catch (ex) {
		if (isDev) {
			console.error("failed to get from local storage");
		}
	}

	return registered;
};

const setRegisterSuccess = () => {
	try {
		if ("localStorage" in window) {
			localStorage.setItem(REGISTERED_KEY, "true");
		}
	}
	catch (ex) {
		console.error("failed to store registered flag in local storage");
	}

	// navigate(navUrl);
};

const StyledForm = styled.form`
    display: ${({ hide }) => hide ? "none" : "flex"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FormRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 8px 0 12px;
`;

const FormRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
   justify-content: space-evenly;
   
  ${breakpoint("tablet", true)`
		flex-direction: row;
	`}
`;

const FormInput = styled.input`
    min-width: 300px;
    width: 70%;    
    margin-right: 20px;
    height: 46px;
    line-height: 40px;
    font-size: 36px;
`;

const CtaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  
  ${pageWidthCss}
`;

const encode = (data) => Object.keys(data)
	.map((key) =>
		`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
	.join("&");

const CloseButton = styled(FormClose)`
	cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
`;

const Form = ({ onSubmit, mainText, subText, onFieldChange, setRecaptchaValue, hide = false }) => <StyledForm
  name="contactlist"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  data-netlify-recaptcha="true"
  onSubmit={onSubmit}
  hide={hide}>

  <input type="hidden" name="form-name" value="contactlist"/>

  <br/>
  <h3>{mainText}</h3>
  <p>{subText}</p>

  <FormRowsContainer>
    <FormRow>
      <FormInput name="name" type="text" required
                 placeholder="Your name"
                 onChange={onFieldChange}/>
    </FormRow>

    <FormRow>
      <FormInput name="email" type="email" required
                 placeholder="your@email.com"
                 onChange={onFieldChange}/>
    </FormRow>
  </FormRowsContainer>

  <FormRow>
    <Button type="submit" primary label="Register"/>
  </FormRow>

  {!isDev && <ReCaptcha
    sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY || "xxxx"}
    onChange={setRecaptchaValue}/>}
</StyledForm>;

const RegCta = ({ showForm, mainText }) => <>
  <CtaContainer>
    {/*rendering dummy form for netlify to pick it up and create the submission integration*/}
    <Form hide/>
    <Heading level={3} size="small">{mainText}</Heading>
    <Button label="Register" onClick={showForm}/>
  </CtaContainer>
  <PageSeparator/>
</>;

const ModalForm = ({ show, onFieldChange, onSubmit, setRecaptchaValue, closeModal, mainText, subText }) => {
  const theme = useContext(ThemeContext);
  const [overlayRef, setOverlayRef] = useState();

  useEffect(() => {
    const onOverlayClick = (e) => {
      if (e.target.classList.contains("ReactModal__Overlay")) {
        closeModal();
      }
    };

    if (overlayRef) {
      overlayRef.addEventListener("click", onOverlayClick);
    }
    return () => {
      if (overlayRef) {
        overlayRef.removeEventListener("click", onOverlayClick);
      }
    };
  }, [overlayRef, closeModal]);

  return <Modal isOpen={show} overlayRef={setOverlayRef}
                style={{
                  content: {
                    top: "10px",
                    left: "10px",
                    right: "10px",
                    bottom: "10px",
                    backgroundColor: getColor(theme, "page-bg") },
                  overlay: { backgroundColor: getColor(theme, "overlay-bg") }
                }}
  >
    <CloseButton size="large" onClick={closeModal}/>
    <Form onSubmit={onSubmit} mainText={mainText} subText={subText} onFieldChange={onFieldChange} setRecaptchaValue={setRecaptchaValue} />
  </Modal>;
};

export default ({ mainText, subText }) => {
  const [isFormShowing, setIsFormShowing] = useState(false);
	const [fieldsState, setFields] = useState({ "name": "", "email": "" });
	const [recaptchaValue, setRecaptchaValue] = useState(null);
	const notificationContext = useContext(NotificationContext);

	const alreadyRegistered = getIsRegistered();

	const showForm = useCallback(()=>setIsFormShowing(true), []);

	const setError = useCallback((text) =>
		notificationContext.setNotification({
			isError: true,
			text,
		}), [notificationContext]);

  const closeModal = useCallback(() => {
    setIsFormShowing(false);
  }, [setIsFormShowing]);

  const setSuccess = useCallback(() => {
	  notificationContext.setNotification({
      text: "Successfully registered. Thank you."
    });

    closeModal();
    setRegisterSuccess();
  }, [notificationContext, closeModal]);

	const onFieldChange = useCallback((e) =>
		setFields({
			...fieldsState,
			[e.target.name]: e.target.value
		}), [fieldsState]);

	const onSubmit = useCallback((e) => {
    const form = e.target;

	  e.preventDefault();
		notificationContext.setNotification(null);

		if (!Object.values(fieldsState).find((f) => !f) && (isDev || recaptchaValue)) {
			if (isDev || ~document.location.host.indexOf("localhost")) {
        setSuccess();
			}
			else {
				fetch("/", {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: encode({
						...fieldsState,
						"g-recaptcha-response": recaptchaValue,
						"form-name": form.getAttribute("name"),
					}),
				})
					.then((response) => {
						if (response.status === 200 && !response.redirected) { //netlify doesnt give an error on recaptcha fail (only 303 redirect...) :(
              setSuccess();
						}
						else {
							console.log("!!!!!!!!!!! form server response: ", response);
							setError("An error occurred. Please try again");
						}
					})
					.catch(err => {
						console.log("!!!!!!!!! FORM ERROR ", err);
            setError("An error occurred. Please try again");
					});
			}
		}
		else {
      setError("Please fill all fields");
		}
	}, [setSuccess, setError, fieldsState, recaptchaValue, notificationContext]);

	return !alreadyRegistered ? <>
    <ModalForm show={isFormShowing}
               onFieldChange={onFieldChange}
               onSubmit={onSubmit}
               setRecaptchaValue={setRecaptchaValue}
               closeModal={closeModal}
               mainText={mainText}
               subText={subText}
    />
    {!isFormShowing ? <RegCta showForm={showForm} mainText={mainText} /> : null}
    </> : null;
};
