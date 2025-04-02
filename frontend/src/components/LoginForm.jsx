import { useState, useEffect } from "react";
import "../Styles/LoginFormStyle.css";

function LoginForm() {
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [view, setView] = useState("signup"); // "signup" or "login"

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username && view === "signup") {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (values.password !== values.confirmPassword && view === "signup") {
            errors.confirmPassword = "Passwords do not match!";
        }
        return errors;
    };

    return (
        <>
            <div className="bgImg"></div>
            <div className="form-container">
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div className="ui message success">
                        {view === "signup" ? "Signed up successfully!" : "Logged in successfully!"}
                    </div>
                ) : (
                    <div className="form-errors">
                        {Object.keys(formErrors).length > 0 && (
                            <ul>
                                {Object.values(formErrors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="form">
                    <h1>{view === "signup" ? "Create Account" : "Login"}</h1>
                    <div className="divider"></div>
                    
                    {view === "signup" && (
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Choose a username"
                                value={formValues.username}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>

                    {view === "signup" && (
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <button type="submit" className="submit-btn">
                            {view === "signup" ? "Sign Up" : "Login"}
                        </button>
                    </div>
                </form>
                <div className="footer">
                    <p>
                        {view === "signup" ? (
                            <>
                                Already have an account?{" "}
                                <span onClick={() => setView("login")}>Login</span>
                            </>
                        ) : (
                            <>
                                Don't have an account?{" "}
                                <span onClick={() => setView("signup")}>Sign Up</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
