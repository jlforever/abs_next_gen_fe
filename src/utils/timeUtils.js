export const timezoneList = [
  { text: "Hawaii", value: "Pacific/Honolulu" },
  { text: "Pacific Time (US & Canada)", value: "America/Los_Angeles" },
  { text: "Mountain Time (US & Canada)", value: "America/Denver" },
  { text: "Central Time (US & Canada)", value: "America/Chicago" },
  { text: "Eastern Time (US & Canada)", value: "America/New_York" },
  { text: "Atlantic Time (Canada)", value: "America/Halifax" },
  { text: "London", value: "Europe/London" },
  { text: "Vienna", value: "Europe/Vienna" },
  { text: "Cairo", value: "Africa/Cairo" },
  { text: "Istanbul", value: "Europe/Istanbul" },
  { text: "Jerusalem", value: "Asia/Jerusalem" },
  { text: "Abu Dhabi", value: "Asia/Muscat" },
  { text: "Perth", value: "Australia/Perth" },
  { text: "Karachi", value: "Asia/Karachi" },
  { text: "Beijing", value: "Asia/Shanghai" },
  { text: "Adelaide", value: "Australia/Adelaide" },
  { text: "Tokyo", value: "Asia/Tokyo" },
  { text: "Sydney", value: "Australia/Sydney" },
  { text: "Guam", value: "Pacific/Guam" }
];

export const findTimezone = timezone => {
  if (timezone) {
    return timezoneList.find(tz => timezone === tz.text);
  }
  return "";
};
