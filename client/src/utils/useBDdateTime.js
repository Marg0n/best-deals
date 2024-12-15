
export const localDate = (gmtDateString) => {
  try {
    // Parse the given GMT date string
    const gmtDate = new Date(gmtDateString);

    // Check if the date is valid
    if (isNaN(gmtDate)) {
      throw new Error('Invalid date');
    }

    // Format the date and time in 12-hour format for Dhaka time zone
    const options = {
      weekday: 'short',       // 'narrow', 'short', 'long'
      year: 'numeric',        // 'numeric', '2-digit'
      month: 'short',         // 'numeric', '2-digit', 'narrow', 'short', 'long'
      day: 'numeric',         // 'numeric', '2-digit'
      hour: '2-digit',        // 'numeric', '2-digit'
      minute: '2-digit',      // 'numeric', '2-digit'
      second: '2-digit',      // 'numeric', '2-digit'
      hour12: true,           // true, false
      timeZone: 'Asia/Dhaka'  // 'short', 'long'
      // era: 'narrow', 'short', 'long'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(gmtDate);

    // Output: Mon, 07 Oct 2024, 01:24:50 PM BST

    return formattedDate;
  }
  catch (e) {
    // console.warn('Could not format date', e);
    return 'Invalid date';
  }
};
