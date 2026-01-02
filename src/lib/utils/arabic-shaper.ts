// src/lib/utils/arabic-shaper.ts

import { arabicReshaper } from "arabic-persian-reshaper";
import { bidi } from "bidi-js";

export function shapeArabic(input: string): string {
  const reshaped = arabicReshaper(input);
  return bidi(reshaped);
}
