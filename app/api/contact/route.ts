import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Try Resend if API key is available
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resendModule = await import('resend');
      const resend = new resendModule.Resend(resendKey);
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@jaaytechnology.com',
        to: 'jaaytechnology@gmail.com',
        subject: `[Jaay Technology] Contact from ${name}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f97316;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f4f4f5; padding: 16px; border-radius: 8px; margin-top: 8px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;">
            <p style="color: #71717a; font-size: 12px;">Sent from jaaytechnology.com contact form</p>
          </div>
        `,
        replyTo: email,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
