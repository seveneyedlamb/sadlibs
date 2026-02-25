# Future Changes & Refactoring Plan (V2)

As assessed by the Monk persona, the application in its current V1 state is a working, pragmatic monolith. It is ready for launch. However, as the application grows, the monolith will become a liability. The following are the planned refactoring steps for Version 2 to ensure maintainability and scalability without over-engineering.

## The Disease: Current Issues

1.  **Content is invading Logic:** The `STORIES` array is hardcoded directly inside the main application logic (`App.jsx`). Data is not logic. Adding new content currently risks breaking application functionality.
2.  **God File UI (`App.jsx`):** The main component handles the Hero section, Story selection, Input forms, `html2canvas` meme generation, Audio logic, Konami code, and three different Modals (How to Play, Exit, Prize). The file has too many responsibilities.
3.  **Effect Spaghetti:** Massive `useEffect` hooks manage document-level event listeners for audio, exit intent, and secret codes. These overlap in the same component space, making debugging difficult.
4.  **Monolithic CSS:** `index.css` relies heavily on `!important` tags and overlapping media queries, symptomatic of a single global stylesheet.

## The Path Forward: Pragmatic Refactoring

Keep the architecture flat and simple. We will organize by concern, not by abstract design patterns.

### 1. Extract the Data
-   **Action:** Create `src/data/stories.js`.
-   **Details:** Move the giant `STORIES` array out of `App.jsx` and into this dedicated data file. Import it where needed. This separates content from logic and significantly reduces the size of the main component.

### 2. Extract the Modals
-   **Action:** Create separate component files for each modal (e.g., `src/components/ExitModal.jsx`, `src/components/PrizeModal.jsx`, `src/components/HowToPlayModal.jsx`).
-   **Details:** Pass down necessary state via raw props. Avoid complex state management tools (like Redux or Context) unless absolutely necessary. Keep them as simple functional components.

### 3. Extract the Audio
-   **Action:** Create `src/components/AudioPlayer.jsx`.
-   **Details:** Encapsulate the audio element, mute state, volume slider, and related playback logic into this component. Let it manage its own internal UI state while exposing necessary controls or callbacks to the parent if needed.

### 4. Clean and Modularize CSS
-   **Action:** Transition away from a single global `index.css` for component-specific styles.
-   **Details:** Adopt CSS Modules (e.g., `AudioPlayer.module.css`) or a similar scoped styling approach. This will prevent class name collisions (like `.modal`) and reduce the need for `!important` overrides, leading to a more predictable stylesheets.

## Final Wisdom

The best code is no code. The second best code is simple code. The current implementation is the second best code. When implementing these future changes, ensure they simplify the cognitive load, not increase it.
