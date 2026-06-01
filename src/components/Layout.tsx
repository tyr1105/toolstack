import { useState } from 'react';
import { tools } from '../lib/toolRegistry';

interface LayoutProps {
  children: React.ReactNode;
  currentTool?: { id: string; name: string; icon: string; description: string } | null;
}

// 主布局组件
function Layout({ children }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTools = searchQuery
    ? tools.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.keywords.some(k => k.includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <a href="#/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">T</div>
              <span className="font-semibold text-sm hidden sm:inline">ToolStack<span className="text-blue-400">.dev</span></span>
            </a>
          </div>
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
            />
            {searchQuery && filteredTools.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50">
                {filteredTools.map(tool => (
                  <a key={tool.id} href={`#/tool/${tool.id}`} onClick={() => setSearchQuery('')} className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-800 transition-colors">
                    <span className="text-lg">{tool.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{tool.name}</div>
                      <div className="text-xs text-zinc-500">{tool.description}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
            {searchQuery && filteredTools.length === 0 && (
              <div className="absolute top-full mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-4 text-center text-zinc-500 text-sm">No tools found</div>
            )}
          </div>
          <a href="https://github.com/tyr1105/toolstack" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-sm hidden sm:flex items-center gap-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </header>
      <main className="min-h-[calc(100vh-56px)]">{children}</main>
      <footer className="border-t border-zinc-800/50 py-6 text-center text-xs text-zinc-500">
        <p>ToolStack.dev — Free online developer tools. No signup. No tracking. Works offline.</p>
      </footer>
    </div>
  );
}

export default Layout;
