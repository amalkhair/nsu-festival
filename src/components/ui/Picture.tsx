import type { SceneVariant } from "@/types";
import { cn } from "@/lib/utils";
import { Scene } from "./Scene";

/** Shows a real photo when one is set, otherwise the illustrated scene. */
export function Picture({
  image,
  scene,
  alt,
  className,
  priority,
}: {
  image?: string;
  scene: SceneVariant;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={alt}
        className={cn("block h-full w-full object-cover", className)}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }
  return <Scene variant={scene} title={alt} className={className} />;
}
