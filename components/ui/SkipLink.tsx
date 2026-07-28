/**
 * Styled in globals.css rather than with utilities: Tailwind's `not-sr-only`
 * resets `padding: 0`, so `focus:not-sr-only` alongside `px-5 py-3` collapsed
 * the focused link to a 24px-tall target — under the 44px minimum, on the one
 * control a keyboard user meets first.
 */
export function SkipLink() {
  return (
    <a href="#content" className="skip-link">
      Skip to content
    </a>
  );
}
