import type { AvatarState } from "@/types/avatar";

interface AvatarCharacterProps {
  state: AvatarState;
}

const stateFilters: Record<AvatarState, string> = {
  idle: "none",
  happy: "brightness(1.1) saturate(1.2)",
  worried: "brightness(0.9) saturate(0.8)",
  celebrating: "brightness(1.2) saturate(1.3) hue-rotate(10deg)",
};

import { memo } from "react";

export const AvatarCharacter = memo(function AvatarCharacter({ state }: AvatarCharacterProps) {
  return (
    <img
      src="/elitstudy.svg"
      alt={`Elit Study mascota - ${state}`}
      className="w-full h-full object-contain"
      style={{
        filter: stateFilters[state],
        imageRendering: "pixelated",
      }}
      loading="lazy"
      decoding="async"
    />
  );
});
