import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, spaceType, notes, quizAnswers } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return Response.json(
        { error: 'Name, phone, and email are required fields.' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.EMAIL_HOST_USER || process.env.DEFAULT_FROM_EMAIL || process.env.SMTP_USER;
    const rawPass = process.env.EMAIL_HOST_PASSWORD || process.env.SMTP_PASS || '';
    const smtpPass = rawPass.replace(/["']/g, '').replace(/\s+/g, '');
    const adminEmail = process.env.ADMIN_EMAIL || process.env.DEFAULT_FROM_EMAIL || smtpUser;
    const fromName = process.env.DEFAULT_FROM_NAME || process.env.EMAIL_FROM_NAME || 'Shrijal Talkar — Modern Vastu';
    const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== 'false' : smtpPort === 465;

    const isPlaceholder =
      !smtpUser ||
      !smtpPass ||
      smtpUser === 'your-email@gmail.com' ||
      smtpPass === 'your-16-digit-app-password';

    const submissionTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // 1. Generate Admin Email HTML
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Request</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F3EE;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1C1C1A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3EE;padding:30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);border:1px solid #E8E5DD;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#103F35;padding:32px 36px;text-align:center;">
              <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#A3E7D0;font-weight:600;margin-bottom:8px;">
                NEW INQUIRY &bull; SHRIJAL TALKAR
              </div>
              <h1 style="margin:0;font-size:26px;color:#FFFFFF;font-weight:400;letter-spacing:-0.02em;">
                New Consultation &amp; Space Report Lead
              </h1>
            </td>
          </tr>

          <!-- Client Details Section -->
          <tr>
            <td style="padding:32px 36px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C33F4B;margin-bottom:12px;">
                CLIENT CONTACT DETAILS
              </div>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ECE8DF;border-radius:8px;background-color:#FAF9F6;margin-bottom:24px;">
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #ECE8DF;width:35%;font-weight:600;color:#55504A;font-size:14px;">Full Name</td>
                  <td style="padding:14px 18px;border-bottom:1px solid #ECE8DF;color:#1C1C1A;font-size:15px;font-weight:500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #ECE8DF;font-weight:600;color:#55504A;font-size:14px;">Phone Number</td>
                  <td style="padding:14px 18px;border-bottom:1px solid #ECE8DF;color:#103F35;font-size:15px;font-weight:600;">
                    <a href="tel:${phone}" style="color:#103F35;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #ECE8DF;font-weight:600;color:#55504A;font-size:14px;">Email Address</td>
                  <td style="padding:14px 18px;border-bottom:1px solid #ECE8DF;color:#103F35;font-size:15px;">
                    <a href="mailto:${email}" style="color:#103F35;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #ECE8DF;font-weight:600;color:#55504A;font-size:14px;">Space Type</td>
                  <td style="padding:14px 18px;border-bottom:1px solid #ECE8DF;color:#1C1C1A;font-size:14.5px;">${spaceType || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-weight:600;color:#55504A;font-size:14px;">Received At</td>
                  <td style="padding:14px 18px;color:#7A766F;font-size:13.5px;">${submissionTime}</td>
                </tr>
              </table>

              <!-- Notes / What they are noticing -->
              <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C33F4B;margin-bottom:12px;">
                WHAT CLIENT NOTICED IN THE SPACE
              </div>
              <div style="background-color:#F5F3EE;padding:18px 22px;border-radius:8px;border-left:4px solid #103F35;font-size:14.5px;line-height:1.6;color:#33312E;margin-bottom:28px;">
                ${notes ? notes.replace(/\n/g, '<br>') : '<em>No additional notes provided by client.</em>'}
              </div>

              <!-- Space Check 3-Step Quiz Details (if available) -->
              ${
                quizAnswers
                  ? `
              <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C33F4B;margin-bottom:12px;">
                2-MINUTE SPACE CHECK RESPONSES
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ECE8DF;border-radius:8px;background-color:#FAF9F6;margin-bottom:28px;">
                <tr>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE8DF;font-weight:600;color:#55504A;font-size:13.5px;width:38%;">Step 1 &bull; Space</td>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE8DF;color:#1C1C1A;font-size:14px;">${quizAnswers.spaceType || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE8DF;font-weight:600;color:#55504A;font-size:13.5px;">Step 2 &bull; Daily Feeling</td>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE8DF;color:#1C1C1A;font-size:14px;">${quizAnswers.feeling || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding:12px 18px;font-weight:600;color:#55504A;font-size:13.5px;">Step 3 &bull; Light &amp; Flow</td>
                  <td style="padding:12px 18px;color:#1C1C1A;font-size:14px;">${quizAnswers.light || 'N/A'}</td>
                </tr>
              </table>
              `
                  : ''
              }

              <!-- Direct Action Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top:8px;">
                    <a href="tel:${phone}" style="display:inline-block;padding:14px 28px;background-color:#103F35;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:600;border-radius:6px;margin-right:12px;">
                      Call ${name} &rarr;
                    </a>
                    <a href="mailto:${email}" style="display:inline-block;padding:14px 28px;background-color:#C33F4B;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:600;border-radius:6px;">
                      Reply by Email &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F5F3EE;padding:20px;text-align:center;font-size:12px;color:#858076;border-top:1px solid #ECE8DF;">
              Sent automatically from your Shrijal Talkar Modern Vastu website portal.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 2. Generate User Acknowledgment Email HTML
    const userHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Space Consultation Request Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1C1C1A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF9F5;padding:35px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.05);border:1px solid #EBE7DE;">
          
          <!-- Brand Top Banner -->
          <tr>
            <td style="background-color:#103F35;padding:36px 36px 32px;text-align:center;">
              <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#A3E7D0;font-weight:600;margin-bottom:10px;">
                SHRIJAL TALKAR
              </div>
              <h1 style="margin:0 0 6px 0;font-size:28px;color:#FFFFFF;font-weight:400;font-family:Georgia,serif;letter-spacing:-0.01em;">
                Your Space. On Your Side.
              </h1>
              <div style="font-size:13.5px;color:#E0F4EE;font-style:italic;">
                Modern Vastu for Business &amp; Home
              </div>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding:36px 38px;">
              <h2 style="margin:0 0 16px 0;font-size:22px;color:#1C1C1A;font-weight:500;font-family:Georgia,serif;">
                Dear ${name},
              </h2>

              <p style="font-size:15.5px;line-height:1.7;color:#3D3B36;margin-bottom:18px;">
                Thank you for reaching out and sharing the details of your space. Your consultation request and <strong>2-Minute Space Report</strong> have been successfully registered with Shrijal Talkar&apos;s desk.
              </p>

              <div style="background-color:#F5F9F7;border-left:4px solid #103F35;padding:18px 22px;border-radius:0 8px 8px 0;margin:24px 0;">
                <p style="margin:0;font-size:15px;line-height:1.65;color:#103F35;font-weight:500;">
                  &ldquo;Aapki report successfully submit ho gayi hai. Hamari team aapke space details ko review kar rahi hai aur bahut jald aapko update email milega tatha team aapse as soon as possible contact karegi.&rdquo;
                </p>
              </div>

              <!-- Summary Card -->
              <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C33F4B;margin:28px 0 12px 0;">
                YOUR SUBMISSION SUMMARY
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ECE7DE;border-radius:8px;background-color:#FAF9F6;margin-bottom:28px;">
                <tr>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE7DE;font-weight:600;color:#615C54;font-size:14px;width:38%;">Space Category</td>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE7DE;color:#1C1C1A;font-size:14px;font-weight:500;">${spaceType || 'General Consultation'}</td>
                </tr>
                <tr>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE7DE;font-weight:600;color:#615C54;font-size:14px;">Contact Phone</td>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE7DE;color:#1C1C1A;font-size:14px;">${phone}</td>
                </tr>
                ${
                  quizAnswers
                    ? `
                <tr>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE7DE;font-weight:600;color:#615C54;font-size:14px;">Identified Feeling</td>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE7DE;color:#1C1C1A;font-size:14px;">${quizAnswers.feeling || 'Evaluated'}</td>
                </tr>
                <tr>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE7DE;font-weight:600;color:#615C54;font-size:14px;">Light &amp; Circulation</td>
                  <td style="padding:12px 18px;border-bottom:1px solid #ECE7DE;color:#1C1C1A;font-size:14px;">${quizAnswers.light || 'Evaluated'}</td>
                </tr>
                `
                    : ''
                }
                <tr>
                  <td style="padding:12px 18px;font-weight:600;color:#615C54;font-size:14px;">Status</td>
                  <td style="padding:12px 18px;color:#103F35;font-weight:600;font-size:14px;">Under Review &bull; Priority Queue</td>
                </tr>
              </table>

              <!-- Core Philosophy Quote -->
              <div style="background-color:#FAF2F4;border-left:3px solid #C33F4B;padding:16px 20px;border-radius:0 6px 6px 0;margin-bottom:28px;">
                <p style="margin:0 0 6px 0;font-size:13px;color:#8C2234;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">
                  OUR CORE PHILOSOPHY
                </p>
                <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:16px;line-height:1.55;color:#3D1822;">
                  &ldquo;Don&apos;t fear your space. Understand it. The first step is not a remedy. The first step is clarity.&rdquo;
                </p>
              </div>

              <!-- Sign-off -->
              <p style="font-size:15px;line-height:1.7;color:#3D3B36;margin-bottom:24px;">
                Warm regards,<br>
                <strong style="color:#103F35;font-size:16px;">Shrijal Talkar</strong><br>
                <span style="font-size:13.5px;color:#6B665E;">
                  Modern Vastu Expert &amp; Author<br>
                  Gold Medalist in Vastu &bull; Trained under Aashish Patidar<br>
                  Author of <em>The Space on Your Side</em>
                </span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F5F3EE;padding:24px 36px;text-align:center;font-size:12.5px;color:#787369;border-top:1px solid #ECE7DE;line-height:1.6;">
              &copy; ${new Date().getFullYear()} Shrijal Talkar. All rights reserved.<br>
              Business Vastu &bull; Home Vastu &bull; Modern Energy Architecture
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 3. Dispatch Emails via Nodemailer
    if (isPlaceholder) {
      console.warn(
        '[SMTP Notice] SMTP_USER or SMTP_PASS is not configured in .env. Email dispatch simulated in development mode.'
      );
      return Response.json({
        success: true,
        simulated: true,
        message:
          'Consultation report submitted successfully. (SMTP simulated in development until credentials are set in .env)',
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send Admin Notification
    const adminMailPromise = transporter.sendMail({
      from: `"${fromName}" <${smtpUser}>`,
      to: adminEmail,
      replyTo: email,
      subject: `🌟 New Consultation & Space Report: ${name} (${spaceType || 'General'})`,
      html: adminHtml,
    });

    // Send User Acknowledgment
    const userMailPromise = transporter.sendMail({
      from: `"${fromName}" <${smtpUser}>`,
      to: email,
      subject: `Your Space Report & Consultation Confirmation — Shrijal Talkar`,
      html: userHtml,
    });

    console.log(`[Consultation API] Dispatching consultation report for: ${name} (${email}) to admin: ${adminEmail}`);

    const [adminResult, userResult] = await Promise.allSettled([adminMailPromise, userMailPromise]);

    if (adminResult.status === 'rejected') {
      console.error('[Consultation API] Failed to send admin email:', adminResult.reason);
    } else {
      console.log('[Consultation API] Admin email delivered successfully! MessageId:', adminResult.value?.messageId);
    }

    if (userResult.status === 'rejected') {
      console.error('[Consultation API] Failed to send user acknowledgment:', userResult.reason);
    } else {
      console.log('[Consultation API] User acknowledgment delivered successfully! MessageId:', userResult.value?.messageId);
    }

    return Response.json({
      success: true,
      message: 'Consultation report submitted successfully and confirmation emails sent.',
    });
  } catch (err) {
    console.error('[Consultation API Error]:', err);
    return Response.json(
      {
        error:
          'An error occurred while submitting your consultation report. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}

