# PIX-GOLF-CAMARAS — Project Overview

This file summarizes the project structure, purpose of each folder/file and key interactions. It's written so an AI agent (or a new developer) can quickly understand how the app is organized and where to look for functionality.

---

## Quick summary

- React + Vite single-page app using Tailwind for styles.
- Local mock backend available via `json-server` (see `db.json`).
- Main feature areas: Cameras management, Shipments (logistics), Tournaments, Workers, Map view, Tasks, and Google Calendar OAuth integration.
- Central app state is provided by the `useAppState` hook.

---

## How to run

- Start local JSON server (mock API):
  - `npm run server` (serves `db.json` on port 3001)
- Start dev server (Vite):
  - `npm run dev`
- Start both concurrently (recommended during development):
  - `npm run dev:full`
- Build:
  - `npm run build`

---

## Top-level files

- `index.html` — App HTML entry.
- `vite.config.js`, `postcss.config.js`, `tailwind.config.js` — build and styling tooling.
- `db.json` — mock database used by `json-server` (sample data for cameras, workers, tournaments, shipments).
- `package.json` — scripts and dependencies (Vite, Tailwind, json-server, etc.).
- `README.md` — project readme (may contain set up notes).

---

## `src/` — Application source

Overview: `src` contains UI components grouped by feature, pages, service wrappers, hooks and small data helpers.

- `main.jsx` — React entry. Mounts the app and providers.
- `App.jsx` — Root application component, layout and routing.
- `index.css`, `App.css` — Tailwind / global styles.

### `src/components/` — UI components grouped by feature

Each subfolder contains presentational + small container components for that domain.

- `h.jsx` — small helper component (likely a tiny utility header or placeholder).

- `Cameras/`

  - `CameraCard.jsx` — Compact card used in lists/grids to show camera summary info.
  - `CameraForm.jsx` — Form for creating/updating camera records (model, serial, SIM, status, location, etc.).
  - `CamerasTable.jsx` — Main table rendering the list of cameras. Includes action buttons (view, edit, delete) and uses `StatusBadge` for camera state. (Previously contained an accidental block referencing shipment logic; cleaned up.)

- `Dashboard/`

  - `ActiveTournaments.jsx` — Widget showing active tournaments.
  - `StatsGrid.jsx` — Grid of small stats for the dashboard.

- `Debug/`

  - `KeyChecker.jsx` — Small debug component to inspect API keys or env values.

- `GoogleCalendar/`

  - `OAuthCallback.jsx` — OAuth callback handler for Google Calendar integration.

- `Layout/`

  - `Header.jsx` — Top navigation/header.
  - `Layout.jsx` — App layout wrapper including navigation and content area.
  - `Navigation.jsx` — Side navigation / menu.

- `Logistics/` (shipments)

  - `ShipmentsCard.jsx` — Compact summary card for a shipment.
  - `ShipmentsForm.jsx` — Form to create/update shipments. Includes:
    - selection of destination (Mexican states), date, recipient/shipper, status, cameras to include.
    - contextual status selector with explanatory text (e.g., "Enviado -> cameras change to EN ENVIO").
  - `ShipmentsList.jsx` — List view of shipments (compact rows/cards).
  - `ShipmentsTable.jsx` — Full table with actions, status updates, and view details.

- `Map/`

  - `MexicoMap.jsx` — Map view using `react-leaflet` + `leaflet`, likely to display cameras or tournament locations.

- `Tasks/`

  - `TasksList.jsx` — Tasks management list (task -> create shipment from task helper exists in state hook).

- `Tournaments/`

  - `TournamentForm.jsx` — Modal form to create/edit tournaments. Manages fields: name, location, holes, dates, status, assigned worker, cameras. It uses local `showForm` state and calls `onSave`/`onCancel` passed by pages.
  - `TournamentModal.jsx` — Modal wrapper to show tournament details.
  - `TournamentTable.jsx` — Table to list tournaments with actions (edit, delete, view).
  - `WeeklyView.jsx` — A weekly calendar or schedule view of tournaments/events.

- `UI/`

  - `Button.jsx` — Reusable button component.
  - `StatusBadge.jsx` — Small badge component to render statuses (used for cameras, shipments, etc.).

- `Workers/`
  - `WorkerCard.jsx` — Compact worker card.
  - `WorkerForm.jsx` — Form to create/edit workers. Integrates `camerasAssigned` in creation/updating flows.
  - `WorkersTable.jsx` — Table to list workers and actions.

### `src/data/`

- `mockData.js` — Additional mock/test data used during development.

### `src/hooks/`

- `useAppState.js` — CENTRAL app state hook. This is the primary place where app data is fetched, stored and mutated. Responsibilities:

  - Loads initial data from `apiService` (or falls back to local `initial*` arrays in offline mode).
  - Exposes state and CRUD functions for `tournaments`, `workers`, `cameras`, `shipments`, and `tasks`.
  - Contains logic that keeps `cameras` and `workers` consistent when assignments change (examples: when creating/updating a tournament or shipment the code updates camera `assignedTo`, `assignedWorkerId`, `status`, and also updates `workers[].camerasAssigned`).
  - Key functions: `createWorker`, `updateWorker`, `createTournament`, `updateTournament`, `createShipment`, `updateShipment`, `handleShipmentStatusChange`, `updateCamera`, `createCamera`.
  - Important note: the hook maintains both online and offline flows. When `apiAvailable` is true it uses `apiService` functions and persists changes on the backend; otherwise it updates local state only.

- `useTournamentForm.js` — Helper hook for tournament form state/validation.

### `src/pages/` — Page-level components (routed views)

- `Cameras.jsx` — Cameras page, composes `CamerasTable`, `CameraForm`, etc.
- `Dashboard.jsx` — Dashboard page; uses `ActiveTournaments`, `StatsGrid`.
- `Logistics.jsx` — Shipments page.
- `Map.jsx` — Map page.
- `Tournaments.jsx` — Tournaments page; composes `TournamentTable` and `TournamentForm`, contains logic to show form and handle CRUD callbacks.
- `Workers.jsx` — Workers management page.

### `src/services/` — API wrappers

- `api.js` — Wraps HTTP calls to the backend / json-server. Contains functions like `getCameras`, `getWorkers`, `getShipments`, `createShipment`, `updateShipment`, `createCamera`, `updateCamera`, etc. The `useAppState` hook relies on `apiService` exported here.
- `googleCalendar.js`, `googleCalendarOAuth.js` — Helpers to integrate with Google Calendar (events creation and OAuth flows).

---

## Key data models (how entities link)

- Camera
  - `id` (e.g. "CS1"), `model`, `type`, `status` ("disponible", "en uso", "en envio", etc.), `location`, `assignedTo` (name), `assignedWorkerId`, `serialNumber`, `simNumber`, etc.
- Worker
  - `id`, `name`, `state`, `status`, contact info and `camerasAssigned: string[]`.
- Shipment
  - `id` (ENV-001), `cameras: string[]`, `destination`, `recipient` (name or id), `status` ("preparando", "enviado", "entregado", ...), `trackingNumber`.
- Tournament
  - `id`, `name`, `location`, `worker` (name), `workerId`, `cameras: string[]`, `status`.

Relationships:

- Cameras reference a worker via `assignedWorkerId` and `assignedTo` (human-readable name). Workers keep an array `camerasAssigned` to reflect that mapping.
- Shipments carry camera IDs and a `recipient` which can be matched to a worker (currently the app matches by `name` or `id` — prefer `workerId` for robustness).

---

## Important logic & flows (where to change behavior)

- Centralized in `useAppState.js`:

  - When a shipment is created or updated with state `enviado`, the hook sets camera status to `en envio` and assigns cameras to the recipient (tries to find a worker by name/id and sets `assignedWorkerId`). It also updates the worker's `camerasAssigned`.
  - When a shipment changes to `entregado`, the hook sets cameras to `disponible` (or keeps assigned depending on your business rule), sets `location` to the shipment destination, and adds cameras to worker's list.
  - Tournament creation/updates also assign cameras to the tournament or worker and update camera `status` to `en uso`.

- UI components read `camerasData` and `workersData` from context/hook and react to `status`/`assignedWorkerId` to show badges, filter lists and in `ShipmentsForm` to show available cameras.

---

## Recommendations / Notes for automation agents

- Prefer passing `recipient` as `workerId` from the frontend when creating/updating shipments to avoid ambiguity from matching by name.
- If you need atomic consistency (avoid race conditions when two agents update the same camera), implement server-side locking or update API endpoints that accept a transactional change (e.g., `POST /shipments` that updates cameras and workers in one call).
- Keep `useAppState` as the single source of truth in the client. If you add background sync or websockets, ensure to merge remote updates into this hook.

---

## Files to inspect first for specific tasks

- Changing camera assignment logic: `src/hooks/useAppState.js` (search for `handleShipmentStatusChange`, `createShipment`, `handleNewTournamentCameras`).
- API changes: `src/services/api.js`.
- Shipment form adjustments (send `recipient` as id): `src/components/Logistics/ShipmentsForm.jsx` and `src/pages/Logistics.jsx`.
- Camera availability filter: `src/components/Logistics/ShipmentsForm.jsx` and `src/components/Cameras/CamerasTable.jsx`.

---

## Changelog (recent edits made during pair-programming session)

- `src/components/Logistics/ShipmentsForm.jsx` — status selector updated to include emoji and contextual help text for status values.
- `src/components/Cameras/CamerasTable.jsx` — removed accidental `useMemo` block that referenced shipment variables; cleaned imports.
- `src/hooks/useAppState.js` — added logic to set `assignedWorkerId` and update `workersData[].camerasAssigned` when shipments are created/updated and change status to `enviado`/`entregado`.

---

## Contact points / Useful grep patterns

- `handleShipmentStatusChange` — search in `useAppState.js` for shipment state handling.
- `assignedWorkerId` — search to find camera<->worker assignment points.
- `camerasAssigned` — search to find where worker lists are updated.
- `apiService` — search in `src/services/api.js` to modify backend interaction.

---

If you want, I can:

- Convert this overview into `README_DEVELOPER.md` or place it under `docs/`.
- Update `ShipmentsForm.jsx` to send `recipient` as `workerId` (more robust) and wire UI to show worker names while keeping the id in payload.
- Create a small sequence diagram (text) describing the flow from creating a shipment -> updating cameras -> updating worker.

Tell me which of these follow-ups you prefer and I will implement it.
