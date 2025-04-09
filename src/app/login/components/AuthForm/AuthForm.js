import { Form, TextInput, Button, PasswordInput } from "@carbon/react";
import { useAuthForm } from "../../hooks/useAuthForm";
import GoogleIcon from "./Resources/googleicon.svg";
import Image from "next/image";
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
                        onChange={(e) =>
                            updateField("displayName", e.target.value)
                        }
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
                        onChange={(e) =>
                            updateField("confirmPassword", e.target.value)
                        }
                        required
                        className="auth-input"
                    />
                )}

                <Button
                    type="submit"
                    disabled={loading}
                    className="auth-button"
                >
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
                        <Image
                            src={GoogleIcon}
                            alt="Google Icon"
                            width={18}
                            height={18}
                            className="oauth-icon"
                        />
                        Continue with Google
                    </Button>
                </div>

                {error && <p className="error">{error}</p>}

                <div className="mode-toggle">
                    <span>
                        {isSignupMode
                            ? "Already have an account?"
                            : "Need an account?"}
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
