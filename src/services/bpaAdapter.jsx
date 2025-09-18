export function buildBpaPayload({ imageMeta, measurements, scores, landmarks, animalMeta, locale }) {
  return {
    schemaVersion: '1.0',
    source: 'AI-ATC-Web',
    locale,
    animal: {
      species: animalMeta?.species || 'bovine',
      type: animalMeta?.type || 'unknown',
      id: animalMeta?.id || '',
      breed: animalMeta?.breed || '',
    },
    image: {
      width: imageMeta?.width || 0,
      height: imageMeta?.height || 0,
      capturedAt: imageMeta?.capturedAt || new Date().toISOString(),
    },
    traits: {
      bodyLength: { valuePx: measurements.bodyLength, score: scores.bodyLength },
      heightAtWithers: { valuePx: measurements.heightAtWithers, score: scores.heightAtWithers },
      chestWidth: { valuePx: measurements.chestWidth, score: scores.chestWidth },
      rumpAngle: { valueDeg: measurements.rumpAngle, score: scores.rumpAngle },
    },
    landmarks,
  };
}

export async function sendToBpa({ endpointUrl, payload }) {
  if (!endpointUrl) {
    return { ok: false, status: 'no-endpoint', message: 'BPA endpoint not configured' };
  }
  const res = await fetch(endpointUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
