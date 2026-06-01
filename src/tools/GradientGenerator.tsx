import { useState, useMemo } from 'react';
import CopyButton from '../components/CopyButton';

// CSS渐变生成器
function GradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#8b5cf6');
  const [color3, setColor3] = useState('');

  const gradient = useMemo(() => {
    const colors = [color1, color2, color3].filter(Boolean).join(', ');
    if (type === 'linear') {
      return 'linear-gradient(' + angle + 'deg, ' + colors + ')';
    }
    return 'radial-gradient(circle, ' + colors + ')';
  }, [type, angle, color1, color2, color3]);

  const cssCode = 'background: ' + gradient + ';';

  return (
    <div className="space-y-4">
      <div className="h-48 rounded-xl border border-zinc-700 shadow-lg" style={{ background: gradient }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex gap-2">
            <button onClick={() => setType('linear')} className={type === 'linear' ? 'btn-primary' : 'btn-secondary'}>Linear</button>
            <button onClick={() => setType('radial')} className={type === 'radial' ? 'btn-primary' : 'btn-secondary'}>Radial</button>
          </div>
          {type === 'linear' && (
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Angle: {angle}°</label>
              <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full" />
            </div>
          )}
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Color 1</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 font-mono" />
            </div>
          </div>
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Color 2</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 font-mono" />
            </div>
          </div>
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Color 3 (optional)</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={color3 || '#06b6d4'} onChange={(e) => setColor3(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={color3} onChange={(e) => setColor3(e.target.value)} placeholder="Add third color..." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 font-mono placeholder-zinc-600" />
              {color3 && <button onClick={() => setColor3('')} className="text-xs text-zinc-500 hover:text-zinc-300">x</button>}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-zinc-400">CSS Code</label>
            <CopyButton text={cssCode} />
          </div>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-green-400 font-mono whitespace-pre-wrap">{cssCode}</pre>
          <label className="text-sm text-zinc-400 block">Presets</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { c1: '#3b82f6', c2: '#8b5cf6', a: 135 },
              { c1: '#f97316', c2: '#ef4444', a: 135 },
              { c1: '#22c55e', c2: '#06b6d4', a: 135 },
              { c1: '#ec4899', c2: '#f97316', a: 135 },
              { c1: '#6366f1', c2: '#06b6d4', a: 135 },
              { c1: '#f59e0b', c2: '#ef4444', a: 180 },
              { c1: '#8b5cf6', c2: '#ec4899', a: 135 },
              { c1: '#14b8a6', c2: '#3b82f6', a: 135 },
            ].map((preset, i) => (
              <button
                key={i}
                onClick={() => { setColor1(preset.c1); setColor2(preset.c2); setAngle(preset.a); setType('linear'); setColor3(''); }}
                className="h-10 rounded-lg border border-zinc-700 hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(' + preset.a + 'deg, ' + preset.c1 + ', ' + preset.c2 + ')' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default GradientGenerator;
