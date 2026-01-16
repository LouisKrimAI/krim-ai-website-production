// pages/HookProbe.tsx
import { useEffect, useLayoutEffect, useState, Component } from 'react';

export default function HookProbe() {
  const [n, setN] = useState(0);
  useEffect(() => setN(1), []);
  useLayoutEffect(() => { /* no-op */ }, []);
  return <div data-ok={typeof Component === 'function' && n === 1}>OK</div>;
}