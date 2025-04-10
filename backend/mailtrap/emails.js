import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending the Verification Email", error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
   const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "d297f0a7-a26d-4624-b980-e2aac34f8625",
      template_variables: {
        company_info_name: "MERN Auth",
        name: name,
      },
    });

    console.log("Welcome Email sent successfully", response);
    
  } catch (error) {
    console.error('Error sending welcome email', error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};


