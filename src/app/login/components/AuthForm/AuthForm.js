import { Form, TextInput, Button, PasswordInput } from "@carbon/react";
import { useAuthForm } from "../../hooks/useAuthForm";
import "./auth-form.scss";

/**
 * Component for authentication form
 * * Provides login and signup form(s) with email/password inputs depending on mode
 * * Supports toggling between login and signup modes
 * * Displays loading state during authentication
 * * Displays error messages if any
 * * Handles form submission and error display
 * * Includes Google OAuth sign-in button
 *
 * @param {Object} props - Component props
 * @param {string} props.defaultMode - Initial mode of the form ('login' or 'signup')
 * @returns {JSX.Element} Rendered component
 */

const AuthForm = ({ defaultMode = "login" }) => {
	const {
		mode,
		isSignupMode,
		formData,
		error,
		loading,
		toggleMode,
		updateField,
		handleSubmit,
		handleSignInGoogle,
	} = useAuthForm(defaultMode);

	const buttonText = isSignupMode ? "Sign Up" : "Login";
	const loadingText = isSignupMode ? "Creating account..." : "Logging in...";

	return (
		<div className="auth-form-container">
			<h2 className="auth-form-title">
				{isSignupMode ? "Create Account" : "Login"}
			</h2>

			<Form onSubmit={handleSubmit}>
				{isSignupMode && (
					<TextInput
						id="displayName"
						labelText="Name"
						value={formData.displayName}
						onChange={(e) => updateField("displayName", e.target.value)}
						className="auth-input"
					/>
				)}

				<TextInput
					id="email"
					labelText="Email"
					type="email"
					value={formData.email}
					onChange={(e) => updateField("email", e.target.value)}
					required
					className="auth-input"
				/>

				<PasswordInput
					id="password"
					labelText="Password"
					value={formData.password}
					onChange={(e) => updateField("password", e.target.value)}
					required
					className="auth-input"
				/>

				{isSignupMode && (
					<PasswordInput
						id="confirmPassword"
						labelText="Confirm Password"
						value={formData.confirmPassword}
						onChange={(e) => updateField("confirmPassword", e.target.value)}
						required
						className="auth-input"
					/>
				)}

				<Button type="submit" disabled={loading} className="auth-button">
					{loading ? loadingText : buttonText}
				</Button>

				<div className="auth-separator">
					<span>OR</span>
				</div>

				{/* OAuth buttons, div is speculuative*/}
				<div className="oauth-buttons">
					<Button
						kind="tertiary"
						onClick={handleSignInGoogle}
						disabled={loading}
						className="oauth-button google"
					>
						<svg
							className="google-icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 48 48"
						>
							<path
								fill="#FFC107"
								d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
							/>
							<path
								fill="#FF3D00"
								d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
							/>
							<path
								fill="#4CAF50"
								d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
							/>
							<path
								fill="#1976D2"
								d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
							/>
						</svg>
						Continue with Google
					</Button>
				</div>

				{error && <p className="error">{error}</p>}

				<div className="mode-toggle">
					<span>
						{isSignupMode ? "Already have an account?" : "Need an account?"}
					</span>
					<Button
						kind="ghost"
						size="sm"
						onClick={toggleMode}
						className="toggle-button"
					>
						{isSignupMode ? "Login" : "Sign Up"}
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default AuthForm;
