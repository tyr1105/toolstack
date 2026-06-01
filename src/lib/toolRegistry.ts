// 工具注册表 - 定义所有可用工具的元数据
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  keywords: string[];
}

// 所有工具列表
export const tools: Tool[] = [
  { id: 'json', name: 'JSON Formatter', description: 'Format, validate, and minify JSON data', icon: '📦', keywords: ['json', 'format', 'validate', 'minify', 'beautify'] },
  { id: 'base64', name: 'Base64 Codec', description: 'Encode and decode Base64 strings', icon: '🔐', keywords: ['base64', 'encode', 'decode', 'binary'] },
  { id: 'jwt', name: 'JWT Decoder', description: 'Decode and inspect JWT tokens', icon: '🔑', keywords: ['jwt', 'token', 'decode', 'oauth', 'auth'] },
  { id: 'hash', name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes', icon: '#️⃣', keywords: ['hash', 'md5', 'sha', 'sha256', 'sha512', 'digest'] },
  { id: 'color', name: 'Color Converter', description: 'Convert between HEX, RGB, HSL colors', icon: '🎨', keywords: ['color', 'hex', 'rgb', 'hsl', 'converter', 'picker'] },
  { id: 'url', name: 'URL Encoder', description: 'Encode and decode URL strings', icon: '🔗', keywords: ['url', 'encode', 'decode', 'percent', 'uri'] },
  { id: 'regex', name: 'Regex Tester', description: 'Test and debug regular expressions', icon: '🔍', keywords: ['regex', 'regexp', 'regular', 'expression', 'test', 'match'] },
  { id: 'lorem', name: 'Lorem Ipsum', description: 'Generate placeholder text', icon: '📝', keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'dummy'] },
  { id: 'uuid', name: 'UUID Generator', description: 'Generate random UUIDs (v4)', icon: '🆔', keywords: ['uuid', 'guid', 'random', 'id', 'unique'] },
  { id: 'password', name: 'Password Gen', description: 'Generate secure random passwords', icon: '🔒', keywords: ['password', 'generator', 'random', 'secure', 'strong'] },
  { id: 'timestamp', name: 'Timestamp', description: 'Convert Unix timestamps to dates', icon: '⏰', keywords: ['timestamp', 'unix', 'epoch', 'date', 'time', 'convert'] },
  { id: 'markdown', name: 'Markdown Preview', description: 'Write Markdown and see live preview', icon: '📄', keywords: ['markdown', 'md', 'preview', 'render', 'write'] },
  { id: 'cron', name: 'Cron Parser', description: 'Parse and explain cron expressions', icon: '⏱', keywords: ['cron', 'schedule', 'expression', 'parse', 'explain'] },
  { id: 'diff', name: 'Diff Checker', description: 'Compare two texts side by side', icon: '📊', keywords: ['diff', 'compare', 'text', 'difference', 'side by side'] },
  { id: 'gradient', name: 'CSS Gradient', description: 'Build beautiful CSS gradients visually', icon: '🌈', keywords: ['gradient', 'css', 'background', 'linear', 'radial'] },
];

// 根据id查找工具
export function getTool(id: string): Tool | undefined {
  return tools.find(t => t.id === id);
}
