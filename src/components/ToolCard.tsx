/**
 * 工具卡片组件 - 在首页展示每个工具的简要信息
 * 包含图标、名称、描述和分类标签
 */
import type { ToolInfo } from '../lib/toolRegistry';

interface ToolCardProps {
  tool: ToolInfo;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
    <button
      onClick={onClick}
      className="tool-card group text-left p-5 rounded-xl border border-border-subtle bg-surface-elevated hover:border-primary/30 hover:bg-surface-overlay transition-all"
    >
      <div className="flex items-start gap-4">
        {/* 工具图标 */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface-overlay group-hover:bg-primary/10 flex items-center justify-center text-xl transition-colors">
          {tool.icon}
        </div>

        <div className="flex-1 min-w-0">
          {/* 工具名称 */}
          <h3 className="font-semibold text-sm text-text-primary group-hover:text-primary-hover transition-colors">
            {tool.name}
          </h3>

          {/* 工具描述 */}
          <p className="mt-1 text-xs text-text-tertiary leading-relaxed line-clamp-2">
            {tool.description}
          </p>

          {/* 分类标签 */}
          <div className="mt-2.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-surface-overlay text-text-tertiary group-hover:text-text-secondary transition-colors">
              {tool.category}
            </span>
          </div>
        </div>

        {/* 箭头指示 */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-text-tertiary mt-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
