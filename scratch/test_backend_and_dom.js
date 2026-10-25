const fs = require('fs');
const http = require('http');

console.log("=== Running SpacePulse Validation Tests ===");

// 1. Validate index.html
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Check that webmail inbox URL is exact
const expectedUrl = 'https://web.mail.uom.lk/#/mailbox/INBOX';
if (!htmlContent.includes(expectedUrl)) {
    console.error("FAIL: index.html does not contain " + expectedUrl);
    process.exit(1);
} else {
    console.log("PASS: index.html contains exact UoM Webmail Inbox URL: " + expectedUrl);
}

// Check front gate container and main app container
if (!htmlContent.includes('id="front-page-auth"') || !htmlContent.includes('id="main-app-container"')) {
    console.error("FAIL: missing front-page-auth or main-app-container");
    process.exit(1);
} else {
    console.log("PASS: Front gate (#front-page-auth) and Main App (#main-app-container) verified in DOM");
}

// Check chatbot elements
if (!htmlContent.includes('id="chatbot-drawer"') || !htmlContent.includes('id="chatbot-overlay"') || !htmlContent.includes('id="chatbot-fab"')) {
    console.error("FAIL: missing chatbot elements");
    process.exit(1);
} else {
    console.log("PASS: Chatbot drawer, overlay, and FAB verified in DOM");
}

// 2. Validate style.css z-index
const cssContent = fs.readFileSync('style.css', 'utf8');
if (!cssContent.includes('10000005') || !cssContent.includes('10000004')) {
    console.error("FAIL: style.css does not have elevated z-indexes for chatbot");
    process.exit(1);
} else {
    console.log("PASS: style.css has elevated chatbot z-index (10000005) and overlay (10000004)");
}

// 3. Validate app.js
const appJsContent = fs.readFileSync('app.js', 'utf8');

// Ensure NO fetchLatestCodeAndAutoFill
if (appJsContent.includes('fetchLatestCodeAndAutoFill')) {
    console.error("FAIL: fetchLatestCodeAndAutoFill should NOT be present in app.js!");
    process.exit(1);
} else {
    console.log("PASS: fetchLatestCodeAndAutoFill was completely removed (NO auto-filling!)");
}

// Ensure NO auto-insert
if (appJsContent.includes('insertWebmailCodeAndVerify')) {
    console.error("FAIL: insertWebmailCodeAndVerify should NOT be present in app.js!");
    process.exit(1);
} else {
    console.log("PASS: insertWebmailCodeAndVerify was removed (manual typing required!)");
}

// Ensure openChatbot, closeChatbot, and toggleChatbot exist
if (!appJsContent.includes('function openChatbot()') || !appJsContent.includes('function closeChatbot()') || !appJsContent.includes('function toggleChatbot()')) {
    console.error("FAIL: missing chatbot drawer functions");
    process.exit(1);
} else {
    console.log("PASS: openChatbot, closeChatbot, and toggleChatbot cleanly defined");
}

// 4. Test Backend API: send-otp -> inbox -> verify-otp
async function testApi() {
    console.log("Testing backend OTP dispatch and verification endpoints...");

    const email = "210088X@uom.lk";
    const name = "Kavindu Dilupa";

    // Step A: Send OTP
    const sendData = JSON.stringify({ email, name });
    const sendRes = await fetch("http://127.0.0.1:8000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: sendData
    });
    const sendJson = await sendRes.json();
    console.log("send-otp response:", sendJson);
    if (sendJson.status !== "ok") {
        console.error("FAIL: send-otp failed:", sendJson);
        process.exit(1);
    }
    console.log("PASS: send-otp dispatched successfully!");

    // Step B: Get message from webmail inbox
    const inboxRes = await fetch(`http://127.0.0.1:8000/api/webmail/inbox?email=${encodeURIComponent(email)}`);
    const messages = await inboxRes.json();
    console.log(`Webmail inbox returned ${messages.length} message(s)`);
    if (!Array.isArray(messages) || messages.length === 0) {
        console.error("FAIL: no messages found in webmail inbox!");
        process.exit(1);
    }
    const latestCode = messages[0].code;
    console.log(`PASS: Verification code retrieved from Webmail Inbox: ${latestCode}`);

    // Step C: Verify OTP
    const verifyData = JSON.stringify({ email, code: latestCode, name });
    const verifyRes = await fetch("http://127.0.0.1:8000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: verifyData
    });
    const verifyJson = await verifyRes.json();
    console.log("verify-otp response:", verifyJson);
    if (verifyJson.status !== "ok" || !verifyJson.student || !verifyJson.token) {
        console.error("FAIL: verify-otp failed:", verifyJson);
        process.exit(1);
    }
    console.log(`PASS: Student Verified! Name: ${verifyJson.student.name}, Dept: ${verifyJson.student.department}, Token: ${verifyJson.token}`);
    console.log("=== ALL VALIDATION TESTS PASSED 100% ===");
}

testApi().catch(err => {
    console.error("Test error:", err);
    process.exit(1);
});
