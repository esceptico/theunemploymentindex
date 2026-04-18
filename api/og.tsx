import { ImageResponse } from '@vercel/og';
import { mulberry32, generate, seedFromParam, newSeed } from '../doom.js';

export const config = { runtime: 'edge' };

const INTER_BOLD   = 'https://cdn.jsdelivr.net/npm/@fontsource/inter@5/files/inter-latin-700-normal.woff';
const INTER_ITALIC = 'https://cdn.jsdelivr.net/npm/@fontsource/inter@5/files/inter-latin-400-italic.woff';

const BG     = '#fbfbfc';
const FG     = '#0b0b0c';
const MUTED  = '#8c8c91';

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const seedParam = url.searchParams.get('s');
  const seed = seedFromParam(seedParam) ?? newSeed();
  const roll = generate(mulberry32(seed));

  const sentence = `AI will destroy ${roll.pct} ${roll.job} ${roll.time}.`;
  const byline   = `\u2014 ${roll.attribution}, 2026`;

  const [bold, italic] = await Promise.all([
    fetch(INTER_BOLD).then(r => r.arrayBuffer()),
    fetch(INTER_ITALIC).then(r => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: BG,
          color: FG,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 100px',
          fontFamily: 'Inter',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            maxWidth: 1000,
            marginBottom: 44,
          }}
        >
          {sentence}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontStyle: 'italic',
            color: MUTED,
            letterSpacing: '0.01em',
          }}
        >
          {byline}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 56,
            display: 'flex',
            fontSize: 14,
            color: MUTED,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          theunemploymentindex.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: bold,   weight: 700, style: 'normal' },
        { name: 'Inter', data: italic, weight: 400, style: 'italic' },
      ],
    }
  );
}
