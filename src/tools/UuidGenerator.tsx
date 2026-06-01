import { useState } from 'react';
import CopyButton from '../components/CopyButton';

// UUID v4生成器
function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  // 生成UUID v4
  const generateUuid = (): string => {
    if (crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generate = () => {
    const results = Array.from({ length: count }, () => {
      let uuid = generateUuid();
      if (uppercase) uuid = uuid.toUpperCase();
      if (noDashes) uuid = uuid.replace(/-/g, '');
      return uuid;
    });
    setUuids(results);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-400">Count:</label>
          <input type="number" value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))} min={1} max={100} className="w-20 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300" />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded" />
          Uppercase
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
          <input type="checkbox" checked={noDashes} onChange={(e) => setNoDashes(e.target.checked)} className="rounded" />
          No dashes
        </label>
        <button onClick={generate} className="btn-primary">Generate</button>
      </div>
      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-zinc-400">{uuids.length} UUIDs generated</label>
            <CopyButton text={uuids.join('\n')} />
          </div>
          {uuids.map((uuid, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-3 flex items-center gap-3">
              <span className="text-xs text-zinc-600 w-6">{i + 1}.</span>
              <code className="flex-1 text-sm text-green-400 font-mono">{uuid}</code>
              <CopyButton text={uuid} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default UuidGenerator;
