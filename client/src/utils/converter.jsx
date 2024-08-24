/**
 * Convert a string to a slug.
 * @param {string} title - The title to convert.
 * @returns {string} - The resulting slug.
 */
export default function convertTitleToSlug(title) {
  // Convert to lower case
  let slug = title.toLowerCase();

  // Remove accents and special characters
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace spaces and special characters with hyphens
  slug = slug
    .replace(/[^\w\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .trim() // Remove leading and trailing spaces
    .replace(/[\s-]+/g, "-"); // Replace spaces and multiple hyphens with a single hyphen

  return slug;
}
