import nodemailer from 'nodemailer';

export interface MailOption {
    to: string, // Người nhận
    subject: string, // Chủ đề
    html?: string, // Template HTML
    text?: string // Văn bản
}

import emailConfirm from './templates/emailConfirm';
import resetPassword from './templates/resetPassword';
import sendOtp from './templates/sendOtp';
import reportReceiptTemplate from './templates/reportReceipts';
export const templates = {
    emailConfirm: emailConfirm,
    resetPassword: resetPassword,
    sendOtp,
    reportReceiptTemplate
}

export default {
    sendMail: async (mailOption: MailOption) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MS_USER,
                    pass: process.env.MS_PW
                }
            });

            await transporter.sendMail({
                from: process.env.MS_USER,
                ...mailOption
            });

            return true
        } catch (err) {
            return false
        }
    },
}

