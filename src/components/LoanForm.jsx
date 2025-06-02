import React, { useState, useEffect } from "react";
import "../styles/LoanForm.css";

const loanDataStart = {
    name: "",
    email: "",
    phone: "",
    age: "",
    employed: "",
    salary: "",
    loanPurpose: "",
    loanAmount: "",
    loanDuration: "",
    comment: "",
};

function LoanForm() {
    const [loanData, setLoanData] = useState(loanDataStart);
    const [error, setError] = useState({});

    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData({ ...loanData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Done!", loanData);

        setError(validate(loanData));
        setIsSubmit(true);
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Name is required!";
        }
        if (!values.email) {
            errors.email = "email is required!";
        }
        if (!values.phone) {
            errors.phone = "phone is required!";
        }
        if (!values.age) {
            errors.age = "age is required!";
        }
        if (!values.employed) {
            errors.employed = "employed is required!";
        }
        if (!values.salary) {
            errors.salary = "salary is required!";
        }
        if (!values.loanPurpose) {
            errors.loanPurpose = "purpose for loan is required!";
        }
        if (!values.loanAmount) {
            errors.loanAmount = "Loan amount is required!";
        }
        if (!values.loanDuration) {
            errors.loanDuration = "Duration for loan is required!";
        }

        return errors;
    };

    useEffect(() => {
        if (Object.keys(error).length === 0 && isSubmit) {
            console.log(error);
        }
    }, [error]);

    return (
        <div className="main-content">
            <h1>Loan Application</h1>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <label>Namn:</label>
                    <input
                        type="text"
                        name="name"
                        value={loanData.name}
                        onChange={handleChange}
                    />
                    {error.name && <p>{error.name}</p>}

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={loanData.email}
                        onChange={handleChange}
                    />
                    {error.email && <p>{error.email}</p>}

                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={loanData.phone}
                        onChange={handleChange}
                    />
                    {error.phone && <p>{error.phone}</p>}

                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={loanData.age}
                        onChange={handleChange}
                    />
                    {error.age && <p>{error.age}</p>}

                    <label>Employed:</label>
                    <input
                        type="text"
                        name="employed"
                        value={loanData.employed}
                        onChange={handleChange}
                    />
                    {error.employed && <p>{error.employed}</p>}

                    <label>Salary:</label>
                    <input
                        type="number"
                        name="salary"
                        value={loanData.salary}
                        onChange={handleChange}
                    />
                    {error.salary && <p>{error.salary}</p>}

                    <label>Loan Purpose:</label>
                    <input
                        type="text"
                        name="loanPurpose"
                        value={loanData.loanPurpose}
                        onChange={handleChange}
                    />
                    {error.loanPurpose && <p>{error.loanPurpose}</p>}

                    <label>Loan Amount:</label>
                    <input
                        type="text"
                        name="loanAmount"
                        value={loanData.loanAmount}
                        onChange={handleChange}
                    />
                    {error.loanAmount && <p>{error.loanAmount}</p>}

                    <label>Repayment Years:</label>
                    <input
                        type="number"
                        id="loanDuration"
                        name="loanDuration"
                        value={loanData.loanDuration}
                        onChange={handleChange}
                    />
                    {error.loanDuration && <p>{error.loanDuration}</p>}

                    <label>Comment:</label>
                    <textarea
                        name="comment"
                        value={loanData.comment}
                        onChange={handleChange}
                        rows="3"
                    />

                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default LoanForm;
