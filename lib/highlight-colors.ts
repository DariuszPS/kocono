export const HIGHLIGHT_COLORS = [
  { bg: '#C1D2E6', text: '#0a0a0a' },
  { bg: '#949EC3', text: '#ffffff' },
  { bg: '#8B7099', text: '#ffffff' },
  { bg: '#F49595', text: '#0a0a0a' },
  { bg: '#F6C094', text: '#0a0a0a' },
  { bg: '#FFEBB0', text: '#0a0a0a' },
  { bg: '#D3E1A0', text: '#0a0a0a' },
  { bg: '#A1C698', text: '#0a0a0a' },
] as const;

export type HighlightColor = (typeof HIGHLIGHT_COLORS)[number];
