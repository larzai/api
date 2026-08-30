const isBrowser = typeof window !== "undefined";

const isBrowser = typeof window !== "undefined";

const soundUrl = new URL(
  "./assets/sound.mp3",
  import.meta.url
).href;

let isSoundAllowed = false;
let notificationAudio = null;

if (isBrowser) {
  const cssUrl = new URL(
    "./style.css",
    import.meta.url
  ).href;

  if (!document.querySelector(`link[href="${cssUrl}"]`)) {
    const linkEl = document.createElement("link");

    linkEl.rel = "stylesheet";
    linkEl.href = cssUrl;

    document.head.appendChild(linkEl);
  }
}

function setSoundNotification(status) {
  if (typeof status === "string") {
    const val = status.toLowerCase();

    isSoundAllowed =
      val === "allow" ||
      val === "on" ||
      val === "enable";
  } else {
    isSoundAllowed = Boolean(status);
  }
}

function playNotificationSound() {
  if (!isBrowser || !isSoundAllowed) {
    return;
  }

  if (!notificationAudio) {
    notificationAudio = new Audio(soundUrl);
    notificationAudio.preload = "auto";
  }

  notificationAudio.currentTime = 0;

  notificationAudio.play().catch(() => {});
}

const listBahasa = {
  id: {
    title_info: "Pesan",
    subtitle_info: "Dari ",
    title_confirm: "Konfirmasi",
    subtitle_confirm: "Konfirmasi",
    default_confirm: "Apakah anda yakin ingin melanjutkan?",
    cancel: "Batal",
    continue: "Lanjutkan",
    ok: "OK",
    prompt_title: "Formulir",
    prompt_subtitle: "Isi Formulir Berikut",
    send: "Kirim",
    bye: "Selamat tinggal",
    error: "Terdapat error",
    default_titleqr: "Scan di sini!",
    any_info:
      "Tombol ini menampilkan informasi tambahan mengenai pesan atau tindakan yang tersedia."
  },

  en: {
    title_info: "Message",
    subtitle_info: "From",
    title_confirm: "Confirmation",
    subtitle_confirm: "Confirmation",
    default_confirm: "Are you sure you want to continue?",
    cancel: "Cancel",
    continue: "Continue",
    ok: "OK",
    prompt_title: "Form",
    prompt_subtitle: "Fill Out This Form",
    send: "Send",
    bye: "Good bye",
    error: "There is an error",
    default_titleqr: "Scan here!",
    any_info:
      "This button displays additional information about the message or available action."
  }
};

let lang = listBahasa.en;

function setBahasa(langs) {
  if (listBahasa[langs]) {
    lang = listBahasa[langs];
  }
}

function showLog({
  Mess,
  Status
} = {}) {
  if (!isBrowser) {
    return;
  }

  playNotificationSound();

  const el = document.createElement("div");

  el.className =
    Status === "err" ||
    Status === "error" ||
    Status === "failed"
      ? "message-error"
      : "message-log";

  el.textContent = Mess || "";

  document.body.appendChild(el);

  el.offsetWidth;

  el.classList.add("show");

  setTimeout(() => {
    el.classList.remove("show");
    el.classList.add("hide");

    setTimeout(() => {
      el.remove();
    }, 500);
  }, 4000);
}

function createBaseModal(
  headerSubtitle,
  headerTitle,
  messageText,
  closeCallback,
  headerMess,
  type = "close"
) {
  playNotificationSound();

  const overlay =
    document.createElement("div");

  overlay.className =
    "message-sistem-overlay";

  const box =
    document.createElement("div");

  box.className =
    "message-sistem-boxinfo";

  const hr =
    document.createElement("div");

  hr.className = "line";

  const content =
    document.createElement("div");

  content.className =
    "message-sistem-content";

  const p =
    document.createElement("p");

  p.className =
    "message-sistem-message";

  p.innerHTML =
    (messageText || "")
      .replace(/\n/g, "<br/>");

  const btnContainer =
    document.createElement("div");

  btnContainer.className =
    "container-button";

  const header =
    document.createElement("div");

  header.className =
    "message-sistem-header";

  const headerText =
    document.createElement("div");

  headerText.className =
    "message-sistem-header-text";

  const subtitle =
    document.createElement("div");

  subtitle.className =
    "message-sistem-subtitle";

  subtitle.textContent =
    headerSubtitle || "";

  const title =
    document.createElement("h1");

  title.className =
    "message-sistem-title";

  title.textContent =
    headerTitle || "";

  headerText.append(
    subtitle,
    title
  );

  let closed = false;

  const close = () => {
    if (closed) {
      return;
    }

    closed = true;

    if (overlay.parentNode) {
      overlay.remove();
    }

    if (
      !document.querySelector(
        ".message-sistem-overlay"
      )
    ) {
      document.body.classList.remove(
        "no-scroll"
      );
    }

    if (closeCallback) {
      closeCallback();
    }
  };

  const about = () => {
    lyn.toast({
      Title:
        headerMess ||
        headerTitle ||
        lang.title_confirm,

      Mess: lang.any_info,

      Status: "default"
    });
  };

  const btn =
    document.createElement("button");

  btn.className =
    "message-sistem-custom-button";

  btn.type = "button";

  if (type === "any") {
    btn.innerHTML = `
      <svg
        viewBox="0 0 24 24"
        class="icon-message-sistem-custom-button"
      >
        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"/>
        <path d="M12 10h-1a1 1 0 0 0 0 2h1v6a1 1 0 0 0 2 0v-6a2 2 0 0 0-2-2Z"/>
        <circle cx="12" cy="6.5" r="1.5"/>
      </svg>
    `;

    btn.onclick = about;
  } else {
    btn.innerHTML = `
      <svg
        viewBox="0 0 24 24"
        class="icon-message-sistem-custom-button"
      >
        <path d="m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    `;

    btn.onclick = close;
  }

  header.append(
    headerText,
    btn
  );

  document.body.classList.add(
    "no-scroll"
  );

  return {
    overlay,
    box,
    hr,
    content,
    p,
    btnContainer,
    close,
    header,

    get closed() {
      return closed;
    }
  };
}

function showMessageSistemInfo({
  Subtitle =
    lang.subtitle_info +
    (
      isBrowser
        ? ` ${location.hostname}`
        : ""
    ),

  Title = lang.title_info,

  Mess
} = {}) {
  if (!isBrowser) {
    return;
  }

  const modal =
    createBaseModal(
      Subtitle,
      Title,
      Mess,
      null,
      Title,
      "close"
    );

  modal.content.append(
    modal.p,
    modal.btnContainer
  );

  modal.box.append(
    modal.header,
    modal.hr,
    modal.content
  );

  modal.overlay.appendChild(
    modal.box
  );

  document.body.appendChild(
    modal.overlay
  );
}

function showMessageSistemConfirm({
  Mess,
  Event
} = {}) {
  if (!isBrowser) {
    return;
  }

  const text =
    Mess === "default"
      ? lang.default_confirm
      : Mess;

  const modal =
    createBaseModal(
      lang.subtitle_confirm,
      lang.title_confirm,
      text,
      null,
      lang.title_confirm,
      "any"
    );

  const btnNo =
    document.createElement("button");

  btnNo.type = "button";
  btnNo.textContent = lang.cancel;
  btnNo.onclick = modal.close;

  const btnYes =
    document.createElement("button");

  btnYes.type = "button";
  btnYes.textContent =
    lang.continue;

  btnYes.onclick = () => {
    modal.close();

    if (Event) {
      if (typeof Event === "function") {
        Event();
      } else if (
        typeof Event === "string"
      ) {
        showLog({
          Mess: lang.bye
        });

        location.href = Event;
      }
    }
  };

  modal.btnContainer.append(
    btnNo,
    btnYes
  );

  modal.content.append(
    modal.p,
    modal.btnContainer
  );

  modal.box.append(
    modal.header,
    modal.hr,
    modal.content
  );

  modal.overlay.appendChild(
    modal.box
  );

  document.body.appendChild(
    modal.overlay
  );
}

function showMessageSistemPrompt({
  Mess,
  Type = "text"
} = {}) {
  return new Promise(
    (resolve, reject) => {
      if (!isBrowser) {
        reject(
          "Bukan di lingkungan browser"
        );

        return;
      }

      let submitted = false;

      const modal =
        createBaseModal(
          lang.prompt_subtitle,
          lang.prompt_title,
          Mess,

          () => {
            if (!submitted) {
              reject("Dibatalkan");
            }
          },

          lang.prompt_title,
          "any"
        );

      const input =
        document.createElement("input");

      input.className =
        "message-sistem-input";

      const validTypes = [
        "text",
        "number",
        "email",
        "url",
        "date",
        "time",
        "tel",
        "range",
        "password"
      ];

      const finalType =
        Type === "num"
          ? "number"
          : Type;

      input.type =
        validTypes.includes(finalType)
          ? finalType
          : "text";

      const btnNo =
        document.createElement("button");

      btnNo.type = "button";
      btnNo.textContent =
        lang.cancel;

      btnNo.onclick =
        modal.close;

      const btnYes =
        document.createElement("button");

      btnYes.type = "button";
      btnYes.textContent =
        lang.send;

      btnYes.onclick = () => {
        const val = input.value;

        submitted = true;

        modal.close();

        resolve(val);
      };

      modal.btnContainer.append(
        btnNo,
        btnYes
      );

      modal.content.append(
        modal.p,
        input,
        modal.btnContainer
      );

      modal.box.append(
        modal.header,
        modal.hr,
        modal.content
      );

      modal.overlay.appendChild(
        modal.box
      );

      document.body.appendChild(
        modal.overlay
      );

      setTimeout(() => {
        input.focus();
      }, 50);
    }
  );
}

function updateToastStack(container) {
  const toasts =
    Array.from(
      container.children
    );

  toasts.forEach(
    (toast, index) => {
      toast.dataset.index =
        index;

      if (index === 0) {
        if (
          toast.dataset.permanent !==
            "true" &&
          !toast.dataset.timerActive
        ) {
          toast.dataset.timerActive =
            "true";

          toast.timerId =
            setTimeout(() => {
              if (
                typeof toast.removeToast ===
                "function"
              ) {
                toast.removeToast();
              }
            }, 5000);
        }
      } else {
        if (toast.timerId) {
          clearTimeout(
            toast.timerId
          );
        }

        toast.timerId = null;

        delete toast.dataset
          .timerActive;
      }
    }
  );
}

function showMessageSistemToast({
  Title,
  Mess,
  Status = "default",
  Permanent = false
} = {}) {
  if (!isBrowser) {
    return;
  }

  playNotificationSound();

  let container =
    document.querySelector(
      ".lyraxis-toast-container"
    );

  if (!container) {
    container =
      document.createElement("div");

    container.className =
      "lyraxis-toast-container";

    document.body.appendChild(
      container
    );
  }

  const toast =
    document.createElement("div");

  toast.className =
    "lyraxis-toast";

  toast.dataset.permanent =
    Permanent ? "true" : "false";

  let iconSvg = "";

  let statusClass =
    "lyraxis-toast-default";

  if (
    Status === "success" ||
    Status === "ok"
  ) {
    statusClass =
      "lyraxis-toast-success";

    iconSvg = `
      <svg viewBox="0 0 24 24">
        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    `;
  } else if (
    [
      "err",
      "error",
      "failed"
    ].includes(Status)
  ) {
    statusClass =
      "lyraxis-toast-error";

    iconSvg = `
      <svg viewBox="0 0 24 24">
        <path d="m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    `;
  } else {
    iconSvg = `
      <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/>
      </svg>
    `;
  }

  toast.classList.add(
    statusClass
  );

  const iconBox =
    document.createElement("div");

  iconBox.className =
    "lyraxis-toast-icon";

  iconBox.innerHTML =
    iconSvg;

  const bodyBox =
    document.createElement("div");

  bodyBox.className =
    "lyraxis-toast-body";

  const titleEl =
    document.createElement("div");

  titleEl.className =
    "lyraxis-toast-title";

  titleEl.textContent =
    Title ||
    (
      Status === "success"
        ? "Berhasil"
        : Status === "error" ||
          Status === "failed"
          ? "Gagal"
          : "Informasi"
    );

  const msgEl =
    document.createElement("p");

  msgEl.className =
    "lyraxis-toast-message";

  msgEl.innerHTML =
    (Mess || "")
      .replace(/\n/g, "<br/>");

  bodyBox.append(
    titleEl,
    msgEl
  );

  const closeBtn =
    document.createElement("button");

  closeBtn.type = "button";

  closeBtn.className =
    "lyraxis-toast-close";

  closeBtn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  `;

  const removeToast = () => {
    if (toast.timerId) {
      clearTimeout(
        toast.timerId
      );
    }

    toast.classList.add("hide");

    setTimeout(() => {
      toast.remove();

      updateToastStack(
        container
      );

      if (!container.children.length) {
        container.remove();
      }
    }, 300);
  };

  toast.removeToast =
    removeToast;

  closeBtn.onclick =
    removeToast;

  toast.append(
    iconBox,
    bodyBox,
    closeBtn
  );

  container.appendChild(
    toast
  );

  updateToastStack(
    container
  );
}


/* =========================
   DYNAMIC ISLAND
========================= */

const dynamicQueue = [];

let dynamicRunning = false;

const dynamicIcons = {
  home: `
    <svg viewBox="0 0 24 24">
      <path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3Z"/>
    </svg>
  `,

  notification: `
    <svg viewBox="0 0 24 24">
      <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm8-5v-5a8 8 0 0 0-6-7.74V3a2 2 0 1 0-4 0v1.26A8 8 0 0 0 4 12v5l-2 2v1h20v-1l-2-2Z"/>
    </svg>
  `,

  music: `
    <svg viewBox="0 0 24 24">
      <path d="M9 3v12.13A4 4 0 1 0 11 19V8h8V3H9Zm-2 16a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm4-13h6v1h-6V6Z"/>
    </svg>
  `,

  info: `
    <svg viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/>
    </svg>
  `,

  download: `
    <svg viewBox="0 0 24 24">
      <path d="M11 3h2v10l3.5-3.5 1.4 1.4-5.9 5.9-5.9-5.9 1.4-1.4L11 13V3ZM4 19h16v2H4v-2Z"/>
    </svg>
  `,

  upload: `
    <svg viewBox="0 0 24 24">
      <path d="M11 21h2V11l3.5 3.5 1.4-1.4-5.9-5.9-5.9 5.9 1.4 1.4L11 11v10ZM4 3h16v2H4V3Z"/>
    </svg>
  `,

  settings: `
    <svg viewBox="0 0 24 24">
      <path d="m19.43 12.98 2.11-1.65-2-3.46-2.5 1a7.7 7.7 0 0 0-1.73-1L15 5h-4l-.31 2.87a7.7 7.7 0 0 0-1.73 1l-2.5-1-2 3.46 2.11 1.65a7.2 7.2 0 0 0 0 2.04l-2.11 1.65 2 3.46 2.5-1a7.7 7.7 0 0 0 1.73 1L11 22h4l.31-2.87a7.7 7.7 0 0 0 1.73-1l2.5 1 2.11-1.65a7.2 7.2 0 0 0 0-2.04ZM13 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
    </svg>
  `,

  success: `
    <svg viewBox="0 0 24 24">
      <path d="m9 16.17-3.88-3.88-1.41 1.42L9 19 21 7l-1.41-1.41z"/>
    </svg>
  `,

  failed: `
    <svg viewBox="0 0 24 24">
      <path d="m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  `,

  warning: `
    <svg viewBox="0 0 24 24">
      <path d="M1 21h22L12 2 1 21Zm12-3h-2v2h2v-2Zm0-2h-2v-5h2v5Z"/>
    </svg>
  `,

  wait: `
    <svg viewBox="0 0 24 24">
      <path d="M6 2v2h2v4.59L5.17 12 8 15.41V20H6v2h12v-2h-2v-4.59L18.83 12 16 8.59V4h2V2H6Zm4 6V4h4v4l1.5 2H8.5L10 8Zm4 12h-4v-4l-1.5-2h7L14 16v4Z"/>
    </svg>
  `
};


/* =========================
   DYNAMIC ICON
========================= */

function getDynamicIcon(
  label,
  status
) {
  const key =
    String(label || "")
      .toLowerCase();

  const statusKey =
    String(status || "")
      .toLowerCase();

  if (dynamicIcons[key]) {
    return dynamicIcons[key];
  }

  if (
    ["success", "ok"]
      .includes(statusKey)
  ) {
    return dynamicIcons.success;
  }

  if (
    ["warning", "warn"]
      .includes(statusKey)
  ) {
    return dynamicIcons.warning;
  }

  if (
    [
      "failed",
      "fail",
      "error",
      "err"
    ].includes(statusKey)
  ) {
    return dynamicIcons.failed;
  }

  if (
    ["wait", "waiting"]
      .includes(key)
  ) {
    return dynamicIcons.wait;
  }

  return dynamicIcons.info;
}


/* =========================
   DYNAMIC WIDTH
========================= */

function getDynamicWidth(
  mess,
  label
) {
  const text =
    String(mess || "");

  const labelText =
    String(label || "");

  const estimated =
    90 +
    Math.max(
      text.length,
      labelText.length
    ) * 5.7;

  const maxWidth =
    Math.min(
      420,
      window.innerWidth - 30
    );

  return Math.min(
    Math.max(170, estimated),
    maxWidth
  );
}


/* =========================
   SHOW DYNAMIC ISLAND
========================= */

function showDynamicIsland(
  options = {}
) {
  if (!isBrowser) {
    return;
  }

  const label =
    options.Label || "info";

  dynamicQueue.push({
    Status:
      options.Status ||
      "default",

    Mess:
      options.Mess || "",

    Label:
      label,

    Duration:
      typeof options.Duration ===
      "number"
        ? options.Duration
        : 3000,

    CustomIcon:
      typeof options.CustomIcon ===
      "string"
        ? options.CustomIcon
        : null,

    CustomColor:
      typeof options.CustomColor ===
      "string"
        ? options.CustomColor
        : null,

    CustomAnimation:
      typeof options.CustomAnimation ===
      "string"
        ? options.CustomAnimation
        : null
  });

  processDynamicQueue();
}


/* =========================
   PROCESS QUEUE
========================= */

async function processDynamicQueue() {
  if (
    dynamicRunning ||
    !dynamicQueue.length
  ) {
    return;
  }

  dynamicRunning = true;

  const data =
    dynamicQueue.shift();

  const container =
    document.createElement("div");

  container.className =
    "lyraxis-dynamic-container";

  const island =
    document.createElement("div");

  const dynamicStatus =
    getDynamicStatus(
      data.Status,
      data.Label
    );

  island.className =
    "lyraxis-dynamic " +
    dynamicStatus +
    " " +
    String(data.Label)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "");

  /*
   * CUSTOM MODE
   */

  if (
    String(data.Label)
      .toLowerCase() === "custom"
  ) {
    island.classList.add(
      "custom"
    );

    if (data.CustomColor) {
      island.style.setProperty(
        "--dynamic-color",
        data.CustomColor
      );
    }

    if (data.CustomAnimation) {
      island.style.setProperty(
        "--dynamic-custom-animation",
        data.CustomAnimation
      );

      island.classList.add(
        "custom-animation"
      );
    }
  }

  const icon =
    document.createElement("div");

  icon.className =
    "lyraxis-dynamic-icon";

  icon.innerHTML =
    data.CustomIcon ||
    getDynamicIcon(
      data.Label,
      data.Status
    );

  const content =
    document.createElement("div");

  content.className =
    "lyraxis-dynamic-content";

  const message =
    document.createElement("div");

  message.className =
    "lyraxis-dynamic-message";

  message.textContent =
    data.Mess;

  const status =
    document.createElement("div");

  status.className =
    "lyraxis-dynamic-status";

  status.textContent =
    data.Label;

  content.append(
    message,
    status
  );

  island.append(
    icon,
    content
  );

  container.appendChild(
    island
  );

  document.body.appendChild(
    container
  );

  playNotificationSound();

  const width =
    getDynamicWidth(
      data.Mess,
      data.Label
    );

  island.style.setProperty(
    "--dynamic-width",
    `${width}px`
  );

  await nextFrame();

  island.classList.add(
    "enter-ball"
  );

  await wait(1000);

  island.classList.add(
    "open"
  );

  await wait(
    Math.max(
      0,
      data.Duration
    )
  );

  island.classList.remove(
    "open"
  );

  island.classList.add(
    "close"
  );

  await wait(1000);

  island.classList.remove(
    "close"
  );

  island.classList.add(
    "leave"
  );

  await wait(1000);

  container.remove();

  dynamicRunning = false;

  processDynamicQueue();
}


/* =========================
   DYNAMIC STATUS
========================= */

function getDynamicStatus(
  status,
  label
) {
  const labelValue =
    String(label || "")
      .toLowerCase();

  const value =
    String(status || "default")
      .toLowerCase();

  /*
   * Label custom = custom mode
   */

  if (labelValue === "custom") {
    return "custom";
  }

  if (
    value === "success" ||
    value === "ok"
  ) {
    return "success";
  }

  if (
    value === "warning" ||
    value === "warn"
  ) {
    return "warning";
  }

  if (
    [
      "failed",
      "fail",
      "error",
      "err"
    ].includes(value)
  ) {
    return "failed";
  }

  if (
    value === "active" ||
    value === "info"
  ) {
    return "active";
  }

  if (
    value === "wait" ||
    value === "waiting"
  ) {
    return "waiting";
  }

  return "default";
}


/* =========================
   UTILITY
========================= */

function wait(ms) {
  return new Promise(
    resolve => {
      setTimeout(
        resolve,
        ms
      );
    }
  );
}

function nextFrame() {
  return new Promise(
    resolve => {
      requestAnimationFrame(
        () => resolve()
      );
    }
  );
}


/* =========================
   API
========================= */

const Lyn = {
  log: showLog,
  info: showMessageSistemInfo,
  confirm: showMessageSistemConfirm,
  prompt: showMessageSistemPrompt,
  toast: showMessageSistemToast,
  dynamicIsland: showDynamicIsland,
  setLang: setBahasa,
  soundNotification: setSoundNotification
};

// React / ESM
export default Lyn;

// Vanilla HTML
if (isBrowser) {
  window.Lyn = Lyn;
}