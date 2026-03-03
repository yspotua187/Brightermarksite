# Email Setup for Brighter Mark Enterprises Contact Forms

This website now uses Vercel serverless functions to handle contact form submissions. The forms send emails to `contracts@brightermarkar.com`.

## Current Implementation

The contact forms on `contact.html` and `index.html` now:
1. Validate user input client-side
2. Send data to `/api/send-contact` serverless function
3. Display success/error messages to users

## Setting Up Email Delivery

The serverless function (`api/send-contact.js`) is currently configured to log submissions but not send actual emails. To enable email delivery, choose one of the following options:

### Option 1: SendGrid (Recommended)

1. Sign up for a free SendGrid account at https://sendgrid.com
2. Create an API key with "Mail Send" permissions
3. In Vercel dashboard, set environment variables:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `TO_EMAIL`: `contracts@brightermarkar.com`
   - `FROM_EMAIL`: `website@brightermarkenterprises.com`

4. Uncomment the SendGrid code in `api/send-contact.js` (lines 68-78)

### Option 2: Nodemailer with SMTP

1. Get SMTP credentials from your email provider (Gmail, Outlook, etc.)
2. In Vercel dashboard, set environment variables:
   - `SMTP_HOST`: Your SMTP server (e.g., `smtp.gmail.com`)
   - `SMTP_PORT`: Port (e.g., `587` for TLS, `465` for SSL)
   - `SMTP_USER`: Your email address
   - `SMTP_PASS`: Your email password or app-specific password
   - `TO_EMAIL`: `contracts@brightermarkar.com`
   - `FROM_EMAIL`: `website@brightermarkenterprises.com`

3. Uncomment the Nodemailer code in `api/send-contact.js` (lines 44-62)

### Option 3: Resend

1. Sign up for Resend at https://resend.com
2. Create an API key
3. In Vercel dashboard, set environment variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `TO_EMAIL`: `contracts@brightermarkar.com`
   - `FROM_EMAIL`: `website@brightermarkenterprises.com`

4. Uncomment the Resend code in `api/send-contact.js` (lines 80-90)

## Testing the Setup

1. Deploy to Vercel: `vercel deploy --prod`
2. Fill out a contact form on the live site
3. Check the Vercel function logs for any errors
4. Verify emails are received at `contracts@brightermarkar.com`

## Local Development

To test locally:
1. Install dependencies: `npm install`
2. Set environment variables in `.env.local` file:
   ```
   TO_EMAIL=contracts@brightermarkar.com
   FROM_EMAIL=website@brightermarkenterprises.com
   # Add your email service credentials
   ```
3. Run development server: `vercel dev`

## Troubleshooting

- **Emails not sending**: Check Vercel function logs for errors
- **Form validation errors**: Ensure all required fields are filled
- **CORS errors**: The API endpoint should be on the same domain
- **Rate limiting**: Email services may have daily limits on free tiers

## Security Notes

- Never commit email credentials to version control
- Use environment variables for all sensitive data
- Consider adding reCAPTCHA to prevent spam submissions
- Monitor form submissions for abuse

## Files Modified

- `js/contact-form.js`: Updated to use serverless API instead of EmailJS
- `api/send-contact.js`: Serverless function for email processing
- `index.html`: Added `name` attributes to form inputs
- `package.json`: Added dependencies for email services
- `vercel.json`: Vercel deployment configuration