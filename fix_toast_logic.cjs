const fs = require('fs');
const file = 'src/hooks/useWebNotifications.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /if \(Notification\.permission === "granted"\) \{\n\s*new Notification\(title, \{ body, icon: '\/favicon\.ico' \}\);\n\s*addToast\(title, body, type\);\n\s*\}/g,
  `if (Notification.permission === "granted") {
                new Notification(title, { body, icon: '/favicon.ico' });
              }
              addToast(title, body, type);`
);

fs.writeFileSync(file, content);
