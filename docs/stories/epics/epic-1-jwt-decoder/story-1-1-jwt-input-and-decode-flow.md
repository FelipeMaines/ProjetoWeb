# Story 1.1: JWT Input and Decode Flow

**Status:** Approved

---

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["read_file", "grep_search", "get_errors"]

---

## Story

**As a** developer,
**I want** to paste a JWT and see its header and payload decoded in a clean Angular interface,
**so that** I can inspect token content quickly during everyday API and authentication work.

---

## Acceptance Criteria

1. The UI shows a prominent JWT input area that accepts a full token string.
2. The user can paste or type a JWT and trigger decoding without a page reload.
3. The app validates the token shape and shows a clear error state for empty or malformed input.
4. A successful decode renders header and payload in separate formatted JSON panels.
5. The summary area shows useful metadata such as algorithm, issued-at, and expiration when present.
6. The interface visually distinguishes valid, invalid, and expired token states.
7. The decode flow uses Angular components and services, not direct browser logic in the template.
8. The implementation remains frontend-only and does not require any API calls.
9. The layout remains readable on desktop and does not break when the decoded JSON is large.
10. The main input, result panels, and summary map cleanly to the UI specification in [docs/ui-architecture.md](../../../ui-architecture.md).

---

## Tasks / Subtasks

- [ ] Create the JWT input component with value binding, clear action, and submit event.
- [ ] Implement the JWT service to validate, split, decode, and parse header and payload.
- [ ] Build the summary panel to display algorithm and token metadata.
- [ ] Build the header and payload panels with formatted JSON output.
- [ ] Wire the page container or facade so input updates propagate to decoded output.
- [ ] Add invalid-token and expired-token visual states.
- [ ] Add unit tests for decode success, malformed token, and Base64URL parsing errors.

---

## Dev Notes

- Use standalone Angular components.
- Keep decoding logic pure and isolated in `JwtService`.
- Use `OnPush` for presentational panels.
- Do not access `localStorage` in this story.
- Suggested file targets:
  - `src/app/features/jwt-decoder/components/jwt-input/`
  - `src/app/features/jwt-decoder/components/jwt-header-panel/`
  - `src/app/features/jwt-decoder/components/jwt-payload-panel/`
  - `src/app/features/jwt-decoder/components/jwt-summary-panel/`
  - `src/app/core/services/jwt.service.ts`

---

## Testing

- Verify a valid JWT renders JSON panels correctly.
- Verify malformed JWT input shows an error banner and no crash.
- Verify expired tokens are flagged when `exp` is in the past.
- Verify empty input returns the empty state.
- Verify the service can be unit tested without DOM dependencies.

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
| 2026-05-24 | v1.0 | Initial story draft for JWT input and decode flow | @sm |
