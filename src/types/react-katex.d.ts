declare module 'react-katex' {
    import React from 'react';
    export const BlockMath: React.FC<{ math: string }>;
    export const InlineMath: React.FC<{ math: string }>;
}
