/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/api/send-invite-email", (c) => {
    const data = $apis.requestInfo(c).data
    
    // Validate required fields
    if (!data.partnerEmail || !data.dateType || !data.dateTime) {
        return c.json(400, {"success": false, "error": "Missing required fields"})
    }
    
    // Email template
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You're Invited to a Special Date!</title>
        <style>
            body { 
                font-family: 'Arial', sans-serif; 
                background: #fdf2f8; 
                margin: 0; 
                padding: 20px; 
                line-height: 1.6;
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 20px; 
                padding: 40px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
            }
            .header { 
                text-align: center; 
                margin-bottom: 30px; 
            }
            .title { 
                color: #ec4899; 
                font-size: 28px; 
                font-weight: bold; 
                margin-bottom: 10px; 
            }
            .subtitle { 
                color: #6b7280; 
                font-size: 16px; 
            }
            .date-card { 
                background: linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%); 
                border-radius: 15px; 
                padding: 25px; 
                margin: 25px 0; 
                text-align: center; 
            }
            .date-type { 
                background: #fce7f3; 
                color: #ec4899; 
                padding: 8px 16px; 
                border-radius: 20px; 
                font-weight: bold; 
                display: inline-block; 
                margin-bottom: 15px; 
            }
            .date-time { 
                font-size: 20px; 
                font-weight: bold; 
                color: #374151; 
                margin-bottom: 10px; 
            }
            .message { 
                font-style: italic; 
                color: #6b7280; 
                font-size: 16px; 
                margin: 20px 0; 
            }
            .cta-button { 
                background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); 
                color: white; 
                padding: 15px 30px; 
                border-radius: 25px; 
                text-decoration: none; 
                font-weight: bold; 
                display: inline-block; 
                margin: 20px 0; 
            }
            .footer { 
                text-align: center; 
                margin-top: 30px; 
                color: #9ca3af; 
                font-size: 14px; 
            }
            .info-box {
                background: #eff6ff; 
                padding: 15px; 
                border-radius: 10px; 
                margin: 20px 0; 
                text-align: center;
            }
            .info-text {
                margin: 0; 
                color: #1e40af; 
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="title">💖 You're Invited!</div>
                <div class="subtitle">${data.senderName || 'Someone special'} has planned a surprise date for you</div>
            </div>
            
            <div class="date-card">
                <div class="date-type">${data.dateType}</div>
                <div class="date-time">${new Date(data.dateTime).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</div>
                <div class="date-time">${new Date(data.dateTime).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                })}</div>
                <div class="message">"${data.message}"</div>
            </div>
            
            <div style="text-align: center;">
                <a href="${data.inviteUrl}" class="cta-button">View Your Invite 💕</a>
            </div>
            
            <div class="info-box">
                <p class="info-text">📱 No login required - just click to join when it's time!</p>
            </div>
            
            <div class="footer">
                <p>Made with 💖 by BookMyHeart</p>
                <p>This email was sent because someone planned a virtual date for you.</p>
            </div>
        </div>
    </body>
    </html>
    `
    
    try {
        // Get Resend API key from environment
        const resendApiKey = $os.getenv("RESEND_API_KEY")
        
        if (!resendApiKey) {
            console.log("RESEND_API_KEY not found, skipping email send")
            return c.json(200, {"success": true, "message": "Email sending skipped - no API key"})
        }
        
        // Prepare email data
        const emailData = {
            from: 'BookMyHeart <noreply@bookmyheart.app>',
            to: [data.partnerEmail],
            subject: `💖 ${data.senderName || 'Someone special'} invited you to a ${data.dateType}!`,
            html: emailHtml
        }
        
        // Send email using Resend API
        const response = $http.send({
            url: "https://api.resend.com/emails",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + resendApiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emailData)
        })
        
        if (response.statusCode >= 200 && response.statusCode < 300) {
            return c.json(200, {"success": true, "message": "Email sent successfully"})
        } else {
            console.error("Email sending failed:", response.raw)
            return c.json(500, {"success": false, "error": "Failed to send email"})
        }
        
    } catch (error) {
        console.error("Email sending error:", error)
        return c.json(500, {"success": false, "error": error.message})
    }
})