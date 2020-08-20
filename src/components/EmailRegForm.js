import React, { useContext, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Button, ThemeContext } from "grommet";
import ReCaptcha from "react-google-recaptcha";
import { NotificationContext } from "./Notifications/NotificationProvider";
import { breakpoint, getColor } from "../theme";
import Modal from "react-modal";
import { FormClose } from "grommet-icons/index";

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

const Form = styled.form`
    display: flex;
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

const FormLabel = styled.label`
  margin-right: 6px;
`;

const FormInput = styled.input`
    width: 200px;
    margin-right: 20px;
`;

const CtaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  max-width: 600px;
  min-width: 400px;
`;

const encode = (data) => Object.keys(data)
	.map((key) =>
		`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
	.join("&");

const renderCta = (showForm, mainText) => {
  return <CtaContainer>
    <h3>{mainText}</h3>
    <Button label="Register" onClick={showForm}/>
  </CtaContainer>;
};

const CloseButton = styled(FormClose)`
	cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
`;

const ModalForm = ({ onFieldChange, onSubmit, setRecaptchaValue, setIsFormShowing, mainText, subText }) => {
  const theme = useContext(ThemeContext);
  const [overlayRef, setOverlayRef] = useState();

  const closeModal = useCallback(() => {
    setIsFormShowing(false);
  }, [setIsFormShowing]);

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

  return <Modal isOpen overlayRef={setOverlayRef}
                style={{
                  content: { backgroundColor: getColor(theme, "page-bg") },
                  overlay: { backgroundColor: getColor(theme, "overlay-bg") }
                }}
  >
    <CloseButton size="large" onClick={closeModal}/>
      <Form
        name="newsletter"
        method="POST"
        data-netlify="true"
        data-netlify-recaptcha="true"
        onSubmit={onSubmit}>

        <input type="hidden" name="form-name" value="contactlist"/>

        <br/>
        <h3>{mainText}</h3>
        <p>{subText}</p>

        <FormRowsContainer>
          <FormRow>
            <FormLabel htmlFor="rf-name">Name:</FormLabel>
            <FormInput name="rf-name" type="text" required
                       onChange={onFieldChange}/>
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="rf-email">Email:</FormLabel>
            <FormInput name="rf-email" type="email" required
                       onChange={onFieldChange}/>
          </FormRow>
        </FormRowsContainer>

        <FormRow>
          <Button type="submit" primary label="Register"/>
        </FormRow>

        {!isDev &&<ReCaptcha
          sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY || "xxxx"}
          onChange={setRecaptchaValue}/>}
      </Form>
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

	const setSuccess = useCallback(() => {
	  notificationContext.setNotification({
      text: "Successfully registered. Thank you."
    });

    setRegisterSuccess();
  }, [notificationContext]);

	const onFieldChange = useCallback((e) =>
		setFields({
			...fieldsState,
			[e.target.name]: e.target.value
		}), [fieldsState]);

	const onSubmit = useCallback((e) => {
		e.preventDefault();

		const form = e.target;
			// successUrl = form.getAttribute("action");

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

	return !alreadyRegistered ? (isFormShowing ?
    <ModalForm onFieldChange={onFieldChange}
               onSubmit={onSubmit}
               setRecaptchaValue={setRecaptchaValue}
               setIsFormShowing={setIsFormShowing}
               mainText={mainText}
               subText={subText}
    /> :
    renderCta(showForm, mainText))
    : null;
};
