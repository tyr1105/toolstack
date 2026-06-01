import { useState } from 'react';
import CopyButton from '../components/CopyButton';

// Cron表达式解析器
function CronParser() {
  const [expression, setExpression] = useState('*/5 * * * *');
  const [parsed, setParsed] = useState<string[]>([]);
  const [nextRuns, setNextRuns] = useState<string[]>([]);
  const [error, setError] = useState('');

  const fieldNames = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week'];

  // 解析cron字段
  const parseField = (field: string, min: number, max: number): string => {
    if (field === '*') return `Every ${min === 0 ? 'value' : 'value'} (${min}-${max})`;
    if (field.includes('/')) {
      const [base, step] = field.split('/');
      return `Every ${step} ${min === 0 ? 'units' : 'units'} from ${base === '*' ? min : base}`;
    }
    if (field.includes(',')) return `At ${field.split(',').join(', ')}`;
    if (field.includes('-')) return `From ${field.replace('-', ' to ')}`;
    return `At ${field}`;
  };

  const parse = () => {
    try {
      const parts = expression.trim().split(/\s+/);
      if (parts.length < 5) throw new Error('Cron expression must have at least 5 fields');
      
      const ranges = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]];
      const descriptions = parts.slice(0, 5).map((p, i) => parseField(p, ranges[i][0], ranges[i][1]));
      setParsed(descriptions);
      
      // 生成下次运行时间（简化版）
      const nextTimes: string[] = [];
      const now = new Date();
      for (let i = 0; i < 5; i++) {
        const next = new Date(now.getTime() + (i + 1) * 60000 * (parts[0] === '*/5' ? 5 : parts[0] === '*/15' ? 15 : parts[0] === '0' ? 60 : 1));
        nextTimes.push(next.toLocaleString());
      }
      setNextRuns(nextTimes);
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setParsed([]);
      setNextRuns([]);
    }
  };

  const examples = [
    { label: 'Every 5 min', expr: '*/5 * * * *' },
    { label: 'Every hour', expr: '0 * * * *' },
    { label: 'Daily midnight', expr: '0 0 * * *' },
    { label: 'Weekly Sunday', expr: '0 0 * * 0' },
    { label: 'Monthly 1st', expr: '0 0 1 * *' },
    { label: 'Weekdays 9am', expr: '0 9 * * 1-5' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter cron expression..."
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono"
        />
        <button onClick={parse} className="btn-primary">Parse</button>
      </div>
      {/* 快速示例 */}
      <div className="flex flex-wrap gap-2">
        {examples.map(({ label, expr }) => (
          <button key={label} onClick={() => { setExpression(expr); }} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
            {label}
          </button>
        ))}
      </div>
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">{error}</div>}
      {parsed.length > 0 && (
        <div className="space-y-4">
          {/* 字段解析 */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Field Breakdown</label>
            <div className="space-y-1">
              {parsed.map((desc, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-2 flex items-center gap-3">
                  <span className="text-xs font-medium text-blue-400 w-24 shrink-0">{fieldNames[i]}</span>
                  <code className="text-sm text-zinc-300 font-mono">{expression.split(/\s+/)[i]}</code>
                  <span className="text-sm text-zinc-500 flex-1">→ {desc}</span>
                </div>
              ))}
            </div>
          </div>
          {/* 人类可读描述 */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <label className="text-sm text-blue-400 mb-1 block">Human Readable</label>
            <p className="text-sm text-blue-300">{parsed.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default CronParser;
