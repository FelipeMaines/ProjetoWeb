# JWT Decoder UI Specification

**Version:** v1.0
**Last Updated:** 2026-05-24
**Status:** Draft

---

## Purpose

This document defines the user interface specification for the JWT Decoder product. It focuses on the visual layout, component boundaries, props, states, and styling rules for an Angular + TypeScript frontend that is optimized for fast developer productivity.

The UI must feel extremely clean, compact, and direct. The primary experience is: paste token, inspect decoded result, revisit recent tokens.

---

## Design Principles

- Prioritize speed of reading over decoration.
- Keep the main action visible at all times.
- Use visual hierarchy to separate input, decoded content, and history.
- Keep JSON readable without making the layout feel like a generic admin panel.
- Use strong spacing discipline and subtle contrast instead of loud colors.
- Make all states explicit: empty, success, invalid, expired, loading, and history-selected.
- Preserve a local-first mental model and avoid any visual hint of remote sync or account concepts.

---

## Information Architecture

### Primary User Path

1. User pastes a JWT into the input field.
2. The token is decoded immediately or after a clear action.
3. Header and payload are shown in dedicated JSON panels.
4. Summary metadata is shown above the panels.
5. Recent tokens are listed in the history sidebar.

### Screen Regions

- Top bar: product title and small utility actions.
- Main center column: token input and decoded content.
- Side panel: recent history.
- Optional footer: small status text, version, or local-only notice.

---

## Layout Specification

### Desktop Layout

The desktop layout uses a two-column composition:

- Main column: 68% to 74% of width.
- Sidebar: 26% to 32% of width.
- Gutter between columns: 24px.

The main column contains:

- Token input card at the top.
- Summary strip below it.
- Header and payload panels stacked vertically.
- Optional signature panel in a lower collapsed state or hidden by default.

The sidebar contains:

- History title.
- Searchless recent list.
- Clear history action.
- Empty state when no items exist.

### Tablet Layout

- Sidebar moves below the main content.
- Panels remain in a single vertical flow.
- History becomes a collapsible section.

### Mobile Layout

- Single-column layout.
- History becomes a bottom section or accordion.
- Input remains pinned near the top of the visible content.
- JSON panels stack with generous spacing but reduced padding.

---

## Visual Design System

### Color Palette

The palette should be calm and functional, with a slight technical character.

#### Core Colors

- `--color-bg`: #0b1020
- `--color-surface`: #11182d
- `--color-surface-raised`: #18223d
- `--color-border`: #26324f
- `--color-text`: #e8eefc
- `--color-text-muted`: #9aa8c7
- `--color-accent`: #5dd6c0
- `--color-accent-strong`: #37c8b0
- `--color-danger`: #ff6b6b
- `--color-warning`: #f5b84b
- `--color-success`: #4ade80
- `--color-info`: #60a5fa

#### Usage Rules

- Use accent color only for primary affordances and key highlights.
- Use danger only for invalid token states and destructive actions.
- Use warning for expired JWTs.
- Use success sparingly for successful decode confirmation.
- Use muted text for secondary metadata.

### Typography

- Font family: `Inter`, `ui-sans-serif`, `system-ui`, sans-serif.
- Base size: 16px.
- Line height: 1.5 for body text.
- JSON panels should use a monospace font stack such as `JetBrains Mono`, `SFMono-Regular`, `Consolas`, monospace.

### Spacing Scale

Use an 8px-based spacing scale.

- `--space-1`: 4px
- `--space-2`: 8px
- `--space-3`: 12px
- `--space-4`: 16px
- `--space-5`: 20px
- `--space-6`: 24px
- `--space-8`: 32px
- `--space-10`: 40px
- `--space-12`: 48px

### Radius and Shadow

- Small radius: 10px
- Medium radius: 14px
- Large radius: 20px
- Shadow should be subtle and mostly used for elevation between shell, cards, and overlays.

---

## Component Inventory

### 1. AppShellComponent

Purpose: Render the global frame, page chrome, and top-level layout.

Props:

- `title: string`
- `subtitle?: string`
- `showGlobalStatus?: boolean`

States:

- default
- compact
- loading-shell

Notes:

- This component is responsible for overall framing only.
- It must not contain JWT logic.

### 2. JwtDecoderPageComponent

Purpose: Orchestrate the full decoder experience.

Props:

- `initialToken?: string`
- `activeHistoryId?: string | null`

Outputs:

- `tokenChange: string`
- `tokenSubmit: string`
- `historySelect: string`
- `historyRemove: string`
- `historyClear: void`

States:

- empty
- input-ready
- decoding
- decoded
- invalid
- expired
- history-selected

Notes:

- This is the page-level coordinator.
- It binds the facade or feature state to the visual components.

### 3. JwtInputComponent

Purpose: Accept the JWT and expose decode intent.

Props:

- `value: string`
- `placeholder?: string`
- `disabled?: boolean`
- `autoDecode?: boolean`
- `errorMessage?: string | null`
- `helperText?: string | null`
- `maxLength?: number`

Outputs:

- `valueChange: string`
- `submit: string`
- `clear: void`
- `paste: string`

States:

- empty
- focused
- valid
- invalid
- disabled

UX rules:

- The input should be the visual anchor of the page.
- The decode action should be obvious but not visually noisy.
- A paste event should optionally trigger decode if `autoDecode` is true.

### 4. JwtSummaryPanelComponent

Purpose: Show concise metadata about the decoded token.

Props:

- `algorithm?: string | null`
- `subject?: string | null`
- `issuer?: string | null`
- `audience?: string | string[] | null`
- `issuedAt?: string | null`
- `expiresAt?: string | null`
- `expiresIn?: string | null`
- `status?: 'empty' | 'valid' | 'expired' | 'invalid'`

States:

- empty
- valid
- expired
- invalid

UX rules:

- Display metadata as compact chips or labeled rows.
- Expiration status should be visually prominent but not alarming unless expired.

### 5. JwtHeaderPanelComponent

Purpose: Present the decoded JWT header as formatted JSON.

Props:

- `data: Record<string, unknown> | null`
- `collapsed?: boolean`
- `title?: string`
- `copyEnabled?: boolean`

Outputs:

- `copy: string`
- `toggleCollapse: void`

States:

- empty
- populated
- collapsed
- error

UX rules:

- Keep the header visible by default.
- Use a monospace block with line wrapping disabled by default and horizontal scroll when needed.
- Provide a copy action on the panel header.

### 6. JwtPayloadPanelComponent

Purpose: Present the decoded JWT payload as formatted JSON.

Props:

- `data: Record<string, unknown> | null`
- `collapsed?: boolean`
- `title?: string`
- `copyEnabled?: boolean`
- `highlightClaims?: string[]`

Outputs:

- `copy: string`
- `toggleCollapse: void`

States:

- empty
- populated
- collapsed
- error

UX rules:

- This panel should be the visual focus after input.
- Highlight key claims such as `sub`, `exp`, `iat`, and `iss`.
- Keep claim highlighting subtle and precise.

### 7. JwtHistorySidebarComponent

Purpose: List recent tokens and support quick reuse.

Props:

- `items: HistoryItem[]`
- `selectedId?: string | null`
- `maxItems?: number`
- `collapsed?: boolean`
- `showTimestamps?: boolean`

Outputs:

- `select: string`
- `remove: string`
- `clear: void`
- `toggleCollapse: void`

States:

- empty
- populated
- collapsed
- selection-active

UX rules:

- Each history item should show a short label, algorithm, and relative time.
- The selected item should be clearly indicated.
- Clear history must require an intentional action.

### 8. JwtActionsBarComponent

Purpose: Provide compact utility actions close to the input and result area.

Props:

- `canClearInput?: boolean`
- `canCopyResult?: boolean`
- `canClearHistory?: boolean`
- `disabled?: boolean`

Outputs:

- `clearInput: void`
- `copyResult: void`
- `clearHistory: void`

States:

- default
- disabled
- destructive-ready

### 9. EmptyStateComponent

Purpose: Explain what the user should do when there is no token or history.

Props:

- `title: string`
- `description: string`
- `actionLabel?: string`

Outputs:

- `action: void`

States:

- no-token
- no-history
- no-results

### 10. ErrorBannerComponent

Purpose: Display validation or parsing problems clearly.

Props:

- `message: string`
- `severity?: 'warning' | 'error'`
- `dismissible?: boolean`

Outputs:

- `dismiss: void`

States:

- warning
- error
- dismissible

---

## Angular Component Contract Details

### Recommended Inputs Pattern

Use Angular `input()` or `@Input()` for component data and `output()` or `@Output()` for user actions.

### Recommended State Pattern

Use signals or a lightweight facade for page orchestration.

Suggested state model:

```typescript
interface JwtDecoderViewState {
  token: string;
  status: 'empty' | 'decoding' | 'valid' | 'invalid' | 'expired';
  errorMessage: string | null;
  decodedHeader: Record<string, unknown> | null;
  decodedPayload: Record<string, unknown> | null;
  historyItems: HistoryItem[];
  selectedHistoryId: string | null;
}
```

### State Transition Rules

- Empty input returns the page to the default state.
- Invalid token shows a banner but does not clear the current token automatically.
- Successful decode updates the result panels and history.
- Selecting a history item repopulates the input and result panels.
- Clearing history only affects the sidebar state and storage.

---

## Visual Composition Rules

### Input Card

- Positioned at the top of the main column.
- Large enough for long tokens.
- Contains label, helper text, text area, and action row.
- Should feel like the main work surface.

### Result Area

- Summary panel appears first.
- Header panel appears before payload panel.
- Payload panel should have slightly stronger visual emphasis.
- Panels use a consistent card style with soft elevation.

### History Sidebar

- Use a narrower panel with a clear title.
- Add a subtle divider between items.
- The empty state should feel calm, not broken.
- History items should be compact and click-ready.

---

## Color and State Mapping

| State | Background | Text | Accent | Notes |
| --- | --- | --- | --- | --- |
| Default | `--color-surface` | `--color-text` | `--color-accent` | Normal browsing state |
| Empty | `--color-surface-raised` | `--color-text-muted` | `--color-info` | Prompt the user to paste a token |
| Valid | `--color-surface` | `--color-text` | `--color-success` | Positive success state |
| Invalid | `--color-surface` | `--color-text` | `--color-danger` | Show a clear, concise error |
| Expired | `--color-surface` | `--color-text` | `--color-warning` | Highlight expiry without panic |

---

## Component States Summary

| Component | Empty | Loading | Success | Invalid | Collapsed | Selection |
| --- | --- | --- | --- | --- | --- | --- |
| JwtInputComponent | Yes | Yes | Yes | Yes | No | No |
| JwtSummaryPanelComponent | Yes | No | Yes | Yes | No | No |
| JwtHeaderPanelComponent | Yes | No | Yes | Yes | Yes | No |
| JwtPayloadPanelComponent | Yes | No | Yes | Yes | Yes | No |
| JwtHistorySidebarComponent | Yes | No | Yes | No | Yes | Yes |
| JwtActionsBarComponent | No | No | Yes | No | No | No |

---

## Accessibility Requirements

- Maintain WCAG 2.1 AA contrast or better.
- Every action must have a visible label or accessible name.
- Panel headers should be keyboard focusable when interactive.
- History items must be navigable with keyboard focus.
- Error messaging must not rely on color alone.
- JSON blocks must remain selectable and copyable.

---

## Responsive Behavior

### Breakpoints

- Small: below 640px
- Medium: 640px to 1024px
- Large: above 1024px

### Behavior Rules

- On small screens, the history section moves below the decoded panels.
- On medium screens, the sidebar can collapse into an accordion.
- On large screens, the sidebar remains visible.
- The input should remain the first and most obvious interaction point at all sizes.

---

## Interaction Details

### Paste and Decode

- If auto-decode is enabled, pasted content should decode immediately.
- If auto-decode is disabled, show a clear primary action labeled Decode JWT.

### Copy Actions

- Copy buttons should be subtle and appear only on hover or focus if possible.
- Copy feedback should be short and non-blocking.

### Clear Actions

- Clear input is a low-risk action.
- Clear history is a destructive action and should use a stronger confirm pattern.

### History Selection

- Clicking a history item reloads the token in the input.
- The selected item should be visually emphasized.
- History should keep the newest token near the top.

---

## Design Tokens

### Surface Tokens

- Card background
- Card border
- Elevated panel background
- Sidebar background
- Input background

### Typography Tokens

- Page title size
- Section title size
- Body text size
- JSON text size
- Metadata label size

### Motion Tokens

- Fade-in for decoded panels
- Gentle slide for selected history items
- Very short transition durations only

Motion should be restrained and not distract from reading.

---

## Implementation Guidance for Angular

- Build each major region as a standalone component.
- Keep presentational components stateless where possible.
- Feed component state from a page-level facade or container.
- Use one-way data flow from facade to UI and explicit outputs back to the container.
- Store UI-only state such as panel collapse or selection in the page layer, not in the JWT service.

---

## Final UI Direction

The product should look like a precision tool, not a dashboard. The experience must feel focused, calm, and fast:

- A strong input area at the top.
- Two clean JSON cards for header and payload.
- A concise summary strip for key claims.
- A restrained history sidebar for quick recall.
- No visual clutter, no decorative noise, and no unnecessary chrome.

---

## Change Log

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 2026-05-24 | v1.0 | Initial UI specification for the JWT Decoder | @ux |

---

_Last Updated: 2026-05-24 | AIOX Framework Team_
