import { useState } from 'react';
import CopyButton from '../components/CopyButton';

// Lorem Ipsum占位文本生成器
function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [output, setOutput] = useState('');

  // 经典Lorem Ipsum词库
  const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

  const generate = () => {
    const rand = (max: number) => Math.floor(Math.random() * max);
    const randWord = () => words[rand(words.length)];
    const randSentence = () => {
      const len = 8 + rand(12);
      const sentenceWords = Array.from({ length: len }, randWord);
      return sentenceWords[0].charAt(0).toUpperCase() + sentenceWords[0].slice(1) + ' ' + sentenceWords.slice(1).join(' ') + '.';
    };
    const randParagraph = () => Array.from({ length: 3 + rand(4) }, randSentence).join(' ');

    let result = '';
    if (type === 'paragraphs') result = Array.from({ length: count }, randParagraph).join('\n\n');
    else if (type === 'sentences') result = Array.from({ length: count }, randSentence).join(' ');
    else result = Array.from({ length: count }, randWord).join(' ');
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center flex-wrap">
        <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300">
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
        <input type="number" value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))} min={1} max={100} className="w-20 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300" />
        <button onClick={generate} className="btn-primary">Generate</button>
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-zinc-400">Generated Text</label>
            <CopyButton text={output} />
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{output}</div>
        </div>
      )}
    </div>
  );
}
export default LoremIpsum;
