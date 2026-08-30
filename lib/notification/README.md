Lycaxia Notification

A lightweight JavaScript notification library for modern web projects.

Supports Toast, Log, Info, Confirm, Prompt, Dynamic Island, localization, and notification sounds.

Installation

CDN

<script src="https://lib.lycaxia.com/notification/script.js"></script>

The CDN version automatically injects the required styles and exposes the global "lyn" object.

npm

npm install lycaxia-notification

import lyn from "lycaxia-notification";

---

Quick Start

lyn.toast({
  Title: "Success",
  Mess: "Data saved successfully.",
  Status: "success"
});

---

API

"lyn.log()"

Displays a notification bar at the bottom of the screen.

lyn.log({
  Mess: "Request completed.",
  Status: "default"
});

Options:

- "Mess" — Message text
- "Status" — "default" or "error"

---

"lyn.info()"

Displays an informational modal.

lyn.info({
  Subtitle: "Lycaxia",
  Title: "Information",
  Mess: "This is an informational message."
});

Options:

- "Subtitle" — Modal subtitle
- "Title" — Modal title
- "Mess" — Message content

---

"lyn.confirm()"

Displays a confirmation modal.

lyn.confirm({
  Mess: "Are you sure?",
  Event: function () {
    console.log("Confirmed");
  }
});

Options:

- "Mess" — Confirmation message
- "Event" — Callback function or redirect URL

---

"lyn.prompt()"

Displays an input modal and returns a Promise.

const value = await lyn.prompt({
  Mess: "Enter your name:",
  Type: "text"
});

Options:

- "Mess" — Input prompt
- "Type" — Input type

Supported types:

"text" · "number" · "num" · "email" · "url" · "date" · "time" · "tel" · "range" · "password"

---

"lyn.toast()"

Displays a stackable toast notification.

lyn.toast({
  Title: "Success",
  Mess: "Operation completed.",
  Status: "success"
});

Options:

- "Title" — Toast title
- "Mess" — Toast message
- "Status" — Notification status
- "Permanent" — Prevent automatic dismissal

Status values:

"default" · "success" · "ok" · "error" · "err" · "failed"

---

"lyn.dynamicIsland()"

Displays an expandable Dynamic Island notification.

lyn.dynamicIsland({
  Status: "success",
  Label: "download",
  Mess: "Download finished!",
  Duration: 3000
});

Options:

- "Status" — Status theme
- "Label" — Built-in icon
- "Mess" — Message
- "Duration" — Duration in milliseconds
- "CustomIcon" — Custom SVG/HTML icon
- "CustomColor" — Custom icon color
- "CustomAnimation" — Custom CSS animation

Statuses:

"default" · "active" · "success" · "warning" · "failed" · "waiting"

Built-in icons:

"home" · "notification" · "music" · "info" · "download" · "upload" · "settings" · "success" · "failed" · "warning" · "wait"

For custom icons, use:

Label: "custom"

---

"lyn.setLang()"

Changes the notification language.

lyn.setLang("id");

Supported languages:

"en" · "id"

---

"lyn.soundNotification()"

Controls notification sounds.

lyn.soundNotification("allow");

Enable:

"allow" · "on" · "enable" · "true"

Disable:

"off" · "false"

---

React

import lyn from "lycaxia-notification";

function App() {
  const notify = () => {
    lyn.toast({
      Title: "Hello",
      Mess: "Hello from React!",
      Status: "success"
    });
  };

  return (
    <button onClick={notify}>
      Show Notification
    </button>
  );
}

export default App;

---

Documentation

Full documentation, API reference, and interactive examples:

https://api.lycaxia.com/notification/

Website

https://www.lycaxia.com/

---

© Lycaxia 2026