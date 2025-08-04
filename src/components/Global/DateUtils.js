/**
 * Date formatting utilities for API requests
 */
class DateUtils {
  /**
   * Formats a date to YYYY-MM-DD format for API consumption
   * @param {string|Date} date - The date to format
   * @returns {string} - Formatted date string
   */
  static formatForAPI(date) {
    if (!date) return '';
    
    let dateObj;
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      return '';
    }
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date provided:', date);
      return '';
    }
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  
  /**
   * Validates and formats a date string
   * @param {string} dateStr - Date string to validate
   * @returns {string} - Properly formatted date string
   */
  static validateAndFormat(dateStr) {
    if (!dateStr) return '';
    
    // If already in correct format (YYYY-MM-DD), return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    
    // If in format YYYY-M-D, convert to YYYY-MM-DD
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateStr)) {
      const parts = dateStr.split('-');
      const year = parts[0];
      const month = String(parts[1]).padStart(2, '0');
      const day = String(parts[2]).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    // Try to parse and format
    return this.formatForAPI(dateStr);
  }
  
  /**
   * Gets today's date in YYYY-MM-DD format
   * @returns {string} - Today's date
   */
  static today() {
    return this.formatForAPI(new Date());
  }
}

export default DateUtils;
