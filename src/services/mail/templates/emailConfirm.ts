import Mailgen from 'mailgen';

interface MailBody {
    productName: string;
    productWebUrl: string;
    receiverName: string;
    confirmLink: string;
    language: string;
}

function genEmailString(mailBody: MailBody) {
    let mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: mailBody.productName,
            link: mailBody.productWebUrl
        }
    });

    let email = {
        body: {
            greeting: "Hi",
            signature: "Have a good day",
            name: mailBody.receiverName,
            intro: `Thank you for joining the community ${process.env.APP_NAME}! We are very happy about that!`,
            action: {
                instructions: `To get started with ${mailBody.productName}, please click here:}`,
                button: {
                    color: '#22BC66', // Optional action button color
                    text: "Confirm your account!",
                    link: mailBody.confirmLink
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we\'d love to help."
        }
    };

    return mailGenerator.generate(email);
}

export default genEmailString;