"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 78;
const RADIUS = 1.4;
/** Nodes closer than this (pre-scaling) get an edge drawn between them. */
const LINK_DISTANCE = 0.58;
const ACCENT = "#34d399";

/**
 * Nodes on a Fibonacci sphere, edges between near neighbours. Generated at
 * runtime — no model file to load, so the whole scene costs nothing but code.
 */
function useGraph() {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      points.push(
        new THREE.Vector3(
          Math.cos(theta) * ring,
          y,
          Math.sin(theta) * ring,
        ).multiplyScalar(RADIUS),
      );
    }

    const nodes = new Float32Array(points.length * 3);
    points.forEach((p, i) => p.toArray(nodes, i * 3));

    const edgeList: number[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < LINK_DISTANCE) {
          edgeList.push(...points[i].toArray(), ...points[j].toArray());
        }
      }
    }

    return { nodes, edges: new Float32Array(edgeList) };
  }, []);
}

function Graph() {
  const group = useRef<THREE.Group>(null);
  const { nodes, edges } = useGraph();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    g.rotation.y += delta * 0.12;
    g.rotation.x += delta * 0.02;

    // Ease toward the cursor for a shallow parallax tilt.
    const targetX = state.pointer.y * 0.18;
    const targetY = state.pointer.x * 0.25;
    g.rotation.x += (targetX - g.rotation.x) * 0.02;
    g.position.x += (targetY * 0.3 - g.position.x) * 0.04;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodes, 3]}
            count={nodes.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color={ACCENT}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edges, 3]}
            count={edges.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </lineSegments>

      {/* Faint inner shell so the sphere reads as volume, not a flat ring. */}
      <mesh>
        <icosahedronGeometry args={[RADIUS * 0.62, 1]} />
        <meshBasicMaterial
          color={ACCENT}
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}

export function ServiceMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <Graph />
    </Canvas>
  );
}
