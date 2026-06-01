import { useState } from 'react';
import CopyButton from '../components/CopyButton';

// Base64编码/解码工具
function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        // 编码：支持中文等Unicode字符
        const encoded = btoa(
          encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        );
        setOutput(encoded);
      } else {
        // 解码：还原Unicode字符
        const decoded = decodeURIComponent(
          Array.from(atob(input), (c) =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          ).join('')
        );
        setOutput(decoded);
      }
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('encode')}
          className={mode === 'encode' ? 'btn-primary' : 'btn-secondary'}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={mode === 'decode' ? 'btn-primary' : 'btn-secondary'}
        >
          Decode
        </button>
        <button onClick={handleProcess} className="btn-primary ml-2">
          {mode === 'encode' ? 'Encode →' : 'Decode →'}
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn-secondary">Clear</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
            rows={14}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-zinc-400">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-400">{error}</div>
          ) : (
            <textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              rows={14}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-green-400 placeholder-zinc-600 font-mono resize-y cursor-default"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Base64Tool;
