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
    rating: number;
    content: string;
  }
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Sending to the owner
    subject: `New Product Review Pending Approval: ${reviewDetails.productName}`,
    html: `
      <h2>New Review Submission</h2>
      <p>A new review has been submitted for <strong>${reviewDetails.productName}</strong>.</p>
      <ul>
        <li><strong>Reviewer:</strong> ${reviewDetails.authorName}</li>
        <li><strong>Rating:</strong> ${reviewDetails.rating} / 5</li>
        <li><strong>Review:</strong> ${reviewDetails.content}</li>
      </ul>
      <p>Please log in to the CMS portal to approve or reject this review:</p>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/reviews" style="display:inline-block;padding:10px 20px;color:white;background-color:#000;text-decoration:none;border-radius:5px;">Go to Admin Portal</a>
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
