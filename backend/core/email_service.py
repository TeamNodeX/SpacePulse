"""
SpacePulse - University Webmail & SMTP Service
Handles email delivery to University of Moratuwa webmail addresses (@uom.lk, @*.mrt.ac.lk).
Supports both real SMTP relay (Office365 / Gmail / Custom SMTP) and internal Webmail Mailbox store.
"""
import os
import time
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Dict, Any, Optional

logger = logging.getLogger("spacepulse.email")

class EmailService:
    def __init__(self):
        # SMTP Server Configuration (Optional for real outbound relay)
        self.smtp_host = os.getenv("SMTP_HOST", "")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_user = os.getenv("SMTP_USER", "")
        self.smtp_password = os.getenv("SMTP_PASSWORD", "")
        self.smtp_use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"
        self.smtp_from = os.getenv("SMTP_FROM_EMAIL", "spacepulse-auth@uom.lk")

        # In-memory University Webmail Mailbox store (email -> List[Message])
        # Allows viewing official university webmail directly from the browser/kiosk
        self.inbox_store: List[Dict[str, Any]] = []

    def is_smtp_configured(self) -> bool:
        return bool(self.smtp_host and self.smtp_user and self.smtp_password)

    def generate_email_html(self, to_email: str, code: str, student_name: str) -> str:
        display_name = student_name or to_email.split('@')[0].upper()
        formatted_code = f"{code[:3]} {code[3:]}"
        return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>SpacePulse Verification Code</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a;">
    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #cbd5e1; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
        <!-- University Header Bar -->
        <div style="background: linear-gradient(135deg, #881337 0%, #4c0519 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
            <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 800; opacity: 0.85; margin-bottom: 6px;">UNIVERSITY OF MORATUWA</div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">SpacePulse Student Verification</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Real-Time Vacancy Tracking & University Navigation</p>
        </div>

        <!-- Body Content -->
        <div style="padding: 32px 28px;">
            <p style="font-size: 15px; margin-top: 0; color: #334155;">Hello <strong>{display_name}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                A sign-in request was initiated for your official University of Moratuwa account (<strong>{to_email}</strong>) on the <strong>SpacePulse Web App</strong>.
            </p>

            <div style="margin: 28px 0; text-align: center;">
                <div style="display: inline-block; background: #f8fafc; border: 2px dashed #0284c7; border-radius: 12px; padding: 18px 36px;">
                    <div style="font-size: 11px; font-weight: 800; color: #0284c7; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;">YOUR VERIFICATION CODE</div>
                    <div style="font-family: monospace, Consolas, sans-serif; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #0f172a;">
                        {formatted_code}
                    </div>
                    <div style="font-size: 12px; color: #64748b; margin-top: 6px;">Valid for <strong>10 minutes</strong></div>
                </div>
            </div>

            <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin-bottom: 24px;">
                Enter this 6-digit code on the SpacePulse login screen to verify your student identity. This unlocks 30-minute library seat holds, high-accuracy CAD floor plans, and real-time crowd alerts.
            </p>

            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; font-size: 12px; color: #1e40af;">
                <strong>Security Notice:</strong> If you did not request this verification code, please ignore this email. Do not share this code with anyone.
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8;">
            <div>University of Moratuwa, Katubedda, Moratuwa 10400, Sri Lanka</div>
            <div style="margin-top: 4px;">SpacePulse Project • Team NodeX Telemetry Infrastructure</div>
        </div>
    </div>
</body>
</html>"""

    def send_verification_code(self, to_email: str, code: str, student_name: str = "") -> Dict[str, Any]:
        """
        Dispatches verification code to university webmail.
        Always stores in the University Webmail mailbox store and attempts SMTP if configured.
        """
        timestamp = time.time()
        date_str = time.strftime("%b %d, %Y - %I:%M %p", time.localtime(timestamp))
        msg_id = f"msg_{int(timestamp)}_{code[:4]}"
        subject = f"SpacePulse Verification Code: {code[:3]} {code[3:]}"
        html_content = self.generate_email_html(to_email, code, student_name)
        text_content = f"Your SpacePulse verification code is: {code}. Valid for 10 minutes."

        # 1. Store in University Webmail Mailbox
        email_record = {
            "id": msg_id,
            "sender": "SpacePulse Security <no-reply@uom.lk>",
            "recipient": to_email,
            "subject": subject,
            "code": code,
            "body_text": text_content,
            "body_html": html_content,
            "timestamp": timestamp,
            "date_str": date_str,
            "is_read": False
        }
        self.inbox_store.insert(0, email_record)

        smtp_dispatched = False
        smtp_error = None

        # 2. Outbound SMTP Delivery if credentials provided
        if self.is_smtp_configured():
            try:
                msg = MIMEMultipart("alternative")
                msg["Subject"] = subject
                msg["From"] = f"SpacePulse UoM <{self.smtp_from}>"
                msg["To"] = to_email

                part1 = MIMEText(text_content, "plain")
                part2 = MIMEText(html_content, "html")
                msg.attach(part1)
                msg.attach(part2)

                server = smtplib.SMTP(self.smtp_host, self.smtp_port, timeout=10)
                if self.smtp_use_tls:
                    server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.sendmail(self.smtp_from, [to_email], msg.as_string())
                server.quit()
                smtp_dispatched = True
                logger.info(f"Successfully relayed verification email via SMTP to {to_email}")
            except Exception as e:
                smtp_error = str(e)
                logger.warning(f"SMTP relay failed (message stored in webmail mailbox): {e}")

        return {
            "status": "ok",
            "message_id": msg_id,
            "recipient": to_email,
            "smtp_dispatched": smtp_dispatched,
            "smtp_error": smtp_error,
            "stored_in_webmail": True
        }

    def get_inbox_messages(self, recipient_email: Optional[str] = None) -> List[Dict[str, Any]]:
        """Returns messages stored in university webmail, optionally filtered by recipient."""
        if not recipient_email:
            return self.inbox_store

        clean_recip = recipient_email.strip().lower()
        return [
            m for m in self.inbox_store
            if m["recipient"].strip().lower() == clean_recip
        ]

    def get_message_by_id(self, msg_id: str) -> Optional[Dict[str, Any]]:
        for m in self.inbox_store:
            if m["id"] == msg_id:
                m["is_read"] = True
                return m
        return None

email_service = EmailService()
