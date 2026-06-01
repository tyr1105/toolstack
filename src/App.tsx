import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import { tools } from './lib/toolRegistry';
// 动态导入所有工具组件
import JsonFormatter from './tools/JsonFormatter';
import Base64Tool from './tools/Base64Tool';
import JwtDecoder from './tools/JwtDecoder';
import HashGenerator from './tools/HashGenerator';
import ColorConverter from './tools/ColorConverter';
import UrlEncoder from './tools/UrlEncoder';
import RegexTester from './tools/RegexTester';
import LoremIpsum from './tools/LoremIpsum';
import UuidGenerator from './tools/UuidGenerator';
import PasswordGenerator from './tools/PasswordGenerator';
import TimestampConverter from './tools/TimestampConverter';
import MarkdownPreview from './tools/MarkdownPreview';
import CronParser from './tools/CronParser';
import DiffChecker from './tools/DiffChecker';
import GradientGenerator from './tools/GradientGenerator';

// 工具id到组件的映射表
const toolComponents: Record<string, React.FC> = {
  json: JsonFormatter,
  base64: Base64Tool,
  jwt: JwtDecoder,
  hash: HashGenerator,
  color: ColorConverter,
  url: UrlEncoder,
  regex: RegexTester,
  lorem: LoremIpsum,
  uuid: UuidGenerator,
  password: PasswordGenerator,
  timestamp: TimestampConverter,
  markdown: MarkdownPreview,
  cron: CronParser,
  diff: DiffChecker,
  gradient: GradientGenerator,
};

// 简单的hash路由hook
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');
  
  useEffect(() => {
    const handler = () => {
      setRoute(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  
  return route;
}

function App() {
  const route = useHashRoute();
  
  // 解析路由：/tool/{id} 或 /
  const toolId = route.startsWith('/tool/') ? route.slice(6) : null;
  const currentTool = toolId ? tools.find(t => t.id === toolId) : null;
  const ToolComponent = toolId ? toolComponents[toolId] : null;
  
  return (
    <Layout currentTool={currentTool}>
      {!toolId ? (
        <Home />
      ) : ToolComponent ? (
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{currentTool?.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{currentTool?.name}</h1>
              <p className="text-sm text-zinc-400">{currentTool?.description}</p>
            </div>
          </div>
          <ToolComponent />
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-zinc-400 text-lg">Tool not found</p>
          <a href="#/" className="text-blue-400 hover:underline mt-2 inline-block">Go Home</a>
        </div>
      )}
    </Layout>
  );
}

export default App;
