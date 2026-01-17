---
name: paper-shaders-docs
description: Use when implementing Paper Shaders components, canvas animations, mesh gradients, or shader effects. Use when needing API reference for @paper-design/shaders or @paper-design/shaders-react packages.
---

# Paper Shaders Documentation

## Primary Documentation

**Official Docs:** https://shaders.paper.design/

Each shader has a dedicated page with interactive demos, props, and code examples:
- `https://shaders.paper.design/mesh-gradient`
- `https://shaders.paper.design/dot-orbit`
- `https://shaders.paper.design/[shader-name]` (use kebab-case)

Use `read_url_content` to fetch specific shader documentation.

## Context7 (Supplementary)

**Library ID:** `/paper-design/shaders`

Context7 has limited coverage (5 snippets). Use for quick lookups, but prefer official docs for complete API reference:

```
mcp_context7_query-docs(libraryId="/paper-design/shaders", query="your question here")
```

## Quick Reference

| Package | Install | Use Case |
|---------|---------|----------|
| `@paper-design/shaders-react` | `npm i @paper-design/shaders-react` | React components |
| `@paper-design/shaders` | `npm i @paper-design/shaders` | Vanilla JS |

> [!IMPORTANT]
> Pin dependencies - breaking changes may ship under 0.0.x versioning.

## Available Components (27 shaders)

**Gradients & Colors:**
MeshGradient, StaticMeshGradient, StaticRadialGradient, GrainGradient, ColorPanels

**Noise & Organic:**
SimplexNoise, PerlinNoise, NeuroNoise, Voronoi, Metaballs, Warp, Swirl

**Patterns & Effects:**
DotOrbit, DotGrid, Waves, Spiral, SmokeRing, GodRays, Water, LiquidMetal

**Textures & Filters:**
Dithering, ImageDithering, HalftoneDots, HalftoneCmyk, PaperTexture, FlutedGlass

**UI Elements:**
PulsingBorder, Heatmap

## When to Use This Skill

- Implementing animated backgrounds or textures
- Adding canvas-based shader effects to websites
- Working with any Paper Shader component
- Needing API reference for props and configuration
