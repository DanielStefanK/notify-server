const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);
