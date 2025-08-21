'use client';
import { useState } from 'react';
import styles from '../styles/ContactPage.module.css';

const ContactPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 - Personal Info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',

        // Step 2 - Location Details
        address: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',

        // Step 3 - Package Details
        packageType: '',
        travelDates: '',
        numberOfTravelers: '',
        roomPreference: '',
        specialRequests: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
            if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required';
        }

        if (step === 2) {
            if (!formData.address.trim()) newErrors.address = 'Address is required';
            if (!formData.city.trim()) newErrors.city = 'City is required';
            if (!formData.state.trim()) newErrors.state = 'State is required';
            if (!formData.country.trim()) newErrors.country = 'Country is required';
            if (!formData.pinCode.trim()) newErrors.pinCode = 'PIN code is required';
        }

        if (step === 3) {
            if (!formData.packageType.trim()) newErrors.packageType = 'Package type is required';
            if (!formData.travelDates.trim()) newErrors.travelDates = 'Travel dates are required';
            if (!formData.numberOfTravelers.trim()) newErrors.numberOfTravelers = 'Number of travelers is required';
            if (!formData.roomPreference.trim()) newErrors.roomPreference = 'Room preference is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            console.log('Form submitted:', formData);
            // Handle form submission here
            alert('Form submitted successfully!');
        }
    };

    const renderStep1 = () => (
        <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Personal Information</h3>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>First Name *</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    />
                    {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Last Name *</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                    />
                    {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Email Address *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number *</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Date of Birth *</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.dateOfBirth ? styles.inputError : ''}`}
                />
                {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Location Details</h3>

            <div className={styles.formGroup}>
                <label className={styles.label}>Address *</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`${styles.textarea} ${errors.address ? styles.inputError : ''}`}
                    rows="3"
                />
                {errors.address && <span className={styles.error}>{errors.address}</span>}
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>City *</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                    />
                    {errors.city && <span className={styles.error}>{errors.city}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>State *</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.state ? styles.inputError : ''}`}
                    />
                    {errors.state && <span className={styles.error}>{errors.state}</span>}
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Country *</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.country ? styles.inputError : ''}`}
                    />
                    {errors.country && <span className={styles.error}>{errors.country}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>PIN Code *</label>
                    <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.pinCode ? styles.inputError : ''}`}
                    />
                    {errors.pinCode && <span className={styles.error}>{errors.pinCode}</span>}
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Package Details</h3>

            <div className={styles.formGroup}>
                <label className={styles.label}>Package Type *</label>
                <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleInputChange}
                    className={`${styles.select} ${errors.packageType ? styles.inputError : ''}`}
                >
                    <option value="">Select Package Type</option>
                    <option value="hajj">Hajj</option>
                    <option value="umrah">Umrah</option>
                    <option value="ziyarah">Ziyarah</option>
                </select>
                {errors.packageType && <span className={styles.error}>{errors.packageType}</span>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Preferred Travel Dates *</label>
                <input
                    type="text"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleInputChange}
                    placeholder="e.g., March 2024 - April 2024"
                    className={`${styles.input} ${errors.travelDates ? styles.inputError : ''}`}
                />
                {errors.travelDates && <span className={styles.error}>{errors.travelDates}</span>}
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Number of Travelers *</label>
                    <select
                        name="numberOfTravelers"
                        value={formData.numberOfTravelers}
                        onChange={handleInputChange}
                        className={`${styles.select} ${errors.numberOfTravelers ? styles.inputError : ''}`}
                    >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    {errors.numberOfTravelers && <span className={styles.error}>{errors.numberOfTravelers}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Room Preference *</label>
                    <select
                        name="roomPreference"
                        value={formData.roomPreference}
                        onChange={handleInputChange}
                        className={`${styles.select} ${errors.roomPreference ? styles.inputError : ''}`}
                    >
                        <option value="">Select Room Type</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="triple">Triple</option>
                        <option value="quad">Quad</option>
                    </select>
                    {errors.roomPreference && <span className={styles.error}>{errors.roomPreference}</span>}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Special Requests (Optional)</label>
                <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    rows="4"
                    placeholder="Any special requirements or requests..."
                />
            </div>
        </div>
    );

    return (
        <div className={styles.contactPage}>
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Contact Us</h1>
                    <p className={styles.subtitle}>Fill out the form below to get in touch with us</p>

                    {/* Progress Bar */}
                    <div className={styles.progressBar}>
                        <div className={styles.progressSteps}>
                            {[1, 2, 3].map((step) => (
                                <div key={step} className={styles.progressStep}>
                                    <div className={`${styles.stepCircle} ${currentStep >= step ? styles.active : ''}`}>
                                        {step}
                                    </div>
                                    <span className={styles.stepLabel}>
                                        {step === 1 ? 'Personal Info' : step === 2 ? 'Location' : 'Package'}
                                    </span>
                                    {step < 3 && <div className={`${styles.stepLine} ${currentStep > step ? styles.active : ''}`}></div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Render current step */}
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                        {currentStep === 3 && renderStep3()}

                        {/* Navigation Buttons */}
                        <div className={styles.buttonContainer}>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className={styles.prevButton}
                                >
                                    Previous
                                </button>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className={styles.nextButton}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
