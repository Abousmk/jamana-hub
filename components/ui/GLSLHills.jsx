"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function GLSLHills({
  className = "absolute inset-0 h-full w-full",
  cameraZ = 125,
  planeSize = 256,
  speed = 0.5,
}) {
  const containerRef = useRef(null);
  const speedRef = useRef(speed);
  const [ready, setReady] = useState(false);
  speedRef.current = speed;

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const canvas = document.createElement("canvas");
    canvas.className = "block h-full w-full";
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    let active = true;
    let frameId = null;
    let shouldAnimate = !prefersReducedMotion();
    let lastFrameTime = performance.now();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (event) => {
      shouldAnimate = !event.matches;
      lastFrameTime = performance.now();
    };
    motionQuery.addEventListener("change", onMotionChange);

    const onVisibilityChange = () => {
      if (!document.hidden) {
        lastFrameTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    class Plane {
      constructor() {
        this.uniforms = {
          time: { value: 0 },
        };
        this.mesh = this.createMesh();
      }

      createMesh() {
        return new THREE.Mesh(
          new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize),
          new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            uniforms: this.uniforms,
            vertexShader: `
              uniform float time;
              out vec3 vPosition;

              mat4 rotateMatrixX(float radian) {
                return mat4(
                  1.0, 0.0, 0.0, 0.0,
                  0.0, cos(radian), -sin(radian), 0.0,
                  0.0, sin(radian), cos(radian), 0.0,
                  0.0, 0.0, 0.0, 1.0
                );
              }

              vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
              vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
              vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

              float cnoise(vec3 P) {
                vec3 Pi0 = floor(P);
                vec3 Pi1 = Pi0 + vec3(1.0);
                Pi0 = mod289(Pi0);
                Pi1 = mod289(Pi1);
                vec3 Pf0 = fract(P);
                vec3 Pf1 = Pf0 - vec3(1.0);
                vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                vec4 iy = vec4(Pi0.yy, Pi1.yy);
                vec4 iz0 = Pi0.zzzz;
                vec4 iz1 = Pi1.zzzz;

                vec4 ixy = permute(permute(ix) + iy);
                vec4 ixy0 = permute(ixy + iz0);
                vec4 ixy1 = permute(ixy + iz1);

                vec4 gx0 = ixy0 * (1.0 / 7.0);
                vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
                gx0 = fract(gx0);
                vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                vec4 sz0 = step(gz0, vec4(0.0));
                gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                gy0 -= sz0 * (step(0.0, gy0) - 0.5);

                vec4 gx1 = ixy1 * (1.0 / 7.0);
                vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
                gx1 = fract(gx1);
                vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                vec4 sz1 = step(gz1, vec4(0.0));
                gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                gy1 -= sz1 * (step(0.0, gy1) - 0.5);

                vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
                vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
                vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
                vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
                vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
                vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
                vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
                vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

                vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                g000 *= norm0.x;
                g010 *= norm0.y;
                g100 *= norm0.z;
                g110 *= norm0.w;
                vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                g001 *= norm1.x;
                g011 *= norm1.y;
                g101 *= norm1.z;
                g111 *= norm1.w;

                float n000 = dot(g000, Pf0);
                float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                float n111 = dot(g111, Pf1);

                vec3 fade_xyz = fade(Pf0);
                vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
                return 2.2 * n_xyz;
              }

              void main() {
                vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
                float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));
                vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);
                float noise1 = cnoise(noisePosition * 0.08);
                float noise2 = cnoise(noisePosition * 0.06);
                float noise3 = cnoise(noisePosition * 0.4);
                vec3 lastPosition = updatePosition + vec3(0.0,
                  noise1 * sin1 * 8.0
                  + noise2 * sin1 * 8.0
                  + noise3 * (abs(sin1) * 2.0 + 0.5)
                  + pow(sin1, 2.0) * 40.0, 0.0);

                vPosition = lastPosition;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
              }
            `,
            fragmentShader: `
              precision highp float;
              in vec3 vPosition;
              out vec4 fragColor;

              void main() {
                float height = clamp(vPosition.y / 32.0, 0.0, 1.0);
                float distFade = clamp(1.0 - length(vec2(vPosition.x * 0.35, vPosition.z)) / 120.0, 0.0, 1.0);
                float opacity = clamp((height * 0.85 + 0.12) * distFade * 0.95, 0.0, 1.0);

                vec3 shadow = vec3(0.055, 0.145, 0.105);
                vec3 mid = vec3(0.145, 0.310, 0.235);
                vec3 highlight = vec3(0.820, 0.690, 0.340);
                vec3 color = mix(shadow, mid, height * 0.75);
                color = mix(color, highlight, height * height * 0.35);

                fragColor = vec4(color, opacity);
              }
            `,
            transparent: true,
            depthWrite: false,
          })
        );
      }

      render(delta) {
        this.uniforms.time.value += delta * speedRef.current;
      }
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    const plane = new Plane();

    const getSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) return rect;
      const hero = container.closest("#hero");
      return hero ? hero.getBoundingClientRect() : rect;
    };

    const resize = () => {
      const { width, height } = getSize();
      if (width === 0 || height === 0) return;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = (now) => {
      resize();

      if (shouldAnimate) {
        const delta = Math.min((now - lastFrameTime) / 1000, 0.1);
        lastFrameTime = now;
        if (delta > 0) {
          plane.render(delta);
        }
      }

      renderer.render(scene, camera);
    };

    const renderLoop = (now) => {
      if (!active) return;
      render(now);
      frameId = requestAnimationFrame(renderLoop);
    };

    renderer.setClearColor(0x000000, 0);
    camera.position.set(0, 16, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 28, 0));
    scene.add(plane.mesh);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);
    const hero = container.closest("#hero");
    if (hero) resizeObserver.observe(hero);

    resize();
    frameId = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver.disconnect();
      scene.remove(plane.mesh);
      plane.mesh.geometry.dispose();
      plane.mesh.material.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, [ready, cameraZ, planeSize]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true" />
  );
}
