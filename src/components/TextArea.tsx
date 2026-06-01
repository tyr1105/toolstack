interface TextAreaProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  className?: string;
}

// 通用文本输入区域
function TextArea({ value, onChange, placeholder, readOnly = false, rows = 12, className = '' }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      placeholder={placeholder}
      readOnly={readOnly}
      rows={rows}
      className={`w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 resize-y font-mono ${readOnly ? 'cursor-default' : ''} ${className}`}
    />
  );
}

export default TextArea;
