
export const localDate = (date) => {
  try {
    // Given GMT date and time
    const gmtDate = new Date(date);

    // Format the date and time in 12-hour format for Dhaka time zone
    const options = {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Dhaka'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(gmtDate);

    // Output: Mon, 07 Oct 2024, 01:24:50 PM BST

    return formattedDate;
  }
  catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
};
