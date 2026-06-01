import { useState } from 'react';
import CopyButton from '../components/CopyButton';

// 安全密码生成器
function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [passwords, setPasswords] = useState<string[]>([]);

  const generatePassword = (): string => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
    
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (n) => chars[n % chars.length]).join('');
  };

  const generate = () => {
    setPasswords(Array.from({ length: count }, generatePassword));
  };

  // 计算密码强度
  const getStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (pw.length >= 16) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 3) return { label: 'Weak', color: 'text-red-400', bg: 'bg-red-500/20' };
    if (score <= 5) return { label: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    return { label: 'Strong', color: 'text-green-400', bg: 'bg-green-500/20' };
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-400">Length:</label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-24" />
          <span className="text-sm text-zinc-300 w-6">{length}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-400">Count:</label>
          <input type="number" value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))} min={1} max={20} className="w-16 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300" />
        </div>
        <button onClick={generate} className="btn-primary">Generate</button>
      </div>
      <div className="flex gap-3 flex-wrap">
        {(['uppercase', 'lowercase', 'numbers', 'symbols'] as const).map(opt => (
          <label key={opt} className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer capitalize">
            <input type="checkbox" checked={options[opt]} onChange={(e) => setOptions({ ...options, [opt]: e.target.checked })} className="rounded" />
            {opt}
          </label>
        ))}
      </div>
      {passwords.length > 0 && (
        <div className="space-y-2">
          {passwords.map((pw, i) => {
            const strength = getStrength(pw);
            return (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-3 flex items-center gap-3">
                <span className="text-xs text-zinc-600 w-5">{i + 1}.</span>
                <code className="flex-1 text-sm text-green-400 font-mono break-all">{pw}</code>
                <span className={`text-xs px-2 py-0.5 rounded ${strength.bg} ${strength.color}`}>{strength.label}</span>
                <CopyButton text={pw} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default PasswordGenerator;
