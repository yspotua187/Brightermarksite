// Vercel Serverless Function for Brighter Mark Enterprises contact form
// Sends email to contracts@brightermarkar.com

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      business_name,
      contact_person,
      phone,
      email,
      service_type,
      property_type,
      square_footage,
      frequency,
      message,
      page_url
    } = req.body;

    // Validate required fields
    if (!contact_person || !phone || !email || !service_type) {
      return res.status(400).json({ 
        error: 'Missing required fields: contact_person, phone, email, service_type' 
      });
    }

    // Prepare email content
    const emailContent = `
New Contact Form Submission - Brighter Mark Enterprises
=======================================================

Contact Information:
-------------------
Name: ${contact_person}
Business: ${business_name || 'Not specified'}
Phone: ${phone}
Email: ${email}

Service Details:
----------------
Service Type: ${service_type}
Property Type: ${property_type || 'Not specified'}
Square Footage: ${square_footage || 'Not specified'}
Desired Frequency: ${frequency || 'Not specified'}

Message:
--------
${message || 'No message provided'}

Submission Details:
-------------------
Submitted: ${new Date().toLocaleString()}
Page: ${page_url || 'Unknown'}
IP Address: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}
User Agent: ${req.headers['user-agent']}
    `;

    // Log the email content (for debugging)
    console.log('Contact form submission received:');
    console.log(emailContent);

    // In a production environment, you would send the email here
    // Choose one of the following options:

    // OPTION 1: Using Nodemailer with SMTP
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'website@brightermarkenterprises.com',
      to: process.env.TO_EMAIL || 'contracts@brightermarkar.com',
      subject: `New Contact Form: ${business_name || 'No Business Name'}`,
      text: emailContent,
      html: `<pre>${emailContent}</pre>`
    });
    */

    // OPTION 2: Using SendGrid
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
      to: process.env.TO_EMAIL || 'contracts@brightermarkar.com',
      from: process.env.FROM_EMAIL || 'website@brightermarkenterprises.com',
      subject: `New Contact Form: ${business_name || 'No Business Name'}`,
      text: emailContent,
      html: `<pre>${emailContent}</pre>`
    });
    */

    // OPTION 3: Using Resend
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'website@brightermarkenterprises.com',
      to: process.env.TO_EMAIL || 'contracts@brightermarkar.com',
      subject: `New Contact Form: ${business_name || 'No Business Name'}`,
      text: emailContent,
      html: `<pre>${emailContent}</pre>`
    });
    */

    // For now, we'll simulate success since no email service is configured
    // In production, uncomment one of the options above and set the environment variables
    
    // Set environment variables in Vercel:
    // - TO_EMAIL: contracts@brightermarkar.com
    // - FROM_EMAIL: website@brightermarkenterprises.com
    // - Plus credentials for your chosen email service

    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully. Email would be sent in production.' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
}