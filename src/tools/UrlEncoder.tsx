import { useState } from 'react';
import CopyButton from '../components/CopyButton';

// URL编码/解码工具
function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const process = () => {
    try {
      setOutput(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch (e) {
      setOutput('Error: ' + (e as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={mode === 'encode' ? 'btn-primary' : 'btn-secondary'}>Encode</button>
        <button onClick={() => setMode('decode')} className={mode === 'decode' ? 'btn-primary' : 'btn-secondary'}>Decode</button>
        <button onClick={process} className="btn-primary ml-2">{mode === 'encode' ? 'Encode →' : 'Decode →'}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn-secondary">Clear</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL...'} rows={10} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono resize-y" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-zinc-400">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly placeholder="Result..." rows={10} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-green-400 placeholder-zinc-600 font-mono resize-y cursor-default" />
        </div>
      </div>
    </div>
  );
}
export default UrlEncoder;
