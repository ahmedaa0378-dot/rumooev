'use client';

import React, { useState, useEffect, type CSSProperties } from 'react';

export interface BackgroundSceneProps {
  /** Number of animated light beams */
  beamCount?: number;
}

const BACKGROUND_BEAM_COUNT = 60;

/**
 * Aurora / rising light-beam background (ported from the shadcn reference to our
 * Tailwind-3, no-CSS-in-JS stack). All visual styling lives in globals.css under
 * the `.scene` scope. Beams are generated on the client (post-mount) with
 * randomised position/width/timing, so there is no SSR hydration mismatch —
 * the server and first client render both emit an empty stream.
 */
const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  beamCount = BACKGROUND_BEAM_COUNT,
}) => {
  const [beams, setBeams] = useState<Array<{ id: number; style: CSSProperties }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 2 + 4; // 4–6s rise
      const fadeDur = riseDur; // sync fade
      const dropDur = Math.random() * 3 + 3; // 3–6s drop

      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 3) + 1}px`,
          height: `${Math.floor(Math.random() * 35) + 35}vh`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s, ${dropDur}s`,
        } as CSSProperties,
      };
    });
    setBeams(generated);
  }, [beamCount]);

  return (
    <div className="scene" aria-hidden="true">
      <div className="floor" />
      <div className="main-column" />
      <div className="light-stream-container">
        {beams.map((beam) => (
          <div key={beam.id} className="light-beam" style={beam.style} />
        ))}
      </div>
    </div>
  );
};

export default BackgroundScene;
