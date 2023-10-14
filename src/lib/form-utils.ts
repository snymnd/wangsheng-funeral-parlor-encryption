import { lookup } from 'mime-types';

/**
 * Validation for exact length
 * @param length exact string length
 * @param message error message
 * @returns React Hook Form's validation object
 */
export const exactLength = (length: number, message: string) => ({
  minLength: {
    value: length,
    message,
  },
  maxLength: {
    value: length,
    message,
  },
});

export const convertUrlToFileWithPreview = ({
  url,
  fileName,
}: {
  url?: string;
  fileName: string;
}) =>
  url
    ? [
        {
          preview: url,
          name: fileName,
          type: lookup(url),
        },
      ]
    : [];
