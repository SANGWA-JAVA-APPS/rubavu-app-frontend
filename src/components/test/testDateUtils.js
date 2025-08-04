// Test file to verify DateUtils functionality
import DateUtils from '../Global/DateUtils';

// Test cases for DateUtils
console.log('Testing DateUtils...');

// Test 1: Properly formatted date
console.log('Test 1 - Already formatted:', DateUtils.validateAndFormat('2025-04-01')); // Should return: 2025-04-01

// Test 2: Single digit month and day (the problematic format)
console.log('Test 2 - Single digits:', DateUtils.validateAndFormat('2025-4-1')); // Should return: 2025-04-01

// Test 3: Current date
console.log('Test 3 - Today:', DateUtils.today()); // Should return today in YYYY-MM-DD format

// Test 4: Date object
console.log('Test 4 - Date object:', DateUtils.formatForAPI(new Date('2025-04-01'))); // Should return: 2025-04-01

// Test 5: Invalid date
console.log('Test 5 - Invalid date:', DateUtils.validateAndFormat('invalid-date')); // Should return empty string

export default function testDateUtils() {
  console.log('DateUtils tests completed');
}
