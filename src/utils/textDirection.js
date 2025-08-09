/**
 * Detect text direction based on the content of the text
 * @param {string} text - The text to analyze
 * @returns {string} - 'rtl' if text is predominantly RTL, 'ltr' otherwise
 */
export function detectTextDirection(text) {
    if (!text || typeof text !== 'string') {
        return 'ltr';
    }

    // Arabic Unicode ranges (including Arabic, Persian, Urdu)
    const arabicChars = '\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF';

    // Hebrew Unicode range
    const hebrewChars = '\u0590-\u05FF';

    // Other RTL scripts
    const otherRtlChars = '\u07C0-\u07FF'; // N'Ko

    // Combine all RTL character ranges
    const rtlChars = arabicChars + hebrewChars + otherRtlChars;

    // Count RTL characters
    const rtlCount = (text.match(new RegExp(`[${rtlChars}]`, 'g')) || []).length;

    // Count LTR characters (Latin alphabet, numbers, etc.)
    const ltrCount = (text.match(/[a-zA-Z0-9\u0100-\u017F\u0180-\u024F]/g) || []).length;

    // For mixed content, if there are any RTL characters and they make up at least 25% of directional characters,
    // or if RTL characters appear first, consider it RTL
    const totalDirectionalChars = rtlCount + ltrCount;

    if (totalDirectionalChars === 0) {
        return 'ltr';
    }

    // Check if text starts with RTL character
    const startsWithRtl = new RegExp(`^[\\s\\p{P}]*[${rtlChars}]`, 'u').test(text);

    // If starts with RTL or RTL chars are >= 25%, treat as RTL
    const rtlRatio = rtlCount / totalDirectionalChars;

    return (startsWithRtl || rtlRatio >= 0.25) ? 'rtl' : 'ltr';
}

/**
 * Get appropriate CSS classes for mixed text direction
 * @param {string} text - The text content
 * @returns {string} - CSS classes for proper text direction
 */
export function getTextDirectionClasses(text) {
    const direction = detectTextDirection(text);

    if (direction === 'rtl') {
        return 'dir-rtl';
    } else {
        return 'dir-ltr';
    }
}
