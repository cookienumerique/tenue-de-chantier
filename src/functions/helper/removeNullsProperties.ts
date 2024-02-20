/**
 * @description Remove null or undefined properties from an object
 * @param obj
 */
export default function removeNullsProperties(
  obj: object
) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== null && value !== undefined
    )
  );
}
