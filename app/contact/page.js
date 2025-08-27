'use client';
import { useState, useEffect } from 'react';
import styles from '../../styles/ContactPage.module.css';

const ContactPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1 - Personal Info
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

        // Step 2 - Location & Passport Details
        streetAddress: '',
        city: '',
        zipCode: '',
        state: '',
        passportNumber: '',
        dateOfIssue: '',
        dateOfExpiration: '',
        passportCopy: null,
        photograph: null,

        // Step 3 - Travel Details
        packageType: '',
        departureCity: '',
        roomRequirement: '',
        travelingCompanions: '',
        marjaTaqleed: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({});

    // Fix hydration issue
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        try {
            if (type === 'file') {
                const file = files?.[0];
                if (file) {
                    // Vercel deployment friendly size limits
                    const maxSize = 4 * 1024 * 1024; // 4MB limit

                    if (file.size > maxSize) {
                        alert(`File size must be less than 4MB for deployment compatibility`);
                        e.target.value = '';
                        return;
                    }

                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    if (!allowedTypes.includes(file.type)) {
                        alert('Please select a valid image (JPEG, PNG only)');
                        e.target.value = '';
                        return;
                    }

                    console.log(`File selected: ${file.name}, Size: ${(file.size / 1024).toFixed(2)}KB, Type: ${file.type}`);
                }

                setFormData(prev => ({
                    ...prev,
                    [name]: file || null
                }));
            } else if (type === 'checkbox') {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }

            // Clear errors
            if (errors[name]) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        } catch (error) {
            console.error('Error handling input change:', error);
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.motherName?.trim()) newErrors.motherName = 'Mother\'s name is required';
            if (!formData.fatherName?.trim()) newErrors.fatherName = 'Father\'s name is required';
            if (!formData.email?.trim()) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
            if (!formData.cellPhone?.trim()) newErrors.cellPhone = 'Cell phone number is required';
            if (!formData.dateOfBirth?.trim()) newErrors.dateOfBirth = 'Date of birth is required';
            if (!formData.gender?.trim()) newErrors.gender = 'Gender is required';
            if (!formData.nationality?.trim()) newErrors.nationality = 'Nationality is required';
        }

        if (step === 2) {
            if (!formData.streetAddress?.trim()) newErrors.streetAddress = 'Street address is required';
            if (!formData.city?.trim()) newErrors.city = 'City is required';
            if (!formData.zipCode?.trim()) newErrors.zipCode = 'Zip code is required';
            if (!formData.state?.trim()) newErrors.state = 'State is required';
            if (!formData.passportNumber?.trim()) newErrors.passportNumber = 'Passport number is required';
            if (!formData.dateOfIssue?.trim()) newErrors.dateOfIssue = 'Date of issue is required';
            if (!formData.dateOfExpiration?.trim()) newErrors.dateOfExpiration = 'Date of expiration is required';
            if (!formData.passportCopy) newErrors.passportCopy = 'Passport copy is required';
            if (!formData.photograph) newErrors.photograph = 'Photograph is required';
        }

        if (step === 3) {
            if (!formData.packageType?.trim()) newErrors.packageType = 'Package type is required';
            if (!formData.departureCity?.trim()) newErrors.departureCity = 'Departure city is required';
            if (!formData.roomRequirement?.trim()) newErrors.roomRequirement = 'Room requirement is required';
            if (!formData.travelingCompanions?.trim()) newErrors.travelingCompanions = 'Traveling companions information is required';
            if (!formData.marjaTaqleed?.trim()) newErrors.marjaTaqleed = 'Marja Taqleed is required';
            if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        try {
            console.log('Submitting multi-step form with Nodemailer...');

            // Create FormData object with all form fields
            const formDataToSend = new FormData();

            // Step 1 - Personal Information
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('middleName', formData.middleName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('motherName', formData.motherName);
            formDataToSend.append('fatherName', formData.fatherName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('cellPhone', formData.cellPhone);
            formDataToSend.append('dateOfBirth', formData.dateOfBirth);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('nationality', formData.nationality);
            formDataToSend.append('previousNationality', formData.previousNationality);

            // Step 2 - Address & Passport Details
            formDataToSend.append('streetAddress', formData.streetAddress);
            formDataToSend.append('city', formData.city);
            formDataToSend.append('zipCode', formData.zipCode);
            formDataToSend.append('state', formData.state);
            formDataToSend.append('passportNumber', formData.passportNumber);
            formDataToSend.append('dateOfIssue', formData.dateOfIssue);
            formDataToSend.append('dateOfExpiration', formData.dateOfExpiration);

            // Step 3 - Travel Details
            formDataToSend.append('packageType', formData.packageType);
            formDataToSend.append('departureCity', formData.departureCity);
            formDataToSend.append('roomRequirement', formData.roomRequirement);
            formDataToSend.append('travelingCompanions', formData.travelingCompanions);
            formDataToSend.append('marjaTaqleed', formData.marjaTaqleed);
            formDataToSend.append('termsAccepted', formData.termsAccepted.toString());

            // Add files if they exist
            if (formData.passportCopy) {
                formDataToSend.append('passportCopy', formData.passportCopy);
                console.log('Passport copy added to form data');
            }

            if (formData.photograph) {
                formDataToSend.append('photograph', formData.photograph);
                console.log('Photograph added to form data');
            }

            // Send to API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit application');
            }

            console.log('Application submitted successfully:', result);

            // Success message
            let message = 'Application submitted successfully! We will contact you soon.\n\n';

            if (result.hasAttachments) {
                message += `${result.attachmentCount} file(s) were successfully attached to the email.`;
            } else if (result.skippedLargeFiles) {
                message += 'Some files were too large to attach. Please email them separately if needed.';
            } else {
                message += 'No attachments were included. Please email your documents separately if needed.';
            }

            alert(message);

            // Reset form
            setFormData({
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
                streetAddress: '',
                city: '',
                zipCode: '',
                state: '',
                passportNumber: '',
                dateOfIssue: '',
                dateOfExpiration: '',
                passportCopy: null,
                photograph: null,
                packageType: '',
                departureCity: '',
                roomRequirement: '',
                travelingCompanions: '',
                marjaTaqleed: '',
                termsAccepted: false
            });
            setCurrentStep(1);
            setErrors({});

            // Clear file inputs
            if (isClient) {
                const fileInputs = document.querySelectorAll('input[type="file"]');
                fileInputs.forEach(input => input.value = '');
            }

        } catch (error) {
            console.error('Form submission failed:', error);

            let errorMessage = 'Failed to submit application. ';
            if (error.message.includes('large')) {
                errorMessage += 'Files are too large. Please try with smaller images.';
            } else if (error.message.includes('configuration')) {
                errorMessage += 'Server configuration error. Please contact support.';
            } else {
                errorMessage += `${error.message}. Please try again.`;
            }

            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
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
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    />
                    {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Middle Name (if any)</label>
                    <input
                        type="text"
                        name="middleName"
                        value={formData.middleName || ''}
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
                    value={formData.lastName || ''}
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
                        value={formData.motherName || ''}
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
                        value={formData.fatherName || ''}
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
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Cell Phone (WhatsApp) *</label>
                <input
                    type="tel"
                    name="cellPhone"
                    value={formData.cellPhone || ''}
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
                        value={formData.dateOfBirth || ''}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.dateOfBirth ? styles.inputError : ''}`}
                    />
                    {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Gender *</label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleInputChange}
                            />
                            Male
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleInputChange}
                            />
                            Female
                        </label>
                    </div>
                    {errors.gender && <span className={styles.error}>{errors.gender}</span>}
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Nationality *</label>
                    <input
                        type="text"
                        name="nationality"
                        value={formData.nationality || ''}
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
                        value={formData.previousNationality || ''}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Address & Passport Details</h3>

            <div className={styles.formGroup}>
                <label className={styles.label}>Street Address *</label>
                <textarea
                    name="streetAddress"
                    value={formData.streetAddress || ''}
                    onChange={handleInputChange}
                    className={`${styles.textarea} ${errors.streetAddress ? styles.inputError : ''}`}
                    rows="3"
                />
                {errors.streetAddress && <span className={styles.error}>{errors.streetAddress}</span>}
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>City *</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                    />
                    {errors.city && <span className={styles.error}>{errors.city}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Zip Code *</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode || ''}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.zipCode ? styles.inputError : ''}`}
                    />
                    {errors.zipCode && <span className={styles.error}>{errors.zipCode}</span>}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>State *</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.state ? styles.inputError : ''}`}
                />
                {errors.state && <span className={styles.error}>{errors.state}</span>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Passport Number *</label>
                <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber || ''}
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
                        value={formData.dateOfIssue || ''}
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
                        value={formData.dateOfExpiration || ''}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.dateOfExpiration ? styles.inputError : ''}`}
                    />
                    {errors.dateOfExpiration && <span className={styles.error}>{errors.dateOfExpiration}</span>}
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Passport Copy (Must be straight and clear) *</label>
                    <input
                        type="file"
                        name="passportCopy"
                        onChange={handleInputChange}
                        accept="image/jpeg,image/jpg,image/png"
                        className={`${styles.input} ${errors.passportCopy ? styles.inputError : ''}`}
                    />
                    <small className={styles.fileNote}>
                        Max: 4MB • JPEG, PNG only • Will be sent as email attachment
                    </small>
                    {formData.passportCopy && (
                        <div className={styles.filePreview}>
                            Selected: {formData.passportCopy.name} ({Math.round(formData.passportCopy.size / 1024)}KB)
                        </div>
                    )}
                    {errors.passportCopy && <span className={styles.error}>{errors.passportCopy}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Photograph (Straight with White Background) *</label>
                    <input
                        type="file"
                        name="photograph"
                        onChange={handleInputChange}
                        accept="image/jpeg,image/jpg,image/png"
                        className={`${styles.input} ${errors.photograph ? styles.inputError : ''}`}
                    />
                    <small className={styles.fileNote}>
                        Max: 4MB • JPEG, PNG only • Will be sent as email attachment
                    </small>
                    {formData.photograph && (
                        <div className={styles.filePreview}>
                            Selected: {formData.photograph.name} ({Math.round(formData.photograph.size / 1024)}KB)
                        </div>
                    )}
                    {errors.photograph && <span className={styles.error}>{errors.photograph}</span>}
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Travel Details</h3>

            <div className={styles.formGroup}>
                <label className={styles.label}>Package Type *</label>
                <select
                    name="packageType"
                    value={formData.packageType || ''}
                    onChange={handleInputChange}
                    className={`${styles.select} ${errors.packageType ? styles.inputError : ''}`}
                >
                    <option value="">Select Package Type</option>
                    <option value="Full Service">Full Service</option>
                    <option value="Self Service">Self Service</option>
                    <option value="Pakistani Passport">Pakistani Passport</option>
                    <option value="Umrah">Umrah</option>
                </select>
                {errors.packageType && <span className={styles.error}>{errors.packageType}</span>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Departure City *</label>
                <select
                    name="departureCity"
                    value={formData.departureCity || ''}
                    onChange={handleInputChange}
                    className={`${styles.select} ${errors.departureCity ? styles.inputError : ''}`}
                >
                    <option value="">Select Departure City</option>
                    <option value="New York">New York</option>
                    <option value="Washington DC">Washington DC</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Atlanta">Atlanta</option>
                    <option value="Miami">Miami</option>
                    <option value="Houston">Houston</option>
                    <option value="Dallas">Dallas</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="San Francisco">San Francisco</option>
                </select>
                {errors.departureCity && <span className={styles.error}>{errors.departureCity}</span>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Room Requirement (Double and Triple Extra Charge) *</label>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="roomRequirement"
                            value="Quad Room"
                            checked={formData.roomRequirement === 'Quad Room'}
                            onChange={handleInputChange}
                        />
                        Quad Room
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="roomRequirement"
                            value="Double Room (Husband and Wife)"
                            checked={formData.roomRequirement === 'Double Room (Husband and Wife)'}
                            onChange={handleInputChange}
                        />
                        Double Room (Husband and Wife)
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="roomRequirement"
                            value="Triple (Family of 3)"
                            checked={formData.roomRequirement === 'Triple (Family of 3)'}
                            onChange={handleInputChange}
                        />
                        Triple (Family of 3)
                    </label>
                </div>
                {errors.roomRequirement && <span className={styles.error}>{errors.roomRequirement}</span>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Traveling Companions and Relationship *</label>
                <textarea
                    name="travelingCompanions"
                    value={formData.travelingCompanions || ''}
                    onChange={handleInputChange}
                    className={`${styles.textarea} ${errors.travelingCompanions ? styles.inputError : ''}`}
                    rows="4"
                    placeholder="Please list all traveling companions and their relationship to you..."
                />
                {errors.travelingCompanions && <span className={styles.error}>{errors.travelingCompanions}</span>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Marja Taqleed *</label>
                <input
                    type="text"
                    name="marjaTaqleed"
                    value={formData.marjaTaqleed || ''}
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
                        checked={formData.termsAccepted || false}
                        onChange={handleInputChange}
                        className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>
                        I have read and understood the terms and conditions of Caravan 72
                    </span>
                </label>
                {errors.termsAccepted && <span className={styles.error}>{errors.termsAccepted}</span>}
            </div>
        </div>
    );

    // Don't render until client-side hydration is complete
    if (!isClient) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Loading Contact Form...</h1>
            </div>
        );
    }

    return (
        <div className={styles.contactPage}>
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Pilgrimage Application</h1>
                    <p className={styles.subtitle}>Complete all steps to submit your application</p>

                    <div style={{
                        backgroundColor: '#e3f2fd',
                        padding: '1rem',
                        borderRadius: '6px',
                        marginBottom: '2rem',
                        fontSize: '0.9rem',
                        color: '#1565c0'
                    }}>
                        Nodemailer Integration: Files will be sent as email attachments.
                        4MB file size limit per file for Vercel deployment compatibility.
                    </div>

                    {/* Progress Bar */}
                    <div className={styles.progressBar}>
                        <div className={styles.progressSteps}>
                            {[1, 2, 3].map((step) => (
                                <div key={step} className={styles.progressStep}>
                                    <div className={`${styles.stepCircle} ${currentStep >= step ? styles.active : ''}`}>
                                        {step}
                                    </div>
                                    <span className={styles.stepLabel}>
                                        {step === 1 ? 'Personal Info' : step === 2 ? 'Address & Passport' : 'Travel Details'}
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
                                    disabled={isSubmitting}
                                >
                                    Previous
                                </button>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className={styles.nextButton}
                                    disabled={isSubmitting}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
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
