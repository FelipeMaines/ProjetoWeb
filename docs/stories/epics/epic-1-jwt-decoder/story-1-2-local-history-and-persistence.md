# Story 1.2: Local History and Persistence

**Status:** Approved

---

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["read_file", "grep_search", "get_errors"]

---

## Story

**As a** developer,
**I want** to see my recently decoded JWTs in a local history sidebar,
**so that** I can reopen tokens quickly and keep my workflow inside the browser.

---

## Acceptance Criteria

1. The app stores successfully decoded JWTs in browser `localStorage`.
2. The history sidebar lists recent tokens with a compact, readable label.
3. Clicking a history item restores that token into the input and result panels.
4. The user can remove a single history item without affecting the rest.
5. The user can clear the entire history with an explicit destructive action.
6. History survives page refresh in the same browser and device.
7. Corrupted or missing `localStorage` data does not crash the app.
8. Storage access is isolated behind a dedicated Angular service.
9. The history list respects a defined maximum size and keeps the newest items first.
10. The sidebar state matches the UX specification in [docs/ui-architecture.md](../../../ui-architecture.md) and remains usable on desktop and mobile.

---

## Tasks / Subtasks

- [ ] Implement the storage service wrapper for namespaced `localStorage` access.
- [ ] Implement the history service to add, load, remove, and clear entries.
- [ ] Define the history entry model and storage key constants.
- [ ] Build the history sidebar component with select, remove, and clear actions.
- [ ] Connect history selection to the JWT decode view state.
- [ ] Add corruption handling for invalid stored JSON or unavailable storage.
- [ ] Add unit tests for persistence, deduplication, removal, and clear behavior.

---

## Dev Notes

- Keep browser storage access out of components.
- Store a compact record, not the entire UI state.
- Consider a small history cap such as 20 items to keep the sidebar fast.
- Suggested file targets:
  - `src/app/core/services/storage.service.ts`
  - `src/app/core/services/history.service.ts`
  - `src/app/core/tokens/storage-keys.ts`
  - `src/app/core/models/history-entry.model.ts`
  - `src/app/features/jwt-decoder/components/jwt-history-sidebar/`

---

## Testing

- Verify a decoded token is persisted and reloaded after refresh.
- Verify the history list updates after remove and clear actions.
- Verify malformed stored JSON is ignored or reset safely.
- Verify storage unavailable scenarios do not break the UI.
- Verify selection from history repopulates the current token and result view.

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
| 2026-05-24 | v1.0 | Initial story draft for local history and persistence | @sm |
