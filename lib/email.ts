import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendReviewNotification = async (
  reviewDetails: {
    productName: string;
    authorName: string;
    authorEmail?: string;
    rating: number;
    content: string;
  }
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER, // Allows sending to a different email
    subject: `New Product Review Pending Approval: ${reviewDetails.productName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 40px 20px; background-color: #faf9f6; font-family: 'Montserrat', Arial, sans-serif; color: #111111;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-w-4xl; margin: 0 auto; background-color: #ffffff; border: 1px solid #f0f0f0;">
          <tr>
            <td style="padding: 50px 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
              <p style="margin: 0; color: #C5A059; font-size: 10px; text-transform: uppercase; letter-spacing: 4px; font-weight: bold;">ME byREIGN</p>
              <h1 style="margin: 20px 0 0 0; font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 400; color: #000000;">New Review Submitted</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 30px 0; font-size: 14px; line-height: 1.8; color: #555555;">
                A new customer experience has been shared for <strong>${reviewDetails.productName}</strong>. It is currently pending your curation.
              </p>
              
              <div style="background-color: #faf9f6; padding: 30px; margin-bottom: 40px; border-left: 3px solid #C5A059;">
                <p style="margin: 0 0 10px 0; font-size: 16px; font-family: 'Playfair Display', serif; font-weight: 600;">
                  ${reviewDetails.authorName}
                </p>
                ${reviewDetails.authorEmail ? `<p style="margin: 0 0 15px 0; font-size: 12px; color: #888888;">${reviewDetails.authorEmail}</p>` : ''}
                
                <p style="margin: 0 0 15px 0; color: #C5A059; font-size: 16px;">
                  ${'★'.repeat(reviewDetails.rating)}${'☆'.repeat(5 - reviewDetails.rating)}
                </p>
                
                <p style="margin: 0; font-size: 14px; line-height: 1.8; color: #333333; font-style: italic;">
                  "${reviewDetails.content}"
                </p>
              </div>

              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://mebyreign.vercel.app/admin/reviews'}/admin/reviews" 
                   style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 16px 32px; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; border: 1px solid #000000;">
                  View or Accept Review
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #faf9f6; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 10px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">
                ME byREIGN CMS System
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
