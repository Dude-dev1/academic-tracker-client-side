const fs = require('fs');
const file = 'src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('useWebNotifications')) {
  content = content.replace(/import \{ useTheme \} from "\.\/context\/ThemeContext";/, 'import { useTheme } from "./context/ThemeContext";\nimport useWebNotifications from "./hooks/useWebNotifications";');
  content = content.replace(/const \{ user \} = useAuth\(\);/, 'const { user } = useAuth();\n  useWebNotifications();');
  fs.writeFileSync(file, content);
}

