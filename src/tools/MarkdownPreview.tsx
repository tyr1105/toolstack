import { useState, useMemo } from 'react';

// 简易Markdown渲染器（纯JS实现，不依赖外部库）
function renderMarkdown(md: string): string {
  let html = md
    // 代码块
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-zinc-950 rounded-lg p-3 my-2 overflow-x-auto"><code class="text-sm text-green-400 font-mono">$2</code></pre>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-pink-400 font-mono">$1</code>')
    // 标题
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-4 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-4 mb-3">$1</h1>')
    // 粗体和斜体
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    // 链接和图片
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-2" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline" target="_blank">$1</a>')
    // 无序列表
    .replace(/^[\-\*] (.+)$/gm, '<li class="ml-4 text-zinc-300">$1</li>')
    // 水平线
    .replace(/^---$/gm, '<hr class="border-zinc-700 my-4" />')
    // 引用
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-blue-500 pl-4 text-zinc-400 italic my-2">$1</blockquote>')
    // 段落
    .replace(/\n\n/g, '</p><p class="text-zinc-300 my-2">')
    .replace(/\n/g, '<br/>');
  return '<p class="text-zinc-300">' + html + '</p>';
}

// Markdown预览工具
function MarkdownPreview() {
  const [input, setInput] = useState(`# Hello World

This is a **Markdown** preview tool.

## Features
- Live preview
- Supports *basic* syntax
- Code blocks with \`syntax highlighting\`

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote

Visit [ToolStack.dev](https://toolstack.dev) for more tools.

---

Made with ❤️`);

  const html = useMemo(() => renderMarkdown(input), [input]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        <label className="text-sm text-zinc-400 mb-1 block">Markdown Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={20}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono resize-y"
        />
      </div>
      <div>
        <label className="text-sm text-zinc-400 mb-1 block">Preview</label>
        <div
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 min-h-[480px] overflow-auto prose-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
export default MarkdownPreview;
