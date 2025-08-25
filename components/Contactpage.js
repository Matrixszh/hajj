'use client';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/ContactPage.module.css';

const ContactPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1 - Personal Info & Package Selection
        packageType: '',
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
        departureCity: '',
        roomRequirement: '',
        travelingCompanions: '',
        marjaTaqleed: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({});

    const compressImage = (file, maxWidth = 800, quality = 0.7) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Calculate new dimensions
                const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;

                // Draw and compress
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(resolve, 'image/jpeg', quality);
            };

            img.src = URL.createObjectURL(file);
        });
    };

    // Generate properly formatted Excel data
    const generateExcelData = (formData) => {
        // Escape any quotes in text fields and wrap fields containing commas in quotes
        const escapeField = (field) => {
            if (!field) return '';
            const str = String(field);
            // If field contains comma, tab, or newline, wrap in quotes and escape existing quotes
            if (str.includes(',') || str.includes('\t') || str.includes('\n') || str.includes('"')) {
                return '"' + str.replace(/"/g, '""') + '"';
            }
            return str;
        };

        const headers = [
            'Submission Date', 'Submission Time', 'Package Type', 'First Name', 'Middle Name',
            'Last Name', 'Mother Name', 'Father Name', 'Email', 'Cell Phone', 'Date of Birth',
            'Gender', 'Nationality', 'Previous Nationality', 'Street Address', 'City', 'Zip Code',
            'State', 'Passport Number', 'Date of Issue', 'Date of Expiration', 'Departure City',
            'Room Requirement', 'Traveling Companions', 'Marja Taqleed', 'Terms Accepted'
        ];

        const dataRow = [
            new Date().toLocaleDateString(),
            new Date().toLocaleTimeString(),
            formData.packageType || '',
            formData.firstName || '',
            formData.middleName || '',
            formData.lastName || '',
            formData.motherName || '',
            formData.fatherName || '',
            formData.email || '',
            formData.cellPhone || '',
            formData.dateOfBirth || '',
            formData.gender || '',
            formData.nationality || '',
            formData.previousNationality || '',
            formData.streetAddress || '',
            formData.city || '',
            formData.zipCode || '',
            formData.state || '',
            formData.passportNumber || '',
            formData.dateOfIssue || '',
            formData.dateOfExpiration || '',
            formData.departureCity || '',
            formData.roomRequirement || '',
            formData.travelingCompanions || '',
            formData.marjaTaqleed || '',
            formData.termsAccepted ? 'Yes' : 'No'
        ];

        // Create tab-separated format
        const headerLine = headers.join('\t');
        const dataLine = dataRow.map(escapeField).join('\t');

        return headerLine + '\n' + dataLine;
    };

    // Initialize EmailJS
    useEffect(() => {
        try {
            if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
                emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
            } else {
                console.error('EmailJS public key is missing');
            }
        } catch (error) {
            console.error('Error initializing EmailJS:', error);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        try {
            if (type === 'file') {
                const file = files?.[0];
                if (file) {
                    // Validate file size (5MB limit)
                    if (file.size > 5 * 1024 * 1024) {
                        alert('File size must be less than 5MB');
                        e.target.value = ''; // Clear the input
                        return;
                    }
                    // Validate file type
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
                    if (!allowedTypes.includes(file.type)) {
                        alert('Please select a valid image (JPEG, PNG) or PDF file');
                        e.target.value = ''; // Clear the input
                        return;
                    }
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

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        } catch (error) {
            console.error('Error handling input change:', error);
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.packageType.trim()) newErrors.packageType = 'Package selection is required';
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.motherName.trim()) newErrors.motherName = 'Mother\'s name is required';
            if (!formData.fatherName.trim()) newErrors.fatherName = 'Father\'s name is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
            if (!formData.cellPhone.trim()) newErrors.cellPhone = 'Cell phone number is required';
            if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required';
            if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
            if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
        }

        if (step === 2) {
            if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
            if (!formData.city.trim()) newErrors.city = 'City is required';
            if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
            if (!formData.state.trim()) newErrors.state = 'State is required';
            if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Passport number is required';
            if (!formData.dateOfIssue.trim()) newErrors.dateOfIssue = 'Date of issue is required';
            if (!formData.dateOfExpiration.trim()) newErrors.dateOfExpiration = 'Date of expiration is required';
            if (!formData.passportCopy) newErrors.passportCopy = 'Passport copy is required';
            if (!formData.photograph) newErrors.photograph = 'Photograph is required';
        }

        if (step === 3) {
            if (!formData.departureCity.trim()) newErrors.departureCity = 'Departure city is required';
            if (!formData.roomRequirement.trim()) newErrors.roomRequirement = 'Room requirement is required';
            if (!formData.travelingCompanions.trim()) newErrors.travelingCompanions = 'Traveling companions information is required';
            if (!formData.marjaTaqleed.trim()) newErrors.marjaTaqleed = 'Marja Taqleed is required';
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

    // Convert file to Base64
    const convertToBase64 = async (file, compress = true) => {
        return new Promise(async (resolve, reject) => {
            if (!file) {
                resolve('');
                return;
            }

            let processedFile = file;

            // Compress image files
            if (compress && file.type.startsWith('image/') && file.type !== 'image/gif') {
                try {
                    processedFile = await compressImage(file);
                    console.log(`Compressed ${file.name} from ${file.size} to ${processedFile.size} bytes`);
                } catch (error) {
                    console.error('Compression failed, using original file:', error);
                }
            }

            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const base64 = reader.result;
                    // Check size (approximate, since Base64 adds ~33% overhead)
                    const sizeInKB = (base64.length * 0.75) / 1024;
                    console.log(`Base64 size: ${sizeInKB.toFixed(2)} KB`);

                    if (sizeInKB > 30) { // Leave room for other form data
                        console.warn('File still too large after compression');
                        reject(new Error('File too large even after compression. Please use a smaller file.'));
                        return;
                    }

                    resolve(base64);
                } catch (error) {
                    console.error('Error in FileReader onload:', error);
                    reject(error);
                }
            };

            reader.onerror = (error) => {
                console.error('FileReader error:', error);
                reject(error);
            };

            reader.onabort = () => {
                console.error('FileReader aborted');
                reject(new Error('File reading was aborted'));
            };

            try {
                reader.readAsDataURL(processedFile);
            } catch (error) {
                console.error('Error starting FileReader:', error);
                reject(error);
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(currentStep)) return;
        setIsSubmitting(true);

        try {
            // Check if EmailJS is properly initialized
            if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
                throw new Error('EmailJS configuration is missing');
            }

            // Convert files to Base64 with compression
            let passportCopyBase64 = '';
            let photographBase64 = '';

            if (formData.passportCopy) {
                try {
                    console.log('Converting and compressing passport copy...');
                    passportCopyBase64 = await convertToBase64(formData.passportCopy, true);
                } catch (error) {
                    console.error('Error processing passport copy:', error);
                    alert(`Error processing passport copy: ${error.message}`);
                    setIsSubmitting(false);
                    return;
                }
            }

            if (formData.photograph) {
                try {
                    console.log('Converting and compressing photograph...');
                    photographBase64 = await convertToBase64(formData.photograph, true);
                } catch (error) {
                    console.error('Error processing photograph:', error);
                    alert(`Error processing photograph: ${error.message}`);
                    setIsSubmitting(false);
                    return;
                }
            }

            // Generate properly formatted Excel data
            const excelFormattedData = generateExcelData(formData);

            const totalSize = JSON.stringify({
                ...formData,
                passportCopyBase64,
                photographBase64,
                excelFormattedData
            }).length / 1024;

            console.log(`Total payload size: ${totalSize.toFixed(2)} KB`);

            if (totalSize > 45) { // Leave some buffer
                alert('Files are too large. Please use smaller images and try again.');
                setIsSubmitting(false);
                return;
            }

            // Prepare template parameters
            const templateParams = {
                packageType: formData.packageType || '',
                firstName: formData.firstName || '',
                middleName: formData.middleName || '',
                lastName: formData.lastName || '',
                motherName: formData.motherName || '',
                fatherName: formData.fatherName || '',
                email: formData.email || '',
                cellPhone: formData.cellPhone || '',
                dateOfBirth: formData.dateOfBirth || '',
                gender: formData.gender || '',
                nationality: formData.nationality || '',
                previousNationality: formData.previousNationality || '',
                streetAddress: formData.streetAddress || '',
                city: formData.city || '',
                zipCode: formData.zipCode || '',
                state: formData.state || '',
                passportNumber: formData.passportNumber || '',
                dateOfIssue: formData.dateOfIssue || '',
                dateOfExpiration: formData.dateOfExpiration || '',
                departureCity: formData.departureCity || '',
                roomRequirement: formData.roomRequirement || '',
                travelingCompanions: formData.travelingCompanions || '',
                marjaTaqleed: formData.marjaTaqleed || '',
                termsAccepted: formData.termsAccepted ? 'Yes' : 'No',
                passportCopyBase64: passportCopyBase64,
                photographBase64: photographBase64,
                submissionDate: new Date().toLocaleDateString(),
                submissionTime: new Date().toLocaleTimeString(),
                excelData: excelFormattedData
            };

            console.log('Sending email with EmailJS...');

            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );

            console.log('Email sent successfully:', result);
            alert('Form submitted successfully! We will contact you soon.');

            // Reset form
            setFormData({
                packageType: '',
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
                departureCity: '',
                roomRequirement: '',
                travelingCompanions: '',
                marjaTaqleed: '',
                termsAccepted: false
            });
            setCurrentStep(1);

        } catch (error) {
            console.error('Detailed EmailJS error:', error);
            if (error.text) {
                console.error('EmailJS error text:', error.text);
            }
            alert(`Failed to send form: ${error.message || 'Please try again.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep1 = () => (
        <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Package Selection & Personal Information</h3>

            {/* Package Selection Field */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Select Package *</label>
                <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleInputChange}
                    className={`${styles.select} ${errors.packageType ? styles.inputError : ''}`}
                >
                    <option value="">Choose Your Package</option>
                    <option value="Full Service Hajj">Full Service Hajj</option>
                    <option value="Self Service Hajj">Self Service Hajj</option>
                    <option value="Pakistani Passport Hajj">Pakistani Passport Hajj</option>
                    <option value="Umrah">Umrah</option>
                </select>
                {errors.packageType && <span className={styles.error}>{errors.packageType}</span>}
                <div className={styles.packageInfo}>
                    {formData.packageType === 'Full Service Hajj' && (
                        <small className={styles.infoText}>✨ Complete service with 5-star hotels, guided tours, and premium amenities</small>
                    )}
                    {formData.packageType === 'Self Service Hajj' && (
                        <small className={styles.infoText}>🎒 Budget-friendly option with basic accommodations and self-guided experience</small>
                    )}
                    {formData.packageType === 'Pakistani Passport Hajj' && (
                        <small className={styles.infoText}>🇵🇰 Special package for Pakistani passport holders with dedicated services</small>
                    )}
                    {formData.packageType === 'Umrah' && (
                        <small className={styles.infoText}>🕌 Year-round pilgrimage package with flexible dates and accommodations</small>
                    )}
                </div>
            </div>

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
                    <label className={styles.label}>Middle Name (if any)</label>
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
                    <label className={styles.label}>Mother&apos;s Name *</label>
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
                    <label className={styles.label}>Father&apos;s Name *</label>
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
                <label className={styles.label}>Cell Phone (WhatsApp) *</label>
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
                    value={formData.streetAddress}
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
                        value={formData.city}
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
                        value={formData.zipCode}
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
                    value={formData.state}
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

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Passport Copy (Must be straight and clear) *</label>
                    <input
                        type="file"
                        name="passportCopy"
                        onChange={handleInputChange}
                        accept="image/*,.pdf"
                        className={`${styles.input} ${errors.passportCopy ? styles.inputError : ''}`}
                    />
                    <small className={styles.fileNote}>Max file size: 5MB</small>
                    {formData.passportCopy && (
                        <div className={styles.filePreview}>
                            Selected: {formData.passportCopy.name}
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
                        accept="image/*"
                        className={`${styles.input} ${errors.photograph ? styles.inputError : ''}`}
                    />
                    <small className={styles.fileNote}>Max file size: 5MB</small>
                    {formData.photograph && (
                        <div className={styles.filePreview}>
                            Selected: {formData.photograph.name}
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
                <label className={styles.label}>Departure City *</label>
                <select
                    name="departureCity"
                    value={formData.departureCity}
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
                    value={formData.travelingCompanions}
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
                        I have read and understood the terms and conditions of Caravan 72
                    </span>
                </label>
                {errors.termsAccepted && <span className={styles.error}>{errors.termsAccepted}</span>}
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
                                        {step === 1 ? 'Package & Personal Info' : step === 2 ? 'Address & Passport' : 'Travel Details'}
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
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
