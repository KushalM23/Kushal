"use client";

import React from "react";

/* ──────────────────────────────────────────────
   CRT OVERLAY
   
   Fixed full-screen overlay that adds:
   - Horizontal scanlines
   - Vignette darkening at edges
   - Subtle periodic flicker
   Always on top, pointer-events: none.
   ────────────────────────────────────────────── */

export default function CRTOverlay() {
    return (
        <div className="crt-overlay animate-crt-flicker">
            <div className="absolute inset-0 crt-scanlines" />
            <div className="absolute inset-0 crt-vignette" />
        </div>
    );
}
