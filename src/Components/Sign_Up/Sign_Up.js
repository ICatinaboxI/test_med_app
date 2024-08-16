import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showerr, setShowerr] = useState(""); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Handle Reset
    const handleReset = () => {
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setShowerr("");
    };

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate phone number
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setShowerr("Please enter a valid 10-digit phone number.");
            return;
        }

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    console.log(`I'm inside the quotations, this is the error.msg type: ${typeof error.msg}
                    
                    And its content: ${error.msg}`)
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error.msg);
            }
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{ marginTop: "5%" }}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{ textAlign: "left" }}>
                    Already a member?{" "}
                    <span>
                        <Link to="/Login" style={{ color: "#2190FF" }}>
                            Login
                        </Link>
                    </span>
                </div>
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Enter your Name"
                                aria-describedby="helpId"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                name="phone"
                                id="phone"
                                className="form-control"
                                placeholder="Enter your phone number"
                                aria-describedby="helpId"
                                required
                            />
                            {showerr && (
                                <div className="err" style={{ color: "red" }}>
                                    {showerr}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                aria-describedby="helpId"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                aria-describedby="helpId"
                                minLength="8"
                                required
                            />
                        </div>
                        <div className="btn-group">
                            <button
                                type="submit"
                                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                            >
                                Submit
                            </button>
                            <button
                                type="reset"
                                className="btn btn-danger mb-2 mr-1 waves-effect waves-light"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    {
        /* Note: Sign up role is not stored in the database. Additional logic can be implemented for this based on your React code. */
    }
};

export default Sign_Up; // Export the Sign_Up component for use in other components