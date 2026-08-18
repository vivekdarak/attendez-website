const DEFAULT_OPENINARY_BASE_URL = "https://media.goodtimesco.in";

type OpeninaryOptions = {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale";
  quality?: number;
  format?: "webp" | "avif";
};

export function openinaryUrl(path: string, options: OpeninaryOptions = {}) {
  const baseUrl = (process.env.OPENINARY_BASE_URL || DEFAULT_OPENINARY_BASE_URL).replace(/\/$/, "");
  const transforms = [
    options.width ? `w_${options.width}` : null,
    options.height ? `h_${options.height}` : null,
    options.crop ? `c_${options.crop}` : null,
    options.quality ? `q_${options.quality}` : null,
    options.format ? `f_${options.format}` : null,
  ].filter(Boolean);

  const normalizedPath = path.replace(/^\/+/, "");

  if (!transforms.length) {
    return `${baseUrl}/t/${normalizedPath}`;
  }

  return `${baseUrl}/t/${transforms.join(",")}/${normalizedPath}`;
}