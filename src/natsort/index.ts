const base_collator = new Intl.Collator(undefined, {
  usage: "sort",
  numeric: true,
  sensitivity: "base",
});

/**
 * Natural sort function with a "base" sensitivity.
 *
 * This ignores case, so won't sort "A" from "a"
 */
const natsort = base_collator.compare;
export default natsort;


const case_collator = new Intl.Collator(undefined, {
  usage: "sort",
  numeric: true,
  // sensitivity: "variant", // default
});
/**
 * Natural sort function with "variant" sensitivity
 */
export const casesort = case_collator.compare;
