import React from 'react'

class CurrentDate {
    static todaydate  () {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
    
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        return formattedDate
      }
      static CurrentDateTime() {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
      
        const formattedDateTime = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
        return formattedDateTime;
      }
}

export default CurrentDate