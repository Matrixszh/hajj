import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        console.log('📧 Processing multi-step contact form...');

        const formData = await req.formData();

        // Validate required environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('❌ Missing EMAIL_USER or EMAIL_PASS environment variables');
            return Response.json(
                { success: false, message: 'Email configuration missing' },
                { status: 500 }
            );
        }

        // Extract all form fields from the multi-step form
        // Step 1 - Personal Information
        const firstName = formData.get('firstName') || '';
        const middleName = formData.get('middleName') || '';
        const lastName = formData.get('lastName') || '';
        const motherName = formData.get('motherName') || '';
        const fatherName = formData.get('fatherName') || '';
        const email = formData.get('email') || '';
        const cellPhone = formData.get('cellPhone') || '';
        const dateOfBirth = formData.get('dateOfBirth') || '';
        const gender = formData.get('gender') || '';
        const nationality = formData.get('nationality') || '';
        const previousNationality = formData.get('previousNationality') || '';

        // Step 2 - Address & Passport Details
        const streetAddress = formData.get('streetAddress') || '';
        const city = formData.get('city') || '';
        const zipCode = formData.get('zipCode') || '';
        const state = formData.get('state') || '';
        const passportNumber = formData.get('passportNumber') || '';
        const dateOfIssue = formData.get('dateOfIssue') || '';
        const dateOfExpiration = formData.get('dateOfExpiration') || '';

        // Step 3 - Travel Details
        const packageType = formData.get('packageType') || '';
        const departureCity = formData.get('departureCity') || '';
        const roomRequirement = formData.get('roomRequirement') || '';
        const travelingCompanions = formData.get('travelingCompanions') || '';
        const marjaTaqleed = formData.get('marjaTaqleed') || '';
        const termsAccepted = formData.get('termsAccepted') === 'true';

        // Extract files
        const passportCopy = formData.get('passportCopy');
        const photograph = formData.get('photograph');

        console.log('📝 Form data extracted successfully');

        // Configure SMTP transporter
        let transporter;
        try {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
                secure: false,
                requireTLS: true,
                tls: {
                    rejectUnauthorized: false
                }
            });

            // Verify transporter
            await transporter.verify();
            console.log('✅ SMTP connection verified');

        } catch (transporterError) {
            console.error('❌ Transporter setup failed:', transporterError);
            return Response.json(
                { success: false, message: 'Email service configuration error' },
                { status: 500 }
            );
        }

        // Process attachments (with Vercel size limits in mind)
        const attachments = [];
        const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB total limit for Vercel

        try {
            if (passportCopy && typeof passportCopy === 'object' && 'size' in passportCopy && passportCopy.size > 0) {
                console.log(`📎 Processing passport copy: ${passportCopy.name} (${(passportCopy.size / 1024).toFixed(2)}KB)`);

                if (passportCopy.size > MAX_FILE_SIZE) {
                    console.warn('⚠️ Passport copy too large, skipping attachment');
                } else {
                    const buffer = Buffer.from(await passportCopy.arrayBuffer());
                    attachments.push({
                        filename: `passport_${firstName}_${lastName}_${passportCopy.name}`,
                        content: buffer,
                        contentType: passportCopy.type
                    });
                }
            }

            if (photograph && typeof photograph === 'object' && 'size' in photograph && photograph.size > 0) {
                console.log(`📎 Processing photograph: ${photograph.name} (${(photograph.size / 1024).toFixed(2)}KB)`);

                if (photograph.size > MAX_FILE_SIZE) {
                    console.warn('⚠️ Photograph too large, skipping attachment');
                } else {
                    const buffer = Buffer.from(await photograph.arrayBuffer());
                    attachments.push({
                        filename: `photo_${firstName}_${lastName}_${photograph.name}`,
                        content: buffer,
                        contentType: photograph.type
                    });
                }
            }

            console.log(`✅ Processed ${attachments.length} attachments`);

        } catch (fileError) {
            console.error('❌ File processing error:', fileError);
            // Continue without attachments rather than failing
        }

        // Create comprehensive HTML email
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
                    .header { background: #2c5aa0; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                    .section { margin-bottom: 30px; padding: 15px; background: white; border-radius: 5px; }
                    .section-title { color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 5px; margin-bottom: 15px; }
                    .field-group { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 15px; }
                    .field { flex: 1; min-width: 200px; }
                    .field-label { font-weight: bold; color: #555; }
                    .field-value { margin-top: 5px; padding: 8px; background: #f0f0f0; border-radius: 3px; }
                    .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
                    .attachment-info { background: #e8f4fd; padding: 10px; border-left: 4px solid #2c5aa0; margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>New Pilgrimage Application Received</h1>
                        <p>Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                    </div>
                    
                    <div class="content">
                        <!-- Personal Information -->
                        <div class="section">
                            <h2 class="section-title">Personal Information</h2>
                            <div class="field-group">
                                <div class="field">
                                    <div class="field-label">First Name:</div>
                                    <div class="field-value">${firstName}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Middle Name:</div>
                                    <div class="field-value">${middleName || 'N/A'}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Last Name:</div>
                                    <div class="field-value">${lastName}</div>
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="field-label">Mother's Name:</div>
                                    <div class="field-value">${motherName}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Father's Name:</div>
                                    <div class="field-value">${fatherName}</div>
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="field-label">Email:</div>
                                    <div class="field-value">${email}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Cell Phone (WhatsApp):</div>
                                    <div class="field-value">${cellPhone}</div>
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="field-label">Date of Birth:</div>
                                    <div class="field-value">${dateOfBirth}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Gender:</div>
                                    <div class="field-value">${gender}</div>
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="field-label">Nationality:</div>
                                    <div class="field-value">${nationality}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Previous Nationality:</div>
                                    <div class="field-value">${previousNationality || 'N/A'}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Address & Passport Details -->
                        <div class="section">
                            <h2 class="section-title">Address & Passport Details</h2>
                            <div class="field">
                                <div class="field-label">Street Address:</div>
                                <div class="field-value">${streetAddress}</div>
                            </div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="field-label">City:</div>
                                    <div class="field-value">${city}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">State:</div>
                                    <div class="field-value">${state}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Zip Code:</div>
                                    <div class="field-value">${zipCode}</div>
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="field-label">Passport Number:</div>
                                    <div class="field-value">${passportNumber}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Date of Issue:</div>
                                    <div class="field-value">${dateOfIssue}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Date of Expiration:</div>
                                    <div class="field-value">${dateOfExpiration}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Travel Details -->
                        <div class="section">
                            <h2 class="section-title">Travel Details</h2>
                            <div class="field-group">
                                <div class="field">
                                    <div class="field-label">Package Type:</div>
                                    <div class="field-value">${packageType}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Home City:</div>
                                    <div class="field-value">${departureCity}</div>
                                </div>

                            </div>
                            <div class="field">
                                <div class="field-label">Room Requirement:</div>
                                <div class="field-value">${roomRequirement}</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Traveling Companions:</div>
                                <div class="field-value">${travelingCompanions}</div>
                            </div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="field-label">Marja Taqleed:</div>
                                    <div class="field-value">${marjaTaqleed}</div>
                                </div>
                                <div class="field">
                                    <div class="field-label">Terms Accepted:</div>
                                    <div class="field-value">${termsAccepted ? 'Yes' : 'No'}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Attachment Information -->
                        ${attachments.length > 0 ? `
                            <div class="attachment-info">
                                <h3>Attachments Included:</h3>
                                <ul>
                                    ${attachments.map(att => `<li>${att.filename}</li>`).join('')}
                                </ul>
                            </div>
                        ` : `
                            <div class="attachment-info">
                                <h3>File Status:</h3>
                                <p><strong>Passport Copy:</strong> ${passportCopy && typeof passportCopy === 'object' && 'size' in passportCopy ? `${passportCopy.name || 'Unknown'} (${(passportCopy.size / 1024).toFixed(2)}KB) - ${passportCopy.size > MAX_FILE_SIZE ? 'Too large, not attached' : 'Processing failed'}` : 'Not provided'}</p>
                                <p><strong>Photograph:</strong> ${photograph && typeof photograph === 'object' && 'size' in photograph ? `${photograph.name || 'Unknown'} (${(photograph.size / 1024).toFixed(2)}KB) - ${photograph.size > MAX_FILE_SIZE ? 'Too large, not attached' : 'Processing failed'}` : 'Not provided'}</p>
                                ${(passportCopy && typeof passportCopy === 'object' && 'size' in passportCopy && passportCopy.size > MAX_FILE_SIZE) || (photograph && typeof photograph === 'object' && 'size' in photograph && photograph.size > MAX_FILE_SIZE) ?
                '<p><em>Large files were not attached. Please request them separately if needed.</em></p>' : ''}
                            </div>
                        `}
                    </div>
                    
                    <div class="footer">
                        <p>This application was submitted through the Caravan 72 contact form.</p>
                        <p>Please respond to the applicant at: ${email}</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || 'registration@caravan72.com',
            subject: `New Pilgrimage Application: ${firstName} ${lastName} - ${packageType}`,
            html: htmlContent,
            attachments: attachments
        };

        console.log(`📧 Sending email with ${attachments.length} attachments...`);

        const info = await transporter.sendMail(mailOptions);

        console.log('✅ Email sent successfully:', info.messageId);

        return Response.json({
            success: true,
            message: 'Application submitted successfully',
            hasAttachments: attachments.length > 0,
            attachmentCount: attachments.length,
            messageId: info.messageId,
            skippedLargeFiles: (passportCopy && typeof passportCopy === 'object' && 'size' in passportCopy && passportCopy.size > MAX_FILE_SIZE) || (photograph && typeof photograph === 'object' && 'size' in photograph && photograph.size > MAX_FILE_SIZE)
        });

    } catch (error) {
        console.error('❌ Email sending failed:', error);

        let errorMessage = 'Failed to submit application';

        if (error.code === 'EAUTH') {
            errorMessage = 'Email authentication failed. Please contact support.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Failed to connect to email server. Please try again.';
        } else if (error.message?.includes('Invalid login')) {
            errorMessage = 'Email service configuration error. Please contact support.';
        } else if (error.message?.includes('large') || error.status === 413) {
            errorMessage = 'Application data too large. Please try with smaller files.';
        }

        return Response.json(
            {
                success: false,
                message: errorMessage,
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}