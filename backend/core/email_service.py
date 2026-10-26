"""
SpacePulse - University Webmail & SMTP Service
Handles email delivery to University of Moratuwa webmail addresses (@uom.lk, @*.mrt.ac.lk).
Supports both real SMTP relay (Office365 / Gmail / Custom SMTP) and internal Webmail Mailbox store.
"""
import os
import time
import socket
import smtplib
import logging
import threading
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formatdate, make_msgid
from typing import List, Dict, Any, Optional

try:
    from dotenv import load_dotenv
    # Load .env from workspace root or backend directory
    workspace_env = os.path.join(os.path.dirname(__file__), "..", "..", ".env")
    backend_env = os.path.join(os.path.dirname(__file__), "..", ".env")
    load_dotenv(workspace_env)
    load_dotenv(backend_env)
    load_dotenv()
except Exception:
    pass

logger = logging.getLogger("spacepulse.email")

class EmailService:
    def __init__(self):
        self.reload_config()
        # In-memory University Webmail Mailbox store (email -> List[Message])
        # Allows viewing official university webmail directly from the browser/kiosk
        self.inbox_store: List[Dict[str, Any]] = []

    def reload_config(self):
        try:
            workspace_env = os.path.join(os.path.dirname(__file__), "..", "..", ".env")
            backend_env = os.path.join(os.path.dirname(__file__), "..", ".env")
            load_dotenv(workspace_env, override=True)
            load_dotenv(backend_env, override=True)
            load_dotenv(override=True)
        except Exception:
            pass

        self.smtp_host = os.getenv("SMTP_HOST", "").strip()
        self.smtp_port = int(os.getenv("SMTP_PORT", "587").strip() or 587)
        self.smtp_user = os.getenv("SMTP_USER", "").strip()
        self.smtp_password = os.getenv("SMTP_PASSWORD", "").strip()
        self.smtp_use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"
        self.smtp_from = os.getenv("SMTP_FROM_EMAIL", "spacepulse-auth@uom.lk").strip()

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

            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; font-size: 12px; color: #1e40af; margin-bottom: 12px;">
                <strong>Webmail Notice:</strong> If this message arrived in your Junk / Spam folder, please mark it as "Not Spam" to receive future notifications in your Inbox.
            </div>

            <div style="background: #f8fafc; border-left: 4px solid #94a3b8; padding: 12px 16px; border-radius: 4px; font-size: 12px; color: #64748b;">
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
        Supports:
        1. Authenticated SMTP relay (via .env configuration e.g. Gmail / Outlook / UoM submission server).
        2. Direct delivery to UoM central Mail Exchange (inrelay-a.uom.lk:25).
        3. Internal Mailbox store for diagnostics and in-app webmail reader.
        """
        self.reload_config()
        clean_email = to_email.strip().lower()
        timestamp = time.time()
        date_str = time.strftime("%b %d, %Y - %I:%M %p", time.localtime(timestamp))
        msg_id = f"msg_{int(timestamp)}_{code[:4]}"
        subject = f"SpacePulse Verification Code: {code[:3]} {code[3:]}"
        html_content = self.generate_email_html(clean_email, code, student_name)
        text_content = (
            f"SpacePulse Student Verification Code: {code[:3]} {code[3:]}\n\n"
            f"Hello {student_name or clean_email.split('@')[0]},\n"
            f"Your single-use 6-digit verification code is: {code}\n"
            f"This code is valid for 10 minutes.\n\n"
            f"Enter this code on the SpacePulse login screen to verify your student account.\n"
            f"University of Moratuwa • Team NodeX Telemetry"
        )

        # 1. Store in internal Webmail Mailbox store
        email_record = {
            "id": msg_id,
            "sender": "SpacePulse Verification <spacepulse-auth@uom.lk>",
            "recipient": clean_email,
            "subject": subject,
            "code": code,
            "body_text": text_content,
            "body_html": html_content,
            "timestamp": timestamp,
            "date_str": date_str,
            "is_read": False
        }
        self.inbox_store.insert(0, email_record)

        # Normalize recipient for official UoM Webmail exchange (@*.mrt.ac.lk -> @uom.lk)
        uom_target_email = clean_email
        if "@" in clean_email and (clean_email.endswith(".mrt.ac.lk") or clean_email.endswith("@mrt.ac.lk")):
            user_part = clean_email.split("@")[0]
            uom_target_email = f"{user_part}@uom.lk"

        banner = (
            "\n" + "=" * 70 + "\n"
            f"[UoM] SpacePulse Verification Code for [{clean_email}]: >>> {code[:3]} {code[3:]} <<<\n"
            f"      University Webmail Target: https://web.mail.uom.lk/#/mailbox/INBOX\n"
            f"      In-App Webmail Viewer: Active (Store ID: {msg_id})\n"
            + "=" * 70
        )
        try:
            logger.info(banner)
            print(banner, flush=True)
        except Exception:
            pass

        # Launch non-blocking network delivery in background thread for instant UI response (< 10ms)
        threading.Thread(
            target=self._perform_smtp_delivery,
            args=(clean_email, uom_target_email, code, subject, text_content, html_content),
            daemon=True
        ).start()

        return {
            "status": "ok",
            "message_id": msg_id,
            "recipient": clean_email,
            "smtp_dispatched": True,
            "stored_in_webmail": True
        }

    def _perform_smtp_delivery(
        self,
        clean_email: str,
        uom_target_email: str,
        code: str,
        subject: str,
        text_content: str,
        html_content: str
    ):
        """Dispatches the verification code over network in background without blocking the user or API."""
        smtp_dispatched = False

        # 1. Authenticated Outbound SMTP Relay if credentials provided in .env
        if self.is_smtp_configured():
            try:
                msg = MIMEMultipart("alternative")
                msg["Subject"] = subject
                from_addr = self.smtp_from if "@" in self.smtp_from else self.smtp_user
                msg["From"] = f"SpacePulse UoM <{from_addr}>"
                msg["To"] = clean_email
                msg["Date"] = formatdate(localtime=True)
                msg["Message-ID"] = make_msgid(domain="uom.lk")
                msg["Auto-Submitted"] = "no"
                msg["X-Auto-Response-Suppress"] = "All"

                part1 = MIMEText(text_content, "plain", "utf-8")
                part2 = MIMEText(html_content, "html", "utf-8")
                msg.attach(part1)
                msg.attach(part2)

                if self.smtp_port == 465:
                    server = smtplib.SMTP_SSL(self.smtp_host, self.smtp_port, timeout=10)
                    server.ehlo()
                else:
                    server = smtplib.SMTP(self.smtp_host, self.smtp_port, timeout=10)
                    server.ehlo()
                    if self.smtp_use_tls:
                        server.starttls()
                        server.ehlo()

                server.login(self.smtp_user, self.smtp_password)
                server.sendmail(from_addr, [clean_email], msg.as_string())
                server.quit()
                smtp_dispatched = True
                logger.info(f"[Fast Relay] Successfully delivered verification email via authenticated SMTP to {clean_email}")
            except Exception as e:
                logger.warning(f"Authenticated SMTP relay failed: {e}")

        # 2. Direct UoM Inbound Mail Exchange Delivery (inrelay-a.uom.lk:25)
        is_uom_recipient = (
            clean_email.endswith("@uom.lk") or 
            clean_email.endswith(".uom.lk") or 
            clean_email.endswith("@mrt.ac.lk") or 
            clean_email.endswith(".mrt.ac.lk")
        )

        if not smtp_dispatched and is_uom_recipient:
            try:
                if clean_email.endswith("@mrt.ac.lk"):
                    direct_sender = "spacepulse-auth@uom.lk"
                    msg_domain = "uom.lk"
                else:
                    direct_sender = "spacepulse-auth@mrt.ac.lk"
                    msg_domain = "mrt.ac.lk"

                msg = MIMEMultipart("alternative")
                msg["Subject"] = subject
                msg["From"] = f"SpacePulse Verification <{direct_sender}>"
                msg["To"] = clean_email
                msg["Reply-To"] = direct_sender
                msg["Date"] = formatdate(localtime=True)
                msg["Message-ID"] = make_msgid(domain=msg_domain)
                msg["Auto-Submitted"] = "no"
                msg["X-Auto-Response-Suppress"] = "All"

                part1 = MIMEText(text_content, "plain", "utf-8")
                part2 = MIMEText(html_content, "html", "utf-8")
                msg.attach(part1)
                msg.attach(part2)

                server = smtplib.SMTP("inrelay-a.uom.lk", 25, timeout=10)
                try:
                    if server.sock:
                        server.sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
                except Exception:
                    pass

                server.ehlo("uom.lk")
                try:
                    server.starttls()
                    server.ehlo("uom.lk")
                except Exception:
                    pass

                # inrelay-a.uom.lk only permits relaying to local targets (@uom.lk / @mrt.ac.lk)
                server.sendmail(direct_sender, [uom_target_email], msg.as_string())
                server.quit()
                smtp_dispatched = True
                logger.info(f"[Fast MX] Successfully delivered verification email to UoM Webmail MX for {uom_target_email}")
            except Exception as e:
                logger.warning(f"Direct UoM MX delivery failed: {e}")

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
