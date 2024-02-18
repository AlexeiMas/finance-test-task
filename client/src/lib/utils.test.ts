import { cn, convertToCurrencyFormat } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should return an empty string when no arguments are provided', () => {
      expect(cn()).toBe('');
    });

    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should merge class names and objects correctly', () => {
      expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
    });

    it('should merge class names, objects, and arrays correctly', () => {
      expect(cn('class1', { class2: true, class3: false }, ['class4', 'class5'])).toBe(
        'class1 class2 class4 class5'
      );
    });
  });

  describe('convertToCurrencyFormat', () => {
    it('should return the correct currency format for a number', () => {
      expect(convertToCurrencyFormat(1234.56)).toBe('$1,234.56');
    });

    it('should return the correct currency format for a string', () => {
      expect(convertToCurrencyFormat('1234.56')).toBe('$1,234.56');
    });

    it('should return the correct currency format for a number with a different currency', () => {
      expect(convertToCurrencyFormat(1234.56, 'EUR')).toBe('€1,234.56');
    });
  });
});
