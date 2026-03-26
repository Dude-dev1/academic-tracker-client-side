const fs = require('fs');
const file = 'src/hooks/useWebNotifications.js';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('useToast')) {
  content = content.replace(
    /import { useAuth } from '\.\.\/context\/AuthContext';/,
    "import { useAuth } from '../context/AuthContext';\nimport { useToast } from '../context/ToastContext';"
  );

  content = content.replace(
    /const \{ user \} = useAuth\(\);/,
    "const { user } = useAuth();\n  const { addToast } = useToast();"
  );

  content = content.replace(
    /new Notification\(title, \{ body, icon: '\/favicon\.ico' \}\);/,
    "new Notification(title, { body, icon: '/favicon.ico' });\n              addToast(title, body, type);"
  );

  fs.writeFileSync(file, content);
}
