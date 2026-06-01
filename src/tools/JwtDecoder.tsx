import { useState } from 'react';
import CopyButton from '../components/CopyButton';

// JWT令牌解码器
function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  // 解码JWT令牌
  const decodeJwt = () => {
    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT: must have 3 parts separated by dots');

      // 解码Header
      const headerJson = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      setHeader(JSON.stringify(headerJson, null, 2));

      // 解码Payload
      const payloadJson = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setPayload(JSON.stringify(payloadJson, null, 2));

      // 签名部分（保持原样）
      setSignature(parts[2]);
      setError('');

      // 检查是否过期
      if (payloadJson.exp) {
        const expDate = new Date(payloadJson.exp * 1000);
        const isExpired = expDate < new Date();
        if (isExpired) {
          setError(`⚠️ Token expired at ${expDate.toLocaleString()}`);
        }
      }
    } catch (e) {
      setError((e as Error).message);
      setHeader('');
      setPayload('');
      setSignature('');
    }
  };

  // 加载示例JWT
  const loadExample = () => {
    setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4Adcj3UFYzP5ZRBJiWaR1u6lZbCj_LY3OfYWJ4CzhrQ');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={decodeJwt} className="btn-primary">Decode</button>
        <button onClick={loadExample} className="btn-secondary">Example</button>
        <button onClick={() => { setToken(''); setHeader(''); setPayload(''); setSignature(''); setError(''); }} className="btn-secondary">Clear</button>
      </div>
      <div>
        <label className="text-sm text-zinc-400 mb-1 block">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here..."
          rows={4}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 font-mono resize-y"
        />
      </div>
      {error && !error.startsWith('⚠️') && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">{error}</div>
      )}
      {error.startsWith('⚠️') && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm text-yellow-400">{error}</div>
      )}
      {(header || payload) && (
        <div className="grid grid-cols-1 gap-4">
          {/* Header */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-400">📄 Header</span>
              {header && <CopyButton text={header} />}
            </div>
            <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap code-output">{header}</pre>
          </div>
          {/* Payload */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-400">📦 Payload</span>
              {payload && <CopyButton text={payload} />}
            </div>
            <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap code-output">{payload}</pre>
          </div>
          {/* Signature */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-400">🔐 Signature</span>
              {signature && <CopyButton text={signature} />}
            </div>
            <code className="text-sm text-zinc-400 font-mono break-all">{signature}</code>
          </div>
        </div>
      )}
    </div>
  );
}

export default JwtDecoder;
