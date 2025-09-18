export function analyzeImage(imageEl) {
  const w = imageEl.naturalWidth || imageEl.width;
  const h = imageEl.naturalHeight || imageEl.height;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const pt = (x, y) => ({ x, y });

  // Heuristic landmark proposal (image-relative)
  const landmarks = {
    muzzle: pt(0.2 * w, 0.55 * h),
    withers: pt(0.55 * w, 0.25 * h),
    chestLeft: pt(0.38 * w, 0.55 * h),
    chestRight: pt(0.62 * w, 0.55 * h),
    rump: pt(0.82 * w, 0.5 * h),
    foreHoof: pt(0.5 * w, 0.96 * h),
    rearHoof: pt(0.86 * w, 0.98 * h),
  };

  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const rad2deg = (r) => (r * 180) / Math.PI;

  const measurements = {
    bodyLength: dist(landmarks.muzzle, landmarks.rump),
    heightAtWithers: h - landmarks.withers.y,
    chestWidth: dist(landmarks.chestLeft, landmarks.chestRight),
    rumpAngle: rad2deg(Math.atan2(landmarks.rump.y - landmarks.withers.y, landmarks.rump.x - landmarks.withers.x)),
  };

  const score = (value, min, max) => {
    const norm = (value - min) / (max - min);
    const scaled = 1 + norm * 8;
    return Math.round(clamp(scaled, 1, 9));
  };

  const scores = {
    bodyLength: score(measurements.bodyLength, 0.35 * w, 0.95 * w),
    heightAtWithers: score(measurements.heightAtWithers, 0.35 * h, 0.95 * h),
    chestWidth: score(measurements.chestWidth, 0.18 * w, 0.5 * w),
    rumpAngle: score(90 - Math.abs(90 - measurements.rumpAngle), 20, 90),
  };

  return { width: w, height: h, landmarks, measurements, scores };
}
