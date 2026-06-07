"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/layout/section-heading";
import { IMAGES } from "@/lib/images";

export function TransformationGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, x)));
  }, []);

  const onPointerDown = () => {
    dragging.current = true;
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  return (
    <section
      id="gallery"
      className="py-24 md:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="گالری"
          title="تحولات واقعی"
          description="قبل و بعد — بکشید و مقایسه کنید"
        />
        <motion.div
          ref={containerRef}
          data-animate="fade-up"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-[16/10] max-w-4xl cursor-ew-resize select-none overflow-hidden rounded-2xl border border-border shadow-[0_0_60px_rgba(255,23,68,0.08)]"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          role="slider"
          aria-label="مقایسه قبل و بعد"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onClick={(e) => updatePosition(e.clientX)}
        >
          <Image
            src={IMAGES.gallery.after}
            alt="بعد از تحول"
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div
            className="absolute inset-0 overflow-hidden bg-background"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={IMAGES.gallery.before}
              alt="قبل از تحول"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
          <div
            className="absolute bottom-0 top-0 z-10 w-1 bg-gradient-to-b from-primary via-white to-secondary shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            style={{ left: `${position}%` }}
            onPointerDown={onPointerDown}
          >
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-background/80 backdrop-blur-sm transition-transform hover:scale-110">
              <span className="text-xs font-bold">↔</span>
            </div>
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs font-bold backdrop-blur-sm">
            قبل
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-bold backdrop-blur-sm">
            بعد
          </span>
        </motion.div>
      </div>
    </section>
  );
}
