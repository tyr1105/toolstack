import { useState, useEffect } from 'react';
import CopyButton from '../components/CopyButton';

// Unix时间戳转换器
function TimestampConverter() {
  const [currentTs, setCurrentTs] = useState(Math.floor(Date.now() / 1000));
  const [inputTs, setInputTs] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [result, setResult] = useState<Record<string, string>>({});

  // 实时更新当前时间戳
  useEffect(() => {
    const timer = setInterval(() => setCurrentTs(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  // 时间戳转日期
  const tsToDate = () => {
    const ts = parseInt(inputTs);
    if (isNaN(ts)) return;
    const d = new Date(ts < 1e12 ? ts * 1000 : ts);
    setResult({
      'UTC': d.toUTCString(),
      'ISO 8601': d.toISOString(),
      'Local': d.toLocaleString(),
      'Relative': getRelative(d),
      'Unix (seconds)': Math.floor(d.getTime() / 1000).toString(),
      'Unix (milliseconds)': d.getTime().toString(),
    });
  };

  // 日期转时间戳
  const dateToTs = () => {
    const d = new Date(inputDate);
    if (isNaN(d.getTime())) return;
    setResult({
      'Unix (seconds)': Math.floor(d.getTime() / 1000).toString(),
      'Unix (milliseconds)': d.getTime().toString(),
      'UTC': d.toUTCString(),
      'ISO 8601': d.toISOString(),
      'Local': d.toLocaleString(),
      'Relative': getRelative(d),
    });
  };

  // 计算相对时间
  const getRelative = (date: Date): string => {
    const diff = Date.now() - date.getTime();
    const abs = Math.abs(diff);
    const suffix = diff > 0 ? 'ago' : 'from now';
    if (abs < 60000) return `${Math.floor(abs / 1000)} seconds ${suffix}`;
    if (abs < 3600000) return `${Math.floor(abs / 60000)} minutes ${suffix}`;
    if (abs < 86400000) return `${Math.floor(abs / 3600000)} hours ${suffix}`;
    return `${Math.floor(abs / 86400000)} days ${suffix}`;
  };

  return (
    <div className="space-y-4">
      {/* 当前时间戳 */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-center gap-4">
        <span className="text-sm text-blue-400">Current Timestamp:</span>
        <code className="text-xl font-mono font-bold text-blue-300">{currentTs}</code>
        <CopyButton text={currentTs.toString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 时间戳转日期 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Timestamp → Date</label>
          <div className="flex gap-2">
            <input value={inputTs} onChange={(e) => setInputTs(e.target.value)} placeholder="Enter Unix timestamp..." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono" />
            <button onClick={tsToDate} className="btn-primary">Convert</button>
          </div>
        </div>
        {/* 日期转时间戳 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Date → Timestamp</label>
          <div className="flex gap-2">
            <input type="datetime-local" value={inputDate} onChange={(e) => setInputDate(e.target.value)} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500/50" />
            <button onClick={dateToTs} className="btn-primary">Convert</button>
          </div>
        </div>
      </div>

      {/* 转换结果 */}
      {Object.keys(result).length > 0 && (
        <div className="space-y-2">
          {Object.entries(result).map(([label, value]) => (
            <div key={label} className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-3 flex items-center gap-3">
              <span className="text-xs font-medium text-zinc-400 w-32 shrink-0">{label}</span>
              <code className="flex-1 text-sm text-green-400 font-mono break-all">{value}</code>
              <CopyButton text={value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default TimestampConverter;
