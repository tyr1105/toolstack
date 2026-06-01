import { useState, useMemo } from 'react';

// 文本差异对比工具
function DiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  // 简单的行级差异计算
  const diff = useMemo(() => {
    if (!showDiff) return [];
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLen = Math.max(lines1.length, lines2.length);
    const result: { type: 'same' | 'added' | 'removed'; line1?: string; line2?: string; num: number }[] = [];
    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i];
      const l2 = lines2[i];
      if (l1 === l2) {
        result.push({ type: 'same', line1: l1, line2: l2, num: i + 1 });
      } else {
        if (l1 !== undefined) result.push({ type: 'removed', line1: l1, num: i + 1 });
        if (l2 !== undefined) result.push({ type: 'added', line2: l2, num: i + 1 });
      }
    }
    return result;
  }, [text1, text2, showDiff]);

  const stats = useMemo(() => ({
    added: diff.filter(d => d.type === 'added').length,
    removed: diff.filter(d => d.type === 'removed').length,
    same: diff.filter(d => d.type === 'same').length,
  }), [diff]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setShowDiff(true)} className="btn-primary">Compare</button>
        <button onClick={() => { setText1(''); setText2(''); setShowDiff(false); }} className="btn-secondary">Clear</button>
        <button onClick={() => { setText1('Hello World\nThis is line 2\nThis is line 3\nThis is line 4'); setText2('Hello World\nThis is modified line 2\nThis is line 3\nThis is new line 4\nThis is line 5'); }} className="btn-secondary">Example</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Original Text</label>
          <textarea value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Paste original text..." rows={14} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono resize-y" />
        </div>
        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Modified Text</label>
          <textarea value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Paste modified text..." rows={14} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono resize-y" />
        </div>
      </div>
      {showDiff && diff.length > 0 && (
        <div>
          <div className="flex gap-4 mb-2 text-xs text-zinc-400">
            <span className="text-green-400">+{stats.added} added</span>
            <span className="text-red-400">-{stats.removed} removed</span>
            <span>{stats.same} unchanged</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
            {diff.map((d, i) => (
              <div key={i} className={`flex font-mono text-sm border-b border-zinc-800/50 ${
                d.type === 'added' ? 'bg-green-500/10' : d.type === 'removed' ? 'bg-red-500/10' : ''
              }`}>
                <span className="w-10 shrink-0 text-right pr-2 text-zinc-600 border-r border-zinc-800 py-0.5 text-xs">{d.num}</span>
                <span className="w-6 shrink-0 text-center py-0.5 text-xs">{d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '}</span>
                <pre className="flex-1 py-0.5 px-1 whitespace-pre-wrap break-all text-zinc-300">{d.line1 ?? d.line2}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default DiffChecker;
