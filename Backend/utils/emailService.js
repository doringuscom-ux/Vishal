const axios = require('axios');
require('dotenv').config();

// Google Apps Script Proxy URL provided by user
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtYH304DJSIyyQoIGsybcnaqjwhPes4LYDuzpRfFLQ0VNy2YpY_RoVW91u0hoGmRUn/exec';

/**
 * Send Admin Notification (For New Inquiries)
 */
const sendAdminNotification = async (type, data) => {
    // Admin email where notifications should be sent
    const adminEmail = process.env.ADMIN_EMAIL || 'vishalindustries.chdm@gmail.com';
    const subject = `Alert: New ${type} on Vishal Industries`;
    
    // Create a nice table for the data
    let dataRows = '';
    for (const [key, value] of Object.entries(data)) {
        dataRows += `
            <tr>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; text-transform: capitalize;">${key}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${value}</td>
            </tr>
        `;
    }

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: auto;">
            <h2 style="color: #2563eb; text-align: center;">New ${type} Received</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                ${dataRows}
            </table>
            <p style="font-size: 12px; color: #666; text-align: center;">You can manage this from your Admin Dashboard.</p>
        </div>
    `;

    try {
        const response = await axios.post(GOOGLE_SCRIPT_URL, null, {
            params: {
                to: adminEmail,
                subject: subject,
                message: htmlContent
            }
        });

        if (response.data && response.data.success) {
            console.log(`[Email Service] Admin notified of new ${type}`);
            return true;
        } else {
            console.error(`[Email Service] Admin notification failed:`, response.data?.error || 'Unknown proxy error');
            return false;
        }
    } catch (err) {
        console.error(`[Email Service] Error in sendAdminNotification:`, err.message);
        return false;
    }
};

module.exports = { sendAdminNotification };
