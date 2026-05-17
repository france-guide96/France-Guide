import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(3).max(50),
  message: z.string().min(1).max(3000),
  honeypot: z.string().optional(),
  tourTitle: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  guests: z.string().optional(),
  price: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) throw new Error("Missing ENV variables");

    const resend = new Resend(apiKey);
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 },
      );
    }

    const {
      name,
      email,
      phone,
      message,
      tourTitle,
      date,
      time,
      guests,
      price,
      honeypot,
    } = parsed.data;

    if (honeypot?.trim()) return NextResponse.json({ success: true });

    const subject = tourTitle
      ? `🚀 БРОНЬ: ${tourTitle} — ${name}`
      : `✉️ Сообщение от ${name}`;

    await resend.emails.send({
      from: "France Guide <noreply@france-gid.ru>",
      to: toEmail,
      replyTo: email,
      subject: subject,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #ca8a04; padding: 24px; color: white;">
            <h1 style="margin: 0; font-size: 20px;">${tourTitle ? "Новое бронирование" : "Новое сообщение"}</h1>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            ${
              tourTitle
                ? `
              <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0;"><strong>Тур:</strong> ${tourTitle}</p>
                <p style="margin: 0 0 8px 0;"><strong>Дата и время:</strong> ${date} в ${time}</p>
                <p style="margin: 0 0 8px 0;"><strong>Кол-во человек:</strong> ${guests}</p>
                <p style="margin: 0;"><strong>К оплате:</strong> <span style="color: #ca8a04; font-weight: bold;">${price}</span></p>
              </div>
            `
                : ""
            }
            
            <p style="margin: 0 0 12px 0;"><strong>Клиент:</strong> ${name}</p>
            <p style="margin: 0 0 12px 0;"><strong>Телефон:</strong> ${phone}</p>
            <p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${email}</p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Сообщение / Комментарий:</p>
              <p style="margin: 0; line-height: 1.6;">${message || "—"}</p>
            </div>
          </div>
          <div style="background-color: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
            Это автоматическое уведомление с сайта France Guide
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
