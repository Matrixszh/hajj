'use client';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/ContactPage.module.css';

const ContactPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    // Enhanced compression function with multiple quality attempts
    const compressImageModerate = (file, maxWidth = 400, quality = 0.4) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Calculate new dimensions
                const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
                const newWidth = Math.floor(img.width * ratio);
                const newHeight = Math.floor(img.height * ratio);

                canvas.width = newWidth;
                canvas.height = newHeight;

                // Enhanced compression settings
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'medium';
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Try multiple quality levels if the first attempt is too large
                const attemptCompression = (currentQuality) => {
                    canvas.toBlob((blob) => {
                        if (!blob) {
                            resolve(null);
                            return;
                        }

                        const sizeKB = blob.size / 1024;
                        console.log(`Compressed to ${newWidth}x${newHeight}, ${sizeKB.toFixed(2)}KB at ${(currentQuality * 100)}% quality`);

                        // If still too large and quality can be reduced further
                        if (sizeKB > 100 && currentQuality > 0.1) {
                            attemptCompression(currentQuality - 0.1);
                        } else {
                            resolve(blob);
                        }
                    }, 'image/jpeg', currentQuality);
                };

                attemptCompression(quality);
            };

            img.onerror = () => {
                console.error('Image load error');
                resolve(null);
            };

            img.src = URL.createObjectURL(file);
        });
    };

    // Initialize EmailJS
    useEffect(() => {
        try {
            console.log('Environment:', process.env.NODE_ENV);
            console.log('EmailJS Config Check:', {
                serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'Set' : 'Missing',
                templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? 'Set' : 'Missing',
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing'
            });

            if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
                emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
                console.log('EmailJS initialized successfully');
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
                    // Updated file size limits: 1MB for production, 2MB for development
                    const maxSize = process.env.NODE_ENV === 'production' ? 1 * 1024 * 1024 : 2 * 1024 * 1024;

                    if (file.size > maxSize) {
                        alert(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
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
            if (!formData.packageType.trim()) newErrors.packageType = 'Package type is required';
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

    // Enhanced Base64 conversion with better compression and debugging
    const convertToBase64Enhanced = async (file) => {
        return new Promise(async (resolve, reject) => {
            if (!file) {
                console.log('No file provided for conversion');
                resolve('');
                return;
            }

            console.log(`🔄 Starting conversion for: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);

            const isProduction = process.env.NODE_ENV === 'production';
            let processedFile = file;

            if (file.type.startsWith('image/')) {
                try {
                    // More aggressive compression for email compatibility
                    const maxWidth = isProduction ? 300 : 400; // Smaller for better email delivery
                    const quality = isProduction ? 0.3 : 0.4;   // Lower quality for smaller size

                    processedFile = await compressImageModerate(file, maxWidth, quality);

                    if (!processedFile) {
                        console.error('❌ Compression failed - no result');
                        resolve('');
                        return;
                    }

                    console.log(`✅ Compressed ${file.name} from ${(file.size / 1024).toFixed(2)}KB to ${(processedFile.size / 1024).toFixed(2)}KB`);
                } catch (error) {
                    console.error('❌ Compression failed:', error);
                    resolve('');
                    return;
                }
            }

            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const base64 = reader.result;
                    const sizeInKB = (base64.length * 0.75) / 1024;

                    console.log(`📊 Base64 conversion complete:`);
                    console.log(`   - Original size: ${(file.size / 1024).toFixed(2)}KB`);
                    console.log(`   - Compressed size: ${(processedFile.size / 1024).toFixed(2)}KB`);
                    console.log(`   - Base64 size: ${sizeInKB.toFixed(2)}KB`);
                    console.log(`   - Base64 length: ${base64.length} characters`);
                    console.log(`   - Starts with: ${base64.substring(0, 50)}...`);

                    // Conservative limits for reliable email delivery
                    const sizeLimit = isProduction ? 150 : 200; // Very conservative limits

                    if (sizeInKB > sizeLimit) {
                        console.warn(`⚠️ Image too large: ${sizeInKB.toFixed(2)}KB, limit is ${sizeLimit}KB`);
                        resolve(''); // Return empty for oversized images
                        return;
                    }

                    console.log(`✅ Image ready for email: ${sizeInKB.toFixed(2)}KB`);
                    resolve(base64);
                } catch (error) {
                    console.error('❌ Base64 conversion error:', error);
                    resolve('');
                }
            };

            reader.onerror = (error) => {
                console.error('❌ FileReader error:', error);
                resolve('');
            };

            try {
                reader.readAsDataURL(processedFile);
            } catch (error) {
                console.error('❌ FileReader start error:', error);
                resolve('');
            }
        });
    };

    const sanitizeString = (str) => {
        if (!str) return '';
        return str.toString().trim().replace(/[\r\n\t]/g, ' ').slice(0, 500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        try {
            const isProduction = process.env.NODE_ENV === 'production';
            console.log(`🚀 FORM SUBMISSION STARTED - ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

            if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
                throw new Error('EmailJS configuration is missing');
            }

            // Process files with enhanced compression and debugging
            let passportCopyBase64 = '';
            let photographBase64 = '';

            if (formData.passportCopy) {
                console.log('🔄 Processing passport copy...');
                passportCopyBase64 = await convertToBase64Enhanced(formData.passportCopy);
                console.log('✅ Passport copy result:', passportCopyBase64 ? `SUCCESS (${(passportCopyBase64.length / 1024).toFixed(2)}KB)` : 'FAILED/TOO LARGE');
            }

            if (formData.photograph) {
                console.log('🔄 Processing photograph...');
                photographBase64 = await convertToBase64Enhanced(formData.photograph);
                console.log('✅ Photograph result:', photographBase64 ? `SUCCESS (${(photographBase64.length / 1024).toFixed(2)}KB)` : 'FAILED/TOO LARGE');
            }

            // Create placeholder image for failed uploads
            const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

            // Prepare template parameters
            const templateParams = {
                // Personal Information
                first_name: sanitizeString(formData.firstName),
                middle_name: sanitizeString(formData.middleName) || 'N/A',
                last_name: sanitizeString(formData.lastName),
                mother_name: sanitizeString(formData.motherName),
                father_name: sanitizeString(formData.fatherName),
                email_address: sanitizeString(formData.email),
                cell_phone: sanitizeString(formData.cellPhone),
                date_of_birth: sanitizeString(formData.dateOfBirth),
                gender: sanitizeString(formData.gender),
                nationality: sanitizeString(formData.nationality),
                previous_nationality: sanitizeString(formData.previousNationality) || 'N/A',

                // Address Information
                street_address: sanitizeString(formData.streetAddress),
                city: sanitizeString(formData.city),
                zip_code: sanitizeString(formData.zipCode),
                state: sanitizeString(formData.state),

                // Passport Information
                passport_number: sanitizeString(formData.passportNumber),
                date_of_issue: sanitizeString(formData.dateOfIssue),
                date_of_expiration: sanitizeString(formData.dateOfExpiration),

                // Travel Information
                package_type: sanitizeString(formData.packageType),
                departure_city: sanitizeString(formData.departureCity),
                room_requirement: sanitizeString(formData.roomRequirement),
                traveling_companions: sanitizeString(formData.travelingCompanions),
                marja_taqleed: sanitizeString(formData.marjaTaqleed),
                terms_accepted: formData.termsAccepted ? 'Yes' : 'No',

                // File Information with detailed status
                passport_copy_name: formData.passportCopy?.name || 'None',
                photograph_name: formData.photograph?.name || 'None',
                passport_copy_size: formData.passportCopy ? `${(formData.passportCopy.size / 1024).toFixed(2)}KB` : 'N/A',
                photograph_size: formData.photograph ? `${(formData.photograph.size / 1024).toFixed(2)}KB` : 'N/A',

                // Image attachment status
                passport_copy_attached: passportCopyBase64 ? 'Yes - Image Attached' : 'No - Failed/Too Large',
                photograph_attached: photographBase64 ? 'Yes - Image Attached' : 'No - Failed/Too Large',

                // Images - use base64 if available, placeholder if not
                passport_copy_data: passportCopyBase64 || placeholderImage,
                photograph_data: photographBase64 || placeholderImage,

                // Metadata
                submission_date: new Date().toLocaleDateString(),
                submission_time: new Date().toLocaleTimeString(),
                environment: isProduction ? 'PRODUCTION' : 'DEVELOPMENT',

                // Detailed status for troubleshooting
                images_status: (() => {
                    if (passportCopyBase64 && photographBase64) {
                        return 'Both images successfully attached to email';
                    } else if (!passportCopyBase64 && !photographBase64) {
                        return 'No images attached - both were too large after compression';
                    } else if (passportCopyBase64) {
                        return 'Only passport copy attached - photograph was too large';
                    } else {
                        return 'Only photograph attached - passport copy was too large';
                    }
                })(),

                debug_info: `Passport: ${passportCopyBase64 ? 'OK' : 'FAIL'}, Photo: ${photographBase64 ? 'OK' : 'FAIL'}`
            };

            // Enhanced debugging
            console.log('🔍 DETAILED DEBUG INFO:');
            console.log('📋 Template params keys:', Object.keys(templateParams));
            console.log('🖼️ Image data status:', {
                passport_copy_length: passportCopyBase64.length,
                photograph_length: photographBase64.length,
                passport_copy_valid: passportCopyBase64.startsWith('data:image'),
                photograph_valid: photographBase64.startsWith('data:image')
            });

            const totalSize = JSON.stringify(templateParams).length / 1024;
            console.log(`📦 Total payload size: ${totalSize.toFixed(2)} KB`);

            // Final size check with more detailed logging
            const maxPayloadSize = isProduction ? 1000 : 1500; // 1MB for production, 1.5MB for dev
            if (totalSize > maxPayloadSize) {
                console.warn('🚨 PAYLOAD TOO LARGE - Removing images and using text-only');
                templateParams.passport_copy_data = placeholderImage;
                templateParams.photograph_data = placeholderImage;
                templateParams.passport_copy_attached = 'Removed - payload too large';
                templateParams.photograph_attached = 'Removed - payload too large';
                templateParams.images_status = 'Images removed due to total payload size - please email separately';

                const newSize = JSON.stringify(templateParams).length / 1024;
                console.log(`📦 Reduced payload size: ${newSize.toFixed(2)} KB`);
            }

            console.log('📤 Sending email to EmailJS...');
            console.log('📤 Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
            console.log('📤 Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);

            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );

            console.log('✅ EMAIL SENT SUCCESSFULLY!');
            console.log('📧 EmailJS Response:', result);

            // User feedback based on image attachment success
            const hasImages = passportCopyBase64 && photographBase64;
            let message = '✅ Form submitted successfully! We will contact you soon.\n\n';

            if (hasImages) {
                message += '📎 Both images were successfully attached to the email.';
            } else if (!passportCopyBase64 && !photographBase64) {
                message += '⚠️ Images were too large for email attachment.\nPlease send your passport copy and photograph separately to: support@yourcompany.com';
            } else {
                message += '⚠️ One image was too large for email attachment.\nPlease send the missing image separately to: support@yourcompany.com';
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
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => input.value = '');

        } catch (error) {
            console.error('❌ FORM SUBMISSION FAILED:', error);
            console.error('❌ Error details:', {
                message: error.message,
                status: error.status,
                text: error.text
            });

            let errorMessage = 'Failed to send form. ';
            if (error.text?.includes('413') || error.message?.includes('large') || error.status === 413) {
                errorMessage += 'Files are too large even after compression. Please try with smaller images or email them separately.';
            } else if (error.status === 400) {
                errorMessage += 'Invalid request format. Please check your inputs and try again.';
            } else if (error.status === 402) {
                errorMessage += 'EmailJS service limit reached. Please try again later.';
            } else {
                errorMessage += `${error.message || 'Unknown error occurred'}. Please try again.`;
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
                        accept="image/jpeg,image/jpg,image/png"
                        className={`${styles.input} ${errors.passportCopy ? styles.inputError : ''}`}
                    />
                    <small className={styles.fileNote}>
                        📏 Max: {process.env.NODE_ENV === 'production' ? '1MB' : '2MB'} • Will be compressed to ~150KB for email
                        {process.env.NODE_ENV === 'production' && <span> • Production: Extra compression applied</span>}
                    </small>
                    {formData.passportCopy && (
                        <div className={styles.filePreview}>
                            ✓ Selected: {formData.passportCopy.name} ({Math.round(formData.passportCopy.size / 1024)}KB)
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
                        📏 Max: {process.env.NODE_ENV === 'production' ? '1MB' : '2MB'} • Will be compressed to ~150KB for email
                        {process.env.NODE_ENV === 'production' && <span> • Production: Extra compression applied</span>}
                    </small>
                    {formData.photograph && (
                        <div className={styles.filePreview}>
                            ✓ Selected: {formData.photograph.name} ({Math.round(formData.photograph.size / 1024)}KB)
                        </div>
                    )}
                    {errors.photograph && <span className={styles.error}>{errors.photograph}</span>}
                </div>
            </div>

            <div className={styles.compressionWarning}>
                <small>
                    🔄 <strong>Image Processing:</strong> Files will be compressed to ensure email delivery.
                    Very large files may not be attached - please email them separately if needed.
                    Check browser console for detailed processing information.
                </small>
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
                    value={formData.packageType}
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

                    {/* Environment indicator */}
                    {process.env.NODE_ENV !== 'production' && (
                        <div className={styles.devIndicator}>
                            <small>🚧 Development Mode - 2MB file size limit, detailed logging enabled</small>
                        </div>
                    )}

                    {/* Production warning */}
                    {process.env.NODE_ENV === 'production' && (
                        <div className={styles.productionWarning}>
                            <small>
                                🔄 <strong>Production Mode:</strong> 1MB file size limit.
                                Images will be heavily compressed for reliable email delivery.
                                Open browser console (F12) to see detailed processing information.
                            </small>
                        </div>
                    )}

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
                                    {isSubmitting ? 'Processing & Sending...' : 'Submit Application'}
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
