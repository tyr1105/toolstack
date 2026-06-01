import { useState } from 'react';
import CopyButton from '../components/CopyButton';

// JSON格式化工具 - 格式化、验证、压缩JSON数据
function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  // 格式化JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  // 压缩JSON
  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  // 排序JSON键名
  const sortKeys = () => {
    try {
      const parsed = JSON.parse(input);
      const sorted = sortObjectKeys(parsed);
      setOutput(JSON.stringify(sorted, null, indent));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  // 递归排序对象键名
  const sortObjectKeys = (obj: unknown): unknown => {
    if (Array.isArray(obj)) return obj.map(sortObjectKeys);
    if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj as Record<string, unknown>)
        .sort()
        .reduce((acc: Record<string, unknown>, key) => {
          acc[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
          return acc;
        }, {});
    }
    return obj;
  };

  // 加载示例数据
  const loadExample = () => {
    setInput(JSON.stringify({
      "name": "ToolStack",
      "version": "1.0.0",
      "description": "Free developer tools",
      "tools": ["json", "base64", "jwt"],
      "config": { "theme": "dark", "lang": "en" }
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button onClick={formatJson} className="btn-primary">Format</button>
        <button onClick={minifyJson} className="btn-secondary">Minify</button>
        <button onClick={sortKeys} className="btn-secondary">Sort Keys</button>
        <select
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={1}>1 tab</option>
        </select>
        <button onClick={loadExample} className="btn-secondary">Example</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn-secondary">Clear</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here...'
            rows={16}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-zinc-400">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-400 font-mono">
              {error}
            </div>
          ) : (
            <textarea
              value={output}
              readOnly
              placeholder="Formatted output will appear here..."
              rows={16}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-green-400 placeholder-zinc-600 font-mono resize-y cursor-default"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default JsonFormatter;
