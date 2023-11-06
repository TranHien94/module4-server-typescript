import Mailgen from 'mailgen';

interface MailBody {
    productName: string;
    productWebUrl: string;
    receiverName: string;
    confirmLink: string;
    language: string;
}

function resetEmailString(mailBody: MailBody) {
    // Configure mailgen by setting a theme and your product info
    let mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: mailBody.productName,
            link: mailBody.productWebUrl,
            // Optional logo
            logo: 'https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Flogo%2FScreenshot%202023-08-28%20at%2014.14.07.png?alt=media&token=2c7faaeb-8775-4d95-9558-71bc12cc09c0'
        }
    });

    // Prepare email contents
    let email = {
        body: {
            name: mailBody.receiverName,
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#DC4D2F',
                    text: 'Reset your password',
                    link: 'https://mailgen.js/reset?s=b350163a1a010d9729feb74992c1a010'
                }
            },
            outro: 'If you did not request a password reset, no further action is required on your part.'
        }
    };

    // Generate an HTML email with the provided contents
    return mailGenerator.generate(email);
}
export default resetEmailString;

