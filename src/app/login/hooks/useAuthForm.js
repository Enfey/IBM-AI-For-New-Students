import { useState } from "react";
import { auth, googleProvider } from "@/util/firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithPopup,
} from "firebase/auth";

/**
 * Authentication form custom hook
 *
 * This hook:
 * - Manages the state of the authentication form
 * - Handles form submission for login and signup
 * - Validates input fields
 * - Manages error messages
 * - Handles Google sign-in
 * 
 * Uses:
 * - {@link auth} Firebase authe instance
 * - {@link googleProvider} Firebase Google authentication provider
 * - {@link signInWithEmailAndPassword} Firebase function for email/password sign-in
 * - {@link createUserWithEmailAndPassword} Firebase function for email/password signup
 * - {@link updateProfile} Firebase function for updating user profile
 * - {@link signInWithPopup} Firebase function to support Google OAuth sign-in
 *
 * @param {string} initialMode - Initial mode of the form ('login' or 'signup')
 *
 * @returns {Object} Form state and handlers
 * @returns {string} return.mode - Current mode of the form ('login' or 'signup') - not used externally
 * @returns {boolean} return.isSignupMode - Whether the form is in signup mode
 * @return {Object} return.formData - Current form field values
 * @return {string} return.error - Current error message or empty string
 * @return {boolean} return.loading - Whether auth is in progress
 * @return {Function} return.toggleMode - Function to toggle between login and signup modes
 * @return {Function} return.updateField - Function to update a specific form field
 * @return {Function} return.handleSubmit - Function to handle form submission for email/password login or signup
 * @return {Function} return.handleSignInGoogle - Function to handle Google OAuth sign-in
 */

export const useAuthForm = (initialMode = "login") => {
	const [mode, setMode] = useState(initialMode);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		displayName: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const isSignupMode = mode === "signup";

	/**
	 * Resets form and error state
	 *
	 * Used when:
	 * - Toggling between login and signup modes
	 * - After successful authentication
	 *
	 * @returns {void}
	 */
	const resetForm = () => {
		setFormData({
			email: "",
			password: "",
			confirmPassword: "",
			displayName: "",
		});
		setError("");
	};

	/**
	 * Toggles between login and signup modes
	 * Switches the current form mode and resets the form and error state
	 *
	 * @returns {void}
	 */
	const toggleMode = () => {
		setMode(mode === "login" ? "signup" : "login");
		resetForm();
	};

	/**
	 * Updates a specific form field value
	 * * Uses functional state update to formData, indirectly sets via a function
	 * that takes previous formData as an argument, passed implicitly by react.
	 *
	 * @param {string} field - Form field name to update (e.g., 'email', 'password')
	 * @param {string} value - New value for the field
	 * @returns {void}
	 */
	const updateField = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value })); // use spread operator to avoid big function
	};

	/**
	 * Handles Google OAuth authentication via popup
	 * Sets loading state to true while processing
	 *
	 * @returns {void}
	 * @throws {Error} Error object from Firebase authentication
	 */
	const handleSignInGoogle = async () => {
		setError("");
		setLoading(true);

		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			handleError(error);
		} finally {
			setLoading(false);
		}
	};

	/** Handles form submission for login or signup with email and password
	 * * Sets loading state to true while processing
	 * * Validates password confirmation for signup
	 * * Creates or signs in user based on mode
	 *
	 * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
	 * @returns {Promise<void>} Promise resolves after authentication attempt completes
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			if (isSignupMode) {
				if (formData.password !== formData.confirmPassword) {
					throw { code: "auth/passwords-dont-match" }; //early error matching firebase error specification
				}

				// Create user
				const credential = await createUserWithEmailAndPassword(
					auth,
					formData.email,
					formData.password
				);

				// Set display name for user if one is provided
				if (formData.displayName) {
					await updateProfile(credential.user, {
						displayName: formData.displayName,
					});
				}
			} else {
				// Sign in user
				await signInWithEmailAndPassword(
					auth,
					formData.email,
					formData.password
				);
			}
			resetForm();
		} catch (error) {
			handleError(error);
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Maps Firebase authentication error codes to user friendly messages via exhaustive switch statement,
	 * setting error state accordingly to be rendered in UI.
	 *
	 * @param {Object} error - Error object from Firebase authentication
	 * @param {string} error.code - Firebase error code
	 * @returns {void}
	 */
	const handleError = (error) => {
		switch (error.code) {
			case "auth/user-not-found":
				setError("No account found with this email");
				break;
			case "auth/wrong-password":
				setError("Incorrect password");
				break;
			case "auth/email-already-in-use":
				setError("Email is already in use");
				break;
			case "auth/weak-password":
				setError("Password should be at least 6 characters"); // Firebase default
				break;
			case "auth/passwords-dont-match":
				setError("Passwords do not match");
				break;
			case "auth/popup-closed-by-user":
				setError("Sign-in popup was closed before completing the sign-in.");
				break;
			case "auth/cancelled-popup-request":
				break;
			case "auth/popup-blocked":
				setError("Sign-in popup was blocked by your browser.");
				break;
			default:
				setError("An error occurred during authentication");
				console.error(error);
		}
	};

	return {
		mode,
		isSignupMode,
		formData,
		error,
		loading,
		toggleMode,
		updateField,
		handleSubmit,
		handleSignInGoogle,
	};
};
