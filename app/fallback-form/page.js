'use client';
import { useState, useEffect } from 'react';
import styles from '../../styles/ContactPage.module.css';
import Header from "@/components/Header";

const FallbackForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    const [formData, setFormData] = useState({
        // Personal Info
        firstName: '',
        middleName: '',
        lastName: '',
        motherName: '',
        fatherName: '',
        email: '',
        cellPhone: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        previousNationality: '',

        // Location & Passport Details
        streetAddress: '',
        city: '',
        zipCode: '',
        state: '',
        passportNumber: '',
        dateOfIssue: '',
        dateOfExpiration: '',
        passportCopy: null,
        photograph: null,

        // Travel Details
        packageType: '',
        departureCity: '',
        roomRequirement: '',
        travelingCompanions: '',
        marjaTaqleed: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            const file = files?.[0];
            if (file) {
                const maxSize = 4 * 1024 * 1024; // 4MB limit
                if (file.size > maxSize) {
                    alert(`File size must be less than 4MB`);
                    e.target.value = '';
                    return;
                }
                setFormData(prev => ({ ...prev, [name]: file }));
            }
        } else if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required fields
        const required = [
            'firstName', 'lastName', 'motherName', 'fatherName', 'email', 'cellPhone',
            'dateOfBirth', 'gender', 'nationality',
            'streetAddress', 'city', 'zipCode', 'state', 'passportNumber',
            'dateOfIssue', 'dateOfExpiration',
            'packageType', 'departureCity', 'roomRequirement', 'marjaTaqleed'
        ];

        required.forEach(field => {
            if (!formData[field]?.trim()) {
                newErrors[field] = 'This field is required';
            }
        });

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.passportCopy) newErrors.passportCopy = 'Passport copy is required';
        if (!formData.photograph) newErrors.photograph = 'Photograph is required';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector(`.${styles.inputError}`);
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    data.append(key, formData[key]);
                }
            });

            const response = await fetch('/api/send-email', {
                method: 'POST',
                body: data
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Submission failed');
            }

            setSubmitStatus('success');
            // Reset form or redirect
            alert('Form submitted successfully!');
            // Optional: window.location.href = '/thank-you';
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isClient) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <div className={styles.contactPage}>
                <div className={styles.container}>
                    <div className={styles.formContainer}>
                        <h1 className={styles.title}>Registration Form (Fallback)</h1>
                        <p className={styles.subtitle}>Please fill out the form below</p>

                        {submitStatus === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'green' }}>
                                <h2>Registration Successful!</h2>
                                <p>Thank you for submitting your information.</p>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className={styles.button}
                                    style={{ marginTop: '1rem' }}
                                >
                                    Submit Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                {/* Personal Information */}
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
                                        <label className={styles.label}>Middle Name</label>
                                        <input
                                            type="text"
                                            name="middleName"
                                            value={formData.middleName}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>
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

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Mother's Name *</label>
                                        <input
                                            type="text"
                                            name="motherName"
                                            value={formData.motherName}
                                            onChange={handleInputChange}
                                            className={`${styles.input} ${errors.motherName ? styles.inputError : ''}`}
                                        />
                                        {errors.motherName && <span className={styles.error}>{errors.motherName}</span>}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Father's Name *</label>
                                        <input
                                            type="text"
                                            name="fatherName"
                                            value={formData.fatherName}
                                            onChange={handleInputChange}
                                            className={`${styles.input} ${errors.fatherName ? styles.inputError : ''}`}
                                        />
                                        {errors.fatherName && <span className={styles.error}>{errors.fatherName}</span>}
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Email *</label>
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
                                    <label className={styles.label}>Cell Phone *</label>
                                    <input
                                        type="tel"
                                        name="cellPhone"
                                        value={formData.cellPhone}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${errors.cellPhone ? styles.inputError : ''}`}
                                    />
                                    {errors.cellPhone && <span className={styles.error}>{errors.cellPhone}</span>}
                                </div>

                                <div className={styles.formRow}>
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
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Gender *</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className={`${styles.input} ${errors.gender ? styles.inputError : ''}`}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Nationality *</label>
                                    <input
                                        type="text"
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${errors.nationality ? styles.inputError : ''}`}
                                    />
                                    {errors.nationality && <span className={styles.error}>{errors.nationality}</span>}
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Previous Nationality</label>
                                    <input
                                        type="text"
                                        name="previousNationality"
                                        value={formData.previousNationality}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                    />
                                </div>

                                <hr style={{ margin: '2rem 0', border: '1px solid #eee' }} />

                                {/* Address & Passport */}
                                <h3 className={styles.stepTitle}>Address & Passport Details</h3>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Street Address *</label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${errors.streetAddress ? styles.inputError : ''}`}
                                    />
                                    {errors.streetAddress && <span className={styles.error}>{errors.streetAddress}</span>}
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
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Zip Code *</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${errors.zipCode ? styles.inputError : ''}`}
                                    />
                                    {errors.zipCode && <span className={styles.error}>{errors.zipCode}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Passport Number *</label>
                                    <input
                                        type="text"
                                        name="passportNumber"
                                        value={formData.passportNumber}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${errors.passportNumber ? styles.inputError : ''}`}
                                    />
                                    {errors.passportNumber && <span className={styles.error}>{errors.passportNumber}</span>}
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Date of Issue *</label>
                                        <input
                                            type="date"
                                            name="dateOfIssue"
                                            value={formData.dateOfIssue}
                                            onChange={handleInputChange}
                                            className={`${styles.input} ${errors.dateOfIssue ? styles.inputError : ''}`}
                                        />
                                        {errors.dateOfIssue && <span className={styles.error}>{errors.dateOfIssue}</span>}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Date of Expiration *</label>
                                        <input
                                            type="date"
                                            name="dateOfExpiration"
                                            value={formData.dateOfExpiration}
                                            onChange={handleInputChange}
                                            className={`${styles.input} ${errors.dateOfExpiration ? styles.inputError : ''}`}
                                        />
                                        {errors.dateOfExpiration && <span className={styles.error}>{errors.dateOfExpiration}</span>}
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Passport Copy (Image) *</label>
                                    <input
                                        type="file"
                                        name="passportCopy"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        className={styles.input}
                                    />
                                    {errors.passportCopy && <span className={styles.error}>{errors.passportCopy}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Photograph (Image) *</label>
                                    <input
                                        type="file"
                                        name="photograph"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        className={styles.input}
                                    />
                                    {errors.photograph && <span className={styles.error}>{errors.photograph}</span>}
                                </div>

                                <hr style={{ margin: '2rem 0', border: '1px solid #eee' }} />

                                {/* Travel Details */}
                                <h3 className={styles.stepTitle}>Travel Details</h3>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Package Type *</label>
                                    <select
                                        name="packageType"
                                        value={formData.packageType}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${errors.packageType ? styles.inputError : ''}`}
                                    >
                                        <option value="">Select Package</option>
                                        <option value="Hajj Package A">Hajj Package A</option>
                                        <option value="Hajj Package B">Hajj Package B</option>
                                        <option value="Umrah Package">Umrah Package</option>
                                        <option value="Ziyarah Package">Ziyarah Package</option>
                                    </select>
                                    {errors.packageType && <span className={styles.error}>{errors.packageType}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Departure City *</label>
                                    <input
                                        type="text"
                                        name="departureCity"
                                        value={formData.departureCity}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${errors.departureCity ? styles.inputError : ''}`}
                                    />
                                    {errors.departureCity && <span className={styles.error}>{errors.departureCity}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Room Requirement *</label>
                                    <select
                                        name="roomRequirement"
                                        value={formData.roomRequirement}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${errors.roomRequirement ? styles.inputError : ''}`}
                                    >
                                        <option value="">Select Room Type</option>
                                        <option value="Quad Room">Quad Room</option>
                                        <option value="Double Room (Husband and Wife)">Double Room (Husband and Wife)</option>
                                        <option value="Triple (Family of 3)">Triple (Family of 3)</option>
                                    </select>
                                    {errors.roomRequirement && <span className={styles.error}>{errors.roomRequirement}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Traveling Companions</label>
                                    <textarea
                                        name="travelingCompanions"
                                        value={formData.travelingCompanions}
                                        onChange={handleInputChange}
                                        className={styles.textarea}
                                        rows="3"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Marja Taqleed *</label>
                                    <input
                                        type="text"
                                        name="marjaTaqleed"
                                        value={formData.marjaTaqleed}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${errors.marjaTaqleed ? styles.inputError : ''}`}
                                    />
                                    {errors.marjaTaqleed && <span className={styles.error}>{errors.marjaTaqleed}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            name="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleInputChange}
                                            className={styles.checkbox}
                                        />
                                        <span className={styles.checkboxText}>
                                            I accept the Terms and Conditions
                                        </span>
                                    </label>
                                    {errors.termsAccepted && <span className={styles.error}>{errors.termsAccepted}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={isSubmitting}
                                    style={{ width: '100%', padding: '1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '1.1rem' }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FallbackForm;
