
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  const cssUrl = "https://api.rifaldo.my.id/lib/notification/style.css";
  if (!document.querySelector(`link[href="${cssUrl}"]`)) {
    const linkEl = document.createElement("link");
    linkEl.rel = "stylesheet";
    linkEl.type = "text/css";
    linkEl.href = cssUrl;
    document.head.appendChild(linkEl);
  }
}

const listBahasa = {
  id: {
    title_info: "Pesan dari ",
    title_confirm: "Konfirmasi",
    default_confirm: "Apakah anda yakin ingin melanjutkan?",
    cancel: "Batal",
    continue: "Lanjutkan",
    ok: "OK",
    prompt_title: "Isi Formulir Berikut",
    send: "Kirim",
    bye: "Selamat tinggal",
    error: "Terdapat error"
  },
  en: {
    title_info: "Message from ",
    title_confirm: "Confirmation",
    default_confirm: "Are you sure you want to continue?",
    cancel: "Cancel",
    continue: "Continue",
    ok: "OK",
    prompt_title: "Fill Out This Form",
    send: "Send",
    bye: "Good bye",
    error: "There is an error"
  }
};

let lang = listBahasa.en;

function setBahasa(langs) {
  if (listBahasa[langs]) lang = listBahasa[langs];
}

function showLog({ Mess, Status } = {}) {
  if (!isBrowser) return;
  const el = document.createElement("div");
  
  if (Status === "err") {
    el.className = "message-error";
  } else {
    el.className = "message-log";
  }
  
  el.textContent = Mess;
  document.body.appendChild(el);
  
  el.offsetWidth;
  el.classList.add("show");

  setTimeout(() => {
    el.classList.remove("show");
    el.classList.add("hide");
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 500);
  }, 4000);
}

function createHeader(titleText, command) {
  const header = document.createElement("div");
  header.className = "message-sistem-header";
  
  const h1 = document.createElement("h1");
  h1.className = "message-sistem-title";
  h1.textContent = titleText;
  
  const btn = document.createElement("button");
  btn.className = "message-sistem-custom-button";
  btn.type = "button";
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" class="icon-message-sistem-custom-button">
      <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/>
      <path d="M12,10H11a1,1,0,0,0,0,2h1v6a1,1,0,0,0,2,0V12A2,2,0,0,0,12,10Z"/>
      <circle cx="12" cy="6.5" r="1.5"/>
    </svg>`;
  btn.onclick = command;
  
  header.append(h1, btn);
  return header;
}

function createBaseModal(headerTitle, messageText, closeCallback) {
  const overlay = document.createElement("div");
  overlay.className = "message-sistem-overlay";
  
  const box = document.createElement("div");
  box.className = "message-sistem-boxinfo";
  
  const hr = document.createElement("div");
  hr.className = "message-sistem-line";
  
  const content = document.createElement("div");
  content.className = "message-sistem-content";
  
  const p = document.createElement("p");
  p.className = "message-sistem-message";
  
  if (messageText && messageText.includes("\n")) {
    messageText = messageText.replaceAll(/\n/g, "<br/>");
  }
  
  p.innerHTML = messageText || "";
  
  const btnContainer = document.createElement("div");
  btnContainer.className = "container-button";
  
  const close = () => {
    if (overlay.parentNode) document.body.removeChild(overlay);
    if (!document.querySelector('.message-sistem-overlay')) {
      document.body.classList.remove('no-scroll');
    }
    if (closeCallback) closeCallback();
  };
  
  const aboutLyraxis = async () => {
    showLog({ Mess: "Made by Lyraxis" });
  };
  
  const header = createHeader(headerTitle, aboutLyraxis);
  document.body.classList.add('no-scroll');
  
  return { overlay, box, hr, content, p, btnContainer, close, header };
}

function showMessageSistemInfo({ Title = lang.title_info + (typeof window !== 'undefined' ? window.location.hostname : ''), Mess } = {}) {
  if (!isBrowser) return;
  const modal = createBaseModal(Title, Mess);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = lang.ok;
  btn.onclick = modal.close;
  
  modal.btnContainer.appendChild(btn);
  modal.content.append(modal.p, modal.btnContainer);
  modal.box.append(modal.header, modal.content);
  modal.box.append(modal.hr, modal.content);
  modal.overlay.appendChild(modal.box);
  document.body.appendChild(modal.overlay);
}

function showMessageSistemConfirm({ Mess, Event } = {}) {
  if (!isBrowser) return;
  const text = Mess === "default" ? lang.default_confirm : Mess;
  const modal = createBaseModal(lang.title_confirm, text);
  
  const btnNo = document.createElement("button");
  btnNo.type = "button";
  btnNo.textContent = lang.cancel;
  btnNo.onclick = modal.close;
  
  const btnYes = document.createElement("button");
  btnYes.type = "button";
  btnYes.textContent = lang.continue;
  btnYes.onclick = () => {
    modal.close();
    if (Event) {
      if (typeof Event === "function") {
        Event();
      } else if (typeof Event === "string") {
        showLog({ Mess: lang.bye });
        window.location.href = Event;
      }
    }
  };
  
  modal.btnContainer.append(btnNo, btnYes);
  modal.content.append(modal.p, modal.btnContainer);
  modal.box.append(modal.header, modal.content);
  modal.box.append(modal.hr, modal.content);
  modal.overlay.appendChild(modal.box);
  document.body.appendChild(modal.overlay);
}

function showMessageSistemPrompt({ Mess, Type = "text" } = {}) {
  return new Promise((resolve, reject) => {
    if (!isBrowser) return reject("Bukan di lingkungan browser");
    
    const modal = createBaseModal(lang.prompt_title, Mess, () => reject("Dibatalkan"));
    const input = document.createElement("input");
    input.className = "message-sistem-input";
    
    const validTypes = ["text", "number", "email", "url", "date", "time", "tel", "range", "password"];
    const finalType = Type === "num" ? "number" : Type;
    input.type = validTypes.includes(finalType) ? finalType : "text";
    
    const btnNo = document.createElement("button");
    btnNo.type = "button";
    btnNo.textContent = lang.cancel;
    btnNo.onclick = modal.close;
    
    const btnYes = document.createElement("button");
    btnYes.type = "button";
    btnYes.textContent = lang.send;
    btnYes.onclick = () => {
      const val = input.value;
      modal.close = () => {
        if (modal.overlay.parentNode) document.body.removeChild(modal.overlay);
        if (!document.querySelector('.message-sistem-overlay')) {
          document.body.classList.remove('no-scroll');
        }
      };
      modal.close();
      resolve(val);
    };
    
    modal.btnContainer.append(btnNo, btnYes);
    modal.content.append(modal.p, input, modal.btnContainer);
    modal.box.append(modal.header, modal.content);
    modal.box.append(modal.hr, modal.content);
    modal.overlay.appendChild(modal.box);
    document.body.appendChild(modal.overlay);
    
    setTimeout(() => input.focus(), 50);
  });
}

function updateToastStack(container) {
  const toasts = Array.from(container.children);
  
  toasts.forEach((toast, index) => {
    toast.setAttribute("data-index", index);

    if (index === 0) {
      if (toast.dataset.permanent !== "true" && !toast.dataset.timerActive) {
        toast.dataset.timerActive = "true";
        
        toast.timerId = setTimeout(() => {
          if (typeof toast.removeToast === "function") {
            toast.removeToast();
          }
        }, 5000);
      }
    } else {
      if (toast.timerId) {
        clearTimeout(toast.timerId);
        toast.timerId = null;
      }
      delete toast.dataset.timerActive;
    }
  });
}

function showMessageSistemToast({ Title, Mess, Status = "default", Permanent = false } = {}) {
  if (!isBrowser) return;

  let container = document.querySelector(".lyraxis-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "lyraxis-toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "lyraxis-toast";
  toast.dataset.permanent = Permanent ? "true" : "false";

  let iconSvg = "";
  let statusClass = "lyraxis-toast-default";

  if (Status === "success" || Status === "ok") {
    statusClass = "lyraxis-toast-success";
    iconSvg = `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
  } else if (Status === "err" || Status === "error" || Status === "failed") {
    statusClass = "lyraxis-toast-error";
    iconSvg = `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
  } else {
    iconSvg = `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
  }

  toast.classList.add(statusClass);

  const iconBox = document.createElement("div");
  iconBox.className = "lyraxis-toast-icon";
  iconBox.innerHTML = iconSvg;

  const bodyBox = document.createElement("div");
  bodyBox.className = "lyraxis-toast-body";

  const titleEl = document.createElement("div");
  titleEl.className = "lyraxis-toast-title";
  titleEl.textContent = Title || (Status === "success" ? "Berhasil" : Status === "error" ? "Gagal" : "Informasi");

  const msgEl = document.createElement("p");
  msgEl.className = "lyraxis-toast-message";
  let formattedMess = Mess || "";
  if (formattedMess.includes("\n")) {
    formattedMess = formattedMess.replaceAll(/\n/g, "<br/>");
  }
  msgEl.innerHTML = formattedMess;

  bodyBox.append(titleEl, msgEl);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "lyraxis-toast-close";
  closeBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;

  const removeToast = () => {
    if (toast.timerId) clearTimeout(toast.timerId);
    toast.classList.add("hide");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
      updateToastStack(container);
      if (container.children.length === 0 && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 300);
  };

  toast.removeToast = removeToast;
  closeBtn.onclick = removeToast;

  toast.append(iconBox, bodyBox, closeBtn);
  
  container.appendChild(toast);

  updateToastStack(container);
}

const lyn = {
  log: showLog,
  info: showMessageSistemInfo,
  confirm: showMessageSistemConfirm,
  prompt: showMessageSistemPrompt,
  toast: showMessageSistemToast,
  setLang: setBahasa
};

if (typeof window !== 'undefined') {
  window.lyn = lyn;
}

if (typeof exports === 'object' && typeof module !== 'undefined') {
  module.exports = lyn;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return lyn; });
}
