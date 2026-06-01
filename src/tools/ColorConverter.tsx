import { useState, useEffect } from 'react';
import CopyButton from '../components/CopyButton';

// HEX转RGB辅助函数
function hexToRgb(h: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
}

// RGB转HSL辅助函数
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// 颜色转换器
function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('59, 130, 246');
  const [hsl, setHsl] = useState('217, 91%, 60%');

  useEffect(() => {
    const [r, g, b] = hexToRgb(hex);
    setRgb(r + ', ' + g + ', ' + b);
    const [h, s, l] = rgbToHsl(r, g, b);
    setHsl(h + ', ' + s + '%, ' + l + '%');
  }, [hex]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-xl border border-zinc-700 shadow-lg" style={{ backgroundColor: hex }} />
        <div>
          <div className="text-2xl font-mono font-bold">{hex}</div>
          <div className="text-sm text-zinc-400">rgb({rgb})</div>
          <div className="text-sm text-zinc-400">hsl({hsl})</div>
        </div>
      </div>
      <div>
        <label className="text-sm text-zinc-400 mb-2 block">Color Picker</label>
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer bg-transparent border-0" />
      </div>
      <div className="space-y-2">
        {[
          { label: 'HEX', value: hex },
          { label: 'RGB', value: 'rgb(' + rgb + ')' },
          { label: 'HSL', value: 'hsl(' + hsl + ')' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-3 flex items-center gap-3">
            <span className="text-xs font-medium text-zinc-400 w-10 shrink-0">{label}</span>
            <code className="flex-1 text-sm text-green-400 font-mono">{value}</code>
            <CopyButton text={value} />
          </div>
        ))}
      </div>
      <div>
        <label className="text-sm text-zinc-400 mb-2 block">Preset Colors</label>
        <div className="flex flex-wrap gap-2">
          {['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#06b6d4','#000000','#ffffff','#6b7280','#1e293b'].map(color => (
            <button key={color} onClick={() => setHex(color)} className="w-8 h-8 rounded-lg border border-zinc-700 hover:scale-110 transition-transform" style={{ backgroundColor: color }} title={color} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorConverter;
