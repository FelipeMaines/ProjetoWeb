# Epic 1: JWT Decoder

**Status:** Draft
**Product:** Decodificador de JWT
**Source Docs:** [docs/prd.md](../../prd.md), [docs/architecture.md](../../architecture.md), [docs/ui-architecture.md](../../ui-architecture.md)

---

## Epic Goal

Deliver a clean, fast, local-first JWT decoder in Angular that lets developers paste a token, inspect the decoded result, and reuse recent tokens from a browser-only history.

---

## Story Index

| Story | Title | Status | Summary |
| --- | --- | --- | --- |
| 1.1 | JWT input and decode flow | Approved | Build the main input path, decode action, and JSON visualization for header and payload. |
| 1.2 | Local history and persistence | Approved | Persist recent tokens in localStorage, render history, and support reuse and cleanup actions. |
| 1.3 | Full decoded JSON panel | Draft | Render the complete decoded JWT JSON in a dedicated panel after token input. |

---

## Epic Notes

- No backend or database is allowed.
- Angular services must own decode and storage logic.
- UI must stay minimal, fast, and readable.
- History is local to the browser and must survive refresh.
