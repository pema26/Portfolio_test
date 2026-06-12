// ============================================================================
//  src/lib/projectMeta.ts  —  shared labels for project categories & statuses
// ============================================================================
//
//  WHY THIS EXISTS: several pages (home, /projects, and each project page) need
//  to turn a category like "big-unique" into a friendly label like "Flagship"
//  with a matching colour. Keeping those definitions in ONE place means they
//  always agree. Edit a label or colour here and it changes everywhere.
//
//  "tone" is a colour name understood by ProjectCard.astro (accent / teal /
//  amber / slate).
// ============================================================================

export type Category = 'big-unique' | 'guided' | 'mini-unique';
export type Status = 'planned' | 'in-progress' | 'complete';

// The three project tiers. `order` controls the section order on /projects;
// `title` and `blurb` are the heading and one-liner shown above each section.
export const CATEGORY_META: Record<
  Category,
  { label: string; tone: 'accent' | 'teal' | 'amber'; order: number; title: string; blurb: string }
> = {
  'big-unique': {
    label: 'Flagship',
    tone: 'accent',
    order: 0,
    title: 'Flagship projects',
    blurb: 'Original, ambitious ideas I came up with myself and am building out.',
  },
  guided: {
    label: 'Guided',
    tone: 'teal',
    order: 1,
    title: 'Guided builds',
    blurb: 'Projects built by following a tutorial or course, to learn a topic deeply.',
  },
  'mini-unique': {
    label: 'Mini',
    tone: 'amber',
    order: 2,
    title: 'Mini projects',
    blurb: 'Small tools I wrote to solve a real, everyday annoyance of my own.',
  },
};

// Status pills. "complete" is null because a finished project needs no pill.
export const STATUS_META: Record<
  Status,
  { label: string; tone: 'amber' | 'slate' } | null
> = {
  planned: { label: 'Planned', tone: 'slate' },
  'in-progress': { label: 'In progress', tone: 'amber' },
  complete: null,
};
