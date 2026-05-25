# Story 1.3: Full Decoded JSON Panel

**Status:** Draft

---

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["read_file", "grep_search", "get_errors"]

---

## Story

**As a** developer,
**I want** to see the full decoded JWT JSON in a dedicated panel after I input a token,
**so that** I can inspect all claims in one place without switching between separate views.

---

## Acceptance Criteria

1. When the user decodes a valid JWT, the UI renders a dedicated full JSON panel for the decoded token.
2. The panel shows the complete decoded object in a formatted, readable JSON block.
3. The panel updates immediately whenever a new valid token is decoded.
4. The panel is hidden or replaced with an empty state when no token is loaded.
5. Malformed tokens do not render stale JSON from a previous successful decode.
6. The JSON view preserves readability for long payloads by allowing wrapping or horizontal scrolling.
7. The implementation uses Angular component composition and does not access browser APIs directly from the template.
8. The full JSON panel is consistent with the visual style defined in [docs/ui-architecture.md](../../../ui-architecture.md).

---

## Tasks / Subtasks

- [x] Add a dedicated decoded JSON panel component for the full token object.
- [x] Bind the panel to the current decoded JWT state in the page container or facade.
- [x] Ensure the panel clears correctly when decoding fails or the input is emptied.
- [x] Reuse the existing JSON formatting approach so the panel matches the rest of the UI.
- [ ] Add unit tests for update, empty state, and invalid-token behavior.

---

## Dev Notes

- Keep the panel presentational and stateless.
- Use the decoded JWT object returned by `JwtService` as the source of truth.
- Avoid duplicating the same payload in multiple places unless the UX requires it.
- Suggested file targets:
  - `src/app/features/jwt-decoder/components/jwt-full-json-panel/`
  - `src/app/features/jwt-decoder/jwt-decoder-page.component.ts`

---

## Testing

- Verify the full JSON panel appears after a valid decode.
- Verify the panel refreshes when the token changes.
- Verify invalid input does not keep an old decoded JSON visible.
- Verify the panel remains readable on desktop and mobile widths.

---

## CodeRabbit Integration

> **CodeRabbit Integration**: Disabled
>
> CodeRabbit CLI is not enabled in `core-config.yaml`.
> Quality validation will use manual review process only.

---

## Change Log

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 2026-05-24 | v1.0 | Initial story draft for the full decoded JSON panel | @sm |