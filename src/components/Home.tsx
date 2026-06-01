import { tools } from '../lib/toolRegistry';

// 首页 - 展示所有工具卡片
function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero区域 */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 rounded-full px-4 py-1 text-sm font-medium mb-6">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
          100% Free · No Signup · Private
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Developer Tools
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> that just work</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          15+ essential developer utilities. Fast, beautiful, and works entirely in your browser.
          Your data never leaves your device.
        </p>
      </div>

      {/* 工具网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map(tool => (
          <a
            key={tool.id}
            href={`#/tool/${tool.id}`}
            className="tool-card group bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 hover:border-zinc-700/80 hover:bg-zinc-900/80"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-zinc-500 mt-0.5">{tool.description}</p>
              </div>
              <svg className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 mt-1 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* 底部特性说明 */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-semibold mb-1">Lightning Fast</h3>
          <p className="text-sm text-zinc-500">Everything runs in your browser. No server round-trips.</p>
        </div>
        <div className="p-6">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="font-semibold mb-1">100% Private</h3>
          <p className="text-sm text-zinc-500">Your data never leaves your device. No tracking, no ads.</p>
        </div>
        <div className="p-6">
          <div className="text-3xl mb-3">🌙</div>
          <h3 className="font-semibold mb-1">Works Offline</h3>
          <p className="text-sm text-zinc-500">Install as PWA and use anywhere, even without internet.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
