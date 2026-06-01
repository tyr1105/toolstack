import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

// 复制到剪贴板按钮
function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 降级方案：使用旧API
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
        copied
          ? 'bg-green-500/20 text-green-400'
          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
      } ${className}`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

export default CopyButton;
