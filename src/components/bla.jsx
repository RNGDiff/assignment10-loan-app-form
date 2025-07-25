// src/components/LoanForm.jsx
import React, { useState } from "react";
import "../styles/LoanForm.css";

const LoanForm = () => {
    const initialFormData = {
        name: "",
        phone: "",
        age: "",
        isEmployed: false,
        salaryRange: "",
        loanAmount: "",
        loanPurpose: "",
        repaymentYears: "",
        comments: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const salaryOptions = [
        "Mindre än $500",
        "$500 - $1000",
        "$1000 - $2000",
        "Över $2000",
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Rensa felmeddelande när användaren börjar skriva i fältet
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Namn är obligatoriskt.";
        if (!formData.phone.trim()) {
            newErrors.phone = "Telefonnummer är obligatoriskt.";
        } else if (!/^\d+$/.test(formData.phone.trim())) {
            newErrors.phone = "Telefonnummer får endast innehålla siffror.";
        }
        if (!formData.age.trim()) {
            newErrors.age = "Ålder är obligatoriskt.";
        } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
            newErrors.age = "Ogiltig ålder.";
        }
        // Lägg till fler valideringar här om det behövs

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const ansökan = { ...formData };
            // Konvertera numeriska fält från strängar till nummer om det behövs
            ansökan.age = Number(ansökan.age);
            ansökan.loanAmount = Number(ansökan.loanAmount);
            ansökan.repaymentYears = Number(ansökan.repaymentYears);

            console.log("Ansökan:", ansökan);
            alert("Ansökan skickad! Se konsolen för detaljer.");
            // Återställ formuläret (valfritt)
            // setFormData(initialFormData);
            // setErrors({});
        } else {
            console.log("Valideringsfel:", errors);
        }
    };

    return (
        <div className="form-container">
            <h1>Låneansökan</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Namn:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <span className="error-message">{errors.name}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Telefonnummer:</label>
                    <input
                        type="tel" // Använd 'tel' för semantik, validera numeriskt
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="numeric" // Tipsar mobila enheter om numeriskt tangentbord
                    />
                    {errors.phone && (
                        <span className="error-message">{errors.phone}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="age">Ålder:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="18" // Exempel på minålder
                    />
                    {errors.age && (
                        <span className="error-message">{errors.age}</span>
                    )}
                </div>

                <div className="form-group form-group-checkbox">
                    <input
                        type="checkbox"
                        id="isEmployed"
                        name="isEmployed"
                        checked={formData.isEmployed}
                        onChange={handleChange}
                    />
                    <label htmlFor="isEmployed">Är du anställd?</label>
                </div>

                <div className="form-group">
                    <label htmlFor="salaryRange">Din lön:</label>
                    <select
                        id="salaryRange"
                        name="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleChange}>
                        <option value="">Välj löneintervall</option>
                        {salaryOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="loanAmount">Lånebelopp ($):</label>
                    <input
                        type="number"
                        id="loanAmount"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        min="1"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="loanPurpose">Syftet med lånet:</label>
                    <input
                        type="text"
                        id="loanPurpose"
                        name="loanPurpose"
                        value={formData.loanPurpose}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="repaymentYears">
                        Återbetalningstid i år:
                    </label>
                    <input
                        type="number"
                        id="repaymentYears"
                        name="repaymentYears"
                        value={formData.repaymentYears}
                        onChange={handleChange}
                        min="1"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="comments">Kommentarer:</label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        rows="4"></textarea>
                </div>

                <button type="submit" className="submit-button">
                    Skicka ansökan
                </button>
            </form>
        </div>
    );
};

export default LoanForm;
