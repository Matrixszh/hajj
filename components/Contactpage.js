'use client';
import { useState, useEffect } from 'react';

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        passportCopy: null,
        photograph: null,
    });

    const [errors, setErrors] = useState({});

    // Fix hydration issue
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        try {
            if (type === 'file') {
                const file = files?.[0];
                if (file) {
                    const maxSize = 2 * 1024 * 1024; // 2MB limit

                    if (file.size > maxSize) {
                        alert(`File size must be less than 2MB`);
                        e.target.value = '';
                        return;
                    }

                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    if (!allowedTypes.includes(file.type)) {
                        alert('Please select a valid image (JPEG, PNG only)');
                        e.target.value = '';
                        return;
                    }

                    console.log(`File selected: ${file.name}, Size: ${(file.size / 1024).toFixed(2)}KB`);
                }

                setFormData(prev => ({
                    ...prev,
                    [name]: file || null
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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email?.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.message?.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            console.log('🚀 Submitting form with Nodemailer...');

            // Create FormData object
            const formDataToSend = new FormData();

            // Add all text fields
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('message', formData.message);

            // Add files if they exist
            if (formData.passportCopy) {
                formDataToSend.append('passportCopy', formData.passportCopy);
                console.log('📎 Passport copy added to form data');
            }

            if (formData.photograph) {
                formDataToSend.append('photograph', formData.photograph);
                console.log('📎 Photograph added to form data');
            }

            // Send to API
            let response;
            try {
                response = await fetch('/api/send-email', {
                    method: 'POST',
                    body: formDataToSend,
                });
            } catch (fetchError) {
                console.error('Network error:', fetchError);
                throw new Error('Network error. Please check your internet connection and try again.');
            }

            let result;
            try {
                result = await response.json();
            } catch (jsonError) {
                console.error('Failed to parse response as JSON:', jsonError);
                const text = await response.text();
                console.error('Response text:', text);
                throw new Error('Server returned an invalid response. Please try again.');
            }

            if (!response.ok) {
                throw new Error(result.message || result.error || 'Failed to send email');
            }

            console.log('✅ Email sent successfully:', result);

            // Success message
            let message = '✅ Form submitted successfully! We will contact you soon.\n\n';
            if (result.hasImages) {
                message += '📎 Images were successfully attached to the email.';
            } else {
                message += '⚠️ No images were attached. Please email them separately if needed.';
            }

            alert(message);

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: '',
                passportCopy: null,
                photograph: null,
            });
            setErrors({});

            // Clear file inputs
            if (isClient) {
                const fileInputs = document.querySelectorAll('input[type="file"]');
                fileInputs.forEach(input => input.value = '');
            }

        } catch (error) {
            console.error('❌ Form submission failed:', error);

            let errorMessage = 'Failed to send form. ';
            if (error.message.includes('large')) {
                errorMessage += 'Files are too large. Please try with smaller images.';
            } else {
                errorMessage += `${error.message}. Please try again.`;
            }

            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Don't render until client-side hydration is complete
    if (!isClient) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Loading Contact Form...</h1>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '3rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem',
                    color: '#333'
                }}>Contact Us</h1>
                <p style={{
                    color: '#666',
                    marginBottom: '2rem',
                    fontSize: '1.1rem'
                }}>Fill out the form below to get in touch with us</p>

                <div style={{
                    backgroundColor: '#e3f2fd',
                    padding: '1rem',
                    borderRadius: '6px',
                    marginBottom: '2rem',
                    fontSize: '0.9rem',
                    color: '#1565c0'
                }}>
                    📧 <strong>Nodemailer Integration:</strong> Images will be sent as both inline content and file attachments.
                    2MB file size limit per image.
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                autoComplete="given-name"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: `2px solid ${errors.firstName ? '#ef4444' : '#e5e7eb'}`,
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                suppressHydrationWarning
                            />
                            {errors.firstName && (
                                <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                                    {errors.firstName}
                                </span>
                            )}
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                autoComplete="family-name"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: `2px solid ${errors.lastName ? '#ef4444' : '#e5e7eb'}`,
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                suppressHydrationWarning
                            />
                            {errors.lastName && (
                                <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                                    {errors.lastName}
                                </span>
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#333'
                        }}>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            autoComplete="email"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `2px solid ${errors.email ? '#ef4444' : '#e5e7eb'}`,
                                borderRadius: '6px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            suppressHydrationWarning
                        />
                        {errors.email && (
                            <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#333'
                        }}>Phone Number *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            autoComplete="tel"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `2px solid ${errors.phone ? '#ef4444' : '#e5e7eb'}`,
                                borderRadius: '6px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            suppressHydrationWarning
                        />
                        {errors.phone && (
                            <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                                {errors.phone}
                            </span>
                        )}
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#333'
                        }}>Message *</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="5"
                            placeholder="Please describe your inquiry or requirements..."
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `2px solid ${errors.message ? '#ef4444' : '#e5e7eb'}`,
                                borderRadius: '6px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                resize: 'vertical'
                            }}
                            suppressHydrationWarning
                        />
                        {errors.message && (
                            <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                                {errors.message}
                            </span>
                        )}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>Passport Copy</label>
                            <input
                                type="file"
                                name="passportCopy"
                                onChange={handleInputChange}
                                accept="image/jpeg,image/jpg,image/png"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                                suppressHydrationWarning
                            />
                            <small style={{
                                color: '#666',
                                fontSize: '0.8rem',
                                display: 'block',
                                marginTop: '0.25rem'
                            }}>
                                📏 Max: 2MB • JPEG, PNG only
                            </small>
                            {formData.passportCopy && (
                                <div style={{
                                    color: '#059669',
                                    fontSize: '0.875rem',
                                    marginTop: '0.5rem'
                                }}>
                                    ✓ Selected: {formData.passportCopy.name} ({Math.round(formData.passportCopy.size / 1024)}KB)
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>Photograph</label>
                            <input
                                type="file"
                                name="photograph"
                                onChange={handleInputChange}
                                accept="image/jpeg,image/jpg,image/png"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                                suppressHydrationWarning
                            />
                            <small style={{
                                color: '#666',
                                fontSize: '0.8rem',
                                display: 'block',
                                marginTop: '0.25rem'
                            }}>
                                📏 Max: 2MB • JPEG, PNG only
                            </small>
                            {formData.photograph && (
                                <div style={{
                                    color: '#059669',
                                    fontSize: '0.875rem',
                                    marginTop: '0.5rem'
                                }}>
                                    ✓ Selected: {formData.photograph.name} ({Math.round(formData.photograph.size / 1024)}KB)
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
                                color: 'white',
                                padding: '0.875rem 2rem',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s',
                                minWidth: '150px'
                            }}
                            suppressHydrationWarning
                        >
                            {isSubmitting ? 'Sending Email...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
