import React, { useContext, useState, } from "react";
// import { navigate } from "gatsby";
import styled from "styled-components";
import { Box, Button } from "grommet";
import ReCaptcha from "react-google-recaptcha";
import { NotificationContext } from "../Notifications/NotificationProvider";


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

const onRegisterSuccess = () => {
	try {
		if ("localStorage" in window) {
			localStorage.setItem(REGISTERED_KEY, true);
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
    max-width: 360px;
`;

const FormRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 8px 0 12px;
`;

const FormLabel = styled.label``;

const FormInput = styled.input`
    width: 240px;
`;

// const fieldNames = {
// 	"name": "שם",
// 	"email": "מייל"
// };

const encode = (data) => Object.keys(data)
	.map((key) =>
		`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
	.join("&");

const NewsletterForm = ({showReplacement = true}) => {
	const [fieldsState, setFields] = useState({ "name": "", "email": "" });
	const [recaptchaValue, setRecaptchaValue] = useState(null);
	const notificationContext = useContext(NotificationContext);

	const alreadyRegistered = getIsRegistered();

	const setError = (text) =>
		notificationContext.setNotification({
			isError: true,
			text,
		});

	const onFieldChange = (e) =>
		setFields({
			...fieldsState,
			[e.target.name]: e.target.value
		});

	const onSubmit = (e) => {
		e.preventDefault();

		const form = e.target,
			successUrl = form.getAttribute("action");

		notificationContext.setNotification(null);

		if (!Object.values(fieldsState).find((f) => !f) && (isDev || recaptchaValue)) {
			if (isDev || ~document.location.host.indexOf("localhost")) {
				onRegisterSuccess(successUrl);
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
							onRegisterSuccess(successUrl);
						}
						else {
							console.log("!!!!!!!!!!! form server response: ", response);
							setError("שגיאה קרתה. אנא נסו שוב.");
						}
					})
					.catch(err => {
						console.log("!!!!!!!!! FORM ERROR ", err);
						setError("שגיאה קרתה. אנא נסו שוב.");
					});
			}
		}
		else {
			setError("נא למלא את כל השדות");
		}
	};

	return (!alreadyRegistered ? <Box
		gap="small"
		pad="small"
		elevation="medium"
		border={{ size: "medium", style: "groove" }}>
		<Form
			name="newsletter"
			action="/contact/newsletter-complete/"
			method="POST"
			data-netlify="true"
			data-netlify-recaptcha="true"
			onSubmit={onSubmit}>

			<input type="hidden" name="form-name" value="newsletter" />

			<p>
				הרשמו לקבל עדכונים ומידע חשוב לגבי מוצרים חדשים וסדנאות קרובות.
			</p>
			<br />

			{Object.entries(fieldNames)
				.map(([field, name]) => <FormRow key={field}>
					<FormLabel htmlFor={`nl-${field}`}>{name}:</FormLabel>
					<FormInput id={`nl-${field}`} name={field} type="text" required
						onChange={onFieldChange} />
				</FormRow>)}

			<FormRow>
				<Button type="submit" primary label="רשמו אותי" />
			</FormRow>

			{!isDev && <ReCaptcha
				sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY || "xxxx"}
				onChange={setRecaptchaValue} />}
		</Form>
	</Box > : null);
};

export default NewsletterForm;
