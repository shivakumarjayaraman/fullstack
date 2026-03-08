import { useState } from 'react';

/**
 * Session 14/21: Render Props pattern.
 * Tracks mouse position and passes it to whatever the caller wants to render.
 *
 * Usage:
 *   <Mouse render={({ x, y }) => <p>Mouse at {x}, {y}</p>} />
 */
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ height: '200px', border: '1px solid #ccc', position: 'relative' }}>
      {render(position)}
    </div>
  );
}

export default Mouse;
