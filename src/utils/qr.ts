// Decorative QR-style grid only — there is no backend yet to encode/scan a real payload.
export function generateQrCells(seedInput: number): boolean[] {
  let seed = seedInput || 1;
  function rnd() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }
  const cells: boolean[] = [];
  for (let i = 0; i < 81; i++) {
    const r = Math.floor(i / 9);
    const c = i % 9;
    const inCorner = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
    cells.push(inCorner ? true : rnd() > 0.5);
  }
  return cells;
}
