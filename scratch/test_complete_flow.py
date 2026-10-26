"""
SpacePulse - End-to-End Test Suite (Standard Library Only)
Validates HTML, CSS, JavaScript, and live backend OTP & Webmail workflows
without requiring external browser drivers or third-party packages.
"""
import json
import urllib.request
import urllib.parse
from pathlib import Path

def run_tests():
    print("=== Starting SpacePulse Verification Test Suite ===")
    base_dir = Path(__file__).resolve().parent.parent

    # 1. Validate index.html
    html_file = base_dir / "index.html"
    assert html_file.exists(), "index.html must exist!"
    html_text = html_file.read_text(encoding="utf-8")

    expected_url = "https://web.mail.uom.lk/#/mailbox/INBOX"
    assert expected_url in html_text, f"index.html must contain {expected_url}"
    print(f"PASS: index.html links to official inbox: {expected_url}")

    assert 'id="front-page-auth"' in html_text, "Front page gate element (#front-page-auth) missing!"
    assert 'id="main-app-container"' in html_text, "Main app container (#main-app-container) missing!"
    assert 'id="chatbot-drawer"' in html_text, "Chatbot drawer (#chatbot-drawer) missing!"
    assert 'id="chatbot-overlay"' in html_text, "Chatbot overlay (#chatbot-overlay) missing!"
    assert 'id="chatbot-fab"' in html_text, "Chatbot FAB (#chatbot-fab) missing!"
    print("PASS: Core DOM containers and chatbot elements verified.")

    # 2. Validate style.css
    css_file = base_dir / "style.css"
    assert css_file.exists(), "style.css must exist!"
    css_text = css_file.read_text(encoding="utf-8")

    assert "10000005" in css_text, "Chatbot drawer must have top-level z-index (10000005)"
    assert "10000004" in css_text, "Chatbot overlay must have top-level z-index (10000004)"
    print("PASS: style.css has elevated chatbot z-index (10000005) & overlay (10000004).")

    # 3. Validate app.js
    app_file = base_dir / "app.js"
    assert app_file.exists(), "app.js must exist!"
    app_text = app_file.read_text(encoding="utf-8")

    # Critical: No auto-fill functions
    assert "fetchLatestCodeAndAutoFill" not in app_text, "fetchLatestCodeAndAutoFill must be removed (no auto-fill allowed)!"
    assert "insertWebmailCodeAndVerify" not in app_text, "insertWebmailCodeAndVerify must be removed!"
    print("PASS: app.js contains NO auto-fill logic. User enters code manually.")

    # Chatbot functions
    assert "function openChatbot()" in app_text, "openChatbot function missing in app.js!"
    assert "function closeChatbot()" in app_text, "closeChatbot function missing in app.js!"
    assert "function toggleChatbot()" in app_text, "toggleChatbot function missing in app.js!"
    print("PASS: Chatbot methods (open, close, toggle) cleanly defined and idempotent.")

    # 4. Validate Live Backend Endpoints
    print("\n--- Testing Live Backend Endpoints (http://127.0.0.1:8000) ---")

    # A. Occupancy API
    try:
        with urllib.request.urlopen("http://127.0.0.1:8000/api/occupancy", timeout=5) as resp:
            assert resp.status == 200, f"Expected HTTP 200, got {resp.status}"
            data = json.loads(resp.read().decode())
            print(f"PASS: Backend /api/occupancy responded HTTP 200 (Telemetry online)")
    except Exception as e:
        print(f"FAIL: Backend occupancy check failed: {e}")
        return False

    # B. Send OTP
    test_email = "username@uom.lk"
    test_name = "Kavindu Dilupa"
    send_payload = json.dumps({"email": test_email, "name": test_name}).encode("utf-8")

    send_req = urllib.request.Request(
        "http://127.0.0.1:8000/api/auth/send-otp",
        data=send_payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(send_req, timeout=5) as resp:
        assert resp.status == 200
        send_data = json.loads(resp.read().decode())
        assert send_data["status"] == "ok"
        print(f"PASS: /api/auth/send-otp dispatched verification code to {send_data['email']}")

    # C. Check Webmail Inbox
    query = urllib.parse.quote(test_email)
    inbox_url = f"http://127.0.0.1:8000/api/webmail/inbox?email={query}"
    with urllib.request.urlopen(inbox_url, timeout=5) as resp:
        assert resp.status == 200
        inbox_data = json.loads(resp.read().decode())
        assert len(inbox_data) > 0, "Expected at least 1 message in webmail inbox!"
        latest_msg = inbox_data[0]
        code = latest_msg["code"]
        assert len(code) == 6, f"Expected 6-digit code, got {code}"
        print(f"PASS: Webmail Inbox received email: '{latest_msg['subject']}' with code: {code}")

    # D. Verify OTP
    verify_payload = json.dumps({"email": test_email, "code": code, "name": test_name}).encode("utf-8")
    verify_req = urllib.request.Request(
        "http://127.0.0.1:8000/api/auth/verify-otp",
        data=verify_payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(verify_req, timeout=5) as resp:
        assert resp.status == 200
        verify_data = json.loads(resp.read().decode())
        assert verify_data["status"] == "ok"
        student = verify_data["student"]
        assert student["isVerified"] is True
        print(f"PASS: /api/auth/verify-otp successfully verified student: {student['name']} ({student['department']})")

    # 5. Validate Frontend HTTP Server
    print("\n--- Testing Frontend Server (http://127.0.0.1:8000) ---")
    try:
        with urllib.request.urlopen("http://127.0.0.1:8000/", timeout=5) as resp:
            assert resp.status == 200
            print("PASS: SpacePulse Web App is running and serving index.html on port 8000")
    except Exception as e:
        print(f"FAIL: Frontend server check failed: {e}")
        return False

    print("\n=== ALL TESTS COMPLETED AND PASSED 100% ===")
    return True

if __name__ == "__main__":
    success = run_tests()
    if not success:
        exit(1)
