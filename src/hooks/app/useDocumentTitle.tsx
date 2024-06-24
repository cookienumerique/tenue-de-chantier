import { useEffect } from 'react';

/**
 * @description Set the document title
 * @param title
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `Tenue de chantier - ${title}`;
  }, [title]);
}
