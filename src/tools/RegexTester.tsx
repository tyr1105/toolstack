import { useState, useMemo } from 'react';

// 正则表达式测试工具
function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState('');

  // 匹配结果和高亮
  const { matches, highlighted } = useMemo(() => {
    if (!pattern || !testString) return { matches: [], highlighted: testString };
    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: RegExpExecArray[] = [];
      let match: RegExpExecArray | null;
      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push(match);
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testString);
        if (match) allMatches.push(match);
      }
      // 高亮匹配文本
      let highlighted = testString;
      if (allMatches.length > 0) {
        const parts: { text: string; isMatch: boolean }[] = [];
        let lastIndex = 0;
        for (const m of allMatches) {
          if (m.index > lastIndex) parts.push({ text: testString.slice(lastIndex, m.index), isMatch: false });
          parts.push({ text: m[0], isMatch: true });
          lastIndex = m.index + m[0].length;
        }
        if (lastIndex < testString.length) parts.push({ text: testString.slice(lastIndex), isMatch: false });
        highlighted = parts.map(p => p.isMatch ? `【${p.text}】` : p.text).join('');
      }
      setError('');
      return { matches: allMatches, highlighted };
    } catch (e) {
      setError((e as Error).message);
      return { matches: [], highlighted: testString };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="flex-1 flex items-center bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          <span className="text-zinc-500 px-3 text-sm">/</span>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Enter regex pattern..." className="flex-1 bg-transparent py-2 text-sm text-zinc-200 focus:outline-none font-mono" />
          <span className="text-zinc-500 px-2 text-sm">/</span>
          <input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="flags" className="w-20 bg-transparent py-2 text-sm text-blue-400 focus:outline-none font-mono pr-3" />
        </div>
      </div>
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">{error}</div>}
      <div>
        <label className="text-sm text-zinc-400 mb-1 block">Test String</label>
        <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test against..." rows={6} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono resize-y" />
      </div>
      {pattern && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-zinc-400">Highlighted Matches ({matches.length})</label>
          </div>
          <pre className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap break-words">
            {highlighted.split('【').map((part, i) => {
              if (i === 0) return <span key={i}>{part}</span>;
              const endIdx = part.indexOf('】');
              if (endIdx === -1) return <span key={i}>{part}</span>;
              return <span key={i}><mark className="bg-yellow-500/30 text-yellow-300 rounded px-0.5">{part.slice(0, endIdx)}</mark>{part.slice(endIdx + 1)}</span>;
            })}
          </pre>
        </div>
      )}
      {matches.length > 0 && (
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Match Details</label>
          {matches.map((m, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-2 text-sm font-mono">
              <span className="text-blue-400">Match {i + 1}:</span> <span className="text-green-400">"{m[0]}"</span>
              {m.length > 1 && <span className="text-zinc-500 ml-2">Groups: {m.slice(1).map((g, j) => <span key={j} className="text-purple-400">${j+1}="{g}" </span>)}</span>}
              <span className="text-zinc-600 ml-2">index:{m.index}</span>
            </div>
          ))}
        </div>
      )}
      {/* 常用正则速查 */}
      <div>
        <label className="text-sm text-zinc-400 mb-2 block">Quick Patterns</label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' },
            { label: 'URL', pattern: 'https?://[\w\-]+(\.[\w\-]+)+[\w\-.,@?^=%&:/~+#]*' },
            { label: 'Phone', pattern: '\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}' },
            { label: 'IP', pattern: '\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b' },
            { label: 'Date', pattern: '\d{4}[-/]\d{2}[-/]\d{2}' },
          ].map(({ label, pattern: p }) => (
            <button key={label} onClick={() => setPattern(p)} className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700">{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default RegexTester;
