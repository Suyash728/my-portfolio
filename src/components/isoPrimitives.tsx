import React from "react";

/**
 * Deterministic 3D Isometric Projection Helper & Voxel Primitives.
 *
 * Coordinate Convention (30° True Isometric):
 * - +X: runs down-right on screen (cos 30°, sin 30°)
 * - +Y: runs down-left on screen (-cos 30°, sin 30°)
 * - +Z: runs straight UP on screen (0, -1)
 *
 * Depth Metric:
 * - Objects with smaller (x + y) are farther back (rendered first).
 * - Objects with larger (x + y) are closer to the viewer (rendered on top).
 */

export const COS30 = 0.8660254037844386;
export const SIN30 = 0.5;

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Point2D {
  x: number;
  y: number;
}

/** Projects a 3D point (x, y, z) into 2D screen coordinates (sx, sy). */
export function project(
  p: Point3D,
  origin: Point2D = { x: 230, y: 310 },
  scale: number = 2.4
): Point2D {
  return {
    x: origin.x + (p.x - p.y) * COS30 * scale,
    y: origin.y + (p.x + p.y) * SIN30 * scale - p.z * scale,
  };
}

export interface IsoBoxProps {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  topColor: string;
  leftColor: string;
  rightColor: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  origin?: Point2D;
  scale?: number;
}

/** Renders a crisp 3D isometric voxel box with 3 visible shaded faces. */
export function IsoBox({
  x,
  y,
  z,
  dx,
  dy,
  dz,
  topColor,
  leftColor,
  rightColor,
  stroke = "none",
  strokeWidth = 0.75,
  opacity = 1,
  origin = { x: 230, y: 310 },
  scale = 2.4,
}: IsoBoxProps) {
  // 8 corners in 3D
  const c100 = project({ x: x + dx, y, z }, origin, scale);
  const c010 = project({ x, y: y + dy, z }, origin, scale);
  const c110 = project({ x: x + dx, y: y + dy, z }, origin, scale);

  const c001 = project({ x, y, z: z + dz }, origin, scale);
  const c101 = project({ x: x + dx, y, z: z + dz }, origin, scale);
  const c011 = project({ x, y: y + dy, z: z + dz }, origin, scale);
  const c111 = project({ x: x + dx, y: y + dy, z: z + dz }, origin, scale);

  // Top face (at Z + dz)
  const topPoints = `${c001.x},${c001.y} ${c101.x},${c101.y} ${c111.x},${c111.y} ${c011.x},${c011.y}`;
  // Left face (facing front-left, normal along +Y)
  const leftPoints = `${c011.x},${c011.y} ${c111.x},${c111.y} ${c110.x},${c110.y} ${c010.x},${c010.y}`;
  // Right face (facing front-right, normal along +X)
  const rightPoints = `${c101.x},${c101.y} ${c111.x},${c111.y} ${c110.x},${c110.y} ${c100.x},${c100.y}`;

  return (
    <g opacity={opacity} shapeRendering="geometricPrecision">
      {/* Left Face (Shaded) */}
      <polygon
        points={leftPoints}
        fill={leftColor}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Right Face (Medium Lit) */}
      <polygon
        points={rightPoints}
        fill={rightColor}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Top Face (Direct Sky Light) */}
      <polygon
        points={topPoints}
        fill={topColor}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Computes the depth metric for sorting (Painter's algorithm: smallest drawn first). */
export function getBoxDepth(x: number, y: number, z: number, dx: number, dy: number, dz: number): number {
  return (x + dx * 0.5) + (y + dy * 0.5) + (z + dz * 0.5) * 0.05;
}

/**
 * Returns an SVG affine transform matrix string to project flat 2D SVG artwork
 * (circles, text, rects) directly onto an isometric plane.
 */
export function getIsoPlaneTransform(
  plane: "top" | "front-right" | "front-left",
  anchor3D: Point3D,
  origin: Point2D = { x: 230, y: 310 },
  scale: number = 2.4
): string {
  const p = project(anchor3D, origin, scale);

  if (plane === "front-right") {
    // Normal along +Y. X runs down-right, Z runs straight DOWN in 2D (+v).
    const a = COS30 * scale;
    const b = SIN30 * scale;
    const c = 0;
    const d = scale;
    return `matrix(${a.toFixed(5)}, ${b.toFixed(5)}, ${c}, ${d.toFixed(5)}, ${p.x.toFixed(2)}, ${p.y.toFixed(2)})`;
  }

  if (plane === "front-left") {
    // Normal along +X. Y runs down-left (-cos 30, sin 30), Z runs straight DOWN in 2D (+v).
    const a = -COS30 * scale;
    const b = SIN30 * scale;
    const c = 0;
    const d = scale;
    return `matrix(${a.toFixed(5)}, ${b.toFixed(5)}, ${c}, ${d.toFixed(5)}, ${p.x.toFixed(2)}, ${p.y.toFixed(2)})`;
  }

  // Top plane (normal +Z): U runs along X (down-right), V runs along Y (down-left)
  const a = COS30 * scale;
  const b = SIN30 * scale;
  const c = -COS30 * scale;
  const d = SIN30 * scale;
  return `matrix(${a.toFixed(5)}, ${b.toFixed(5)}, ${c.toFixed(5)}, ${d.toFixed(5)}, ${p.x.toFixed(2)}, ${p.y.toFixed(2)})`;
}
