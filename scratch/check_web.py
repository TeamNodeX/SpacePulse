import urllib.request
import re

html = urllib.request.urlopen('http://localhost:8080/index.html').read().decode()
print('index.html size:', len(html))
assert 'id="student-login-page" style="display: none;"' in html, 'student-login-page not hidden!'
assert 'https://webmail.uom.lk/' in html, 'webmail.uom.lk not found in HTML!'
assert not re.search(r'(?<!web)mail\.uom\.lk', html), 'Old standalone mail.uom.lk still found in HTML!'
print('HTML verification SUCCESS!')

app_js = urllib.request.urlopen('http://localhost:8080/app.js').read().decode()
print('app.js size:', len(app_js))
assert 'webmail.uom.lk' in app_js, 'webmail.uom.lk not found in app.js!'
assert not re.search(r'(?<!web)mail\.uom\.lk', app_js), 'Old standalone mail.uom.lk still found in app.js!'
assert 'showStudentLoginPage()' not in app_js.split('DOMContentLoaded')[1].split('});')[0], 'showStudentLoginPage still called in DOMContentLoaded!'
print('app.js verification SUCCESS!')
