(function(global) {
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
  
  const style = document.createElement("style");
  style.innerHTML = `
    .message-log-alert {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #000000;
      background-color: rgba(255,255,255,0.80);
      font-size: 15px;
      border-radius: 20px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      transition: max-width 0.8s ease-in-out, min-width 0.8s ease-in-out, padding 0.8s ease-in-out;
      z-index: 10000000;
    }
    
    .message-log-alert.show {
      max-width: 300px;
      min-width: 200px;
      padding: 15px 15px;
    }

    .message-log-alert.hide {
      max-width: 0;
      min-width: 0;
      padding: 15px 0;
    }
    
    .message-error {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #000000;
      background-color: rgba(255,7,7,0.827);
      font-size: 15px;
      border-radius: 10px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      transition: max-width 0.8s ease-in-out, min-width 0.8s ease-in-out, padding 0.8s ease-in-out;
      z-index: 10000000;
    }
    
    .message-error.show {
      max-width: 300px;
      min-width: 200px;
      padding: 15px 15px;
    }

    .message-error.hide {
      max-width: 0;
      min-width: 0;
      padding: 15px 0;
    }
    
    .message-sistem-boxinfo {
      position: fixed;
      width: 60%;
      height: 40%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 15px;
      padding: 25px;
      display: flex;
      flex-direction: column;
      z-index: 10000000;
    }
    
    .message-sistem-boxinfo > h1 {
      font-size: 18px;
      margin: 0;
      color: #000;
      text-align: center;
    }
    
    .message-sistem-boxinfo > p {
      font-size: 14px;
      margin: 10px 0;
      color: #232323;
      text-align: left;
      max-height: calc(100% - 50px);
      overflow-x: hidden;
      overflow-y: scroll;
    }
    
    .message-sistem-boxinfo > input {
      width: 100;
      padding: 8px;
      outline: none;
      border: 1.5px solid #317A9C;
      border-radius: 5px;
    }
    
    .message-sistem-boxinfo > .container-button {
      text-align: right;
      position: absolute;
      bottom: 5px;
      right: 15px;
    }
    
    .message-sistem-boxinfo > .container-button > button {
      font-size: 16px;
      margin: 10px;
      border: none;
      cursor: pointer;
      background: transparent;
      color: #317A9C;
      border-radius: 5px;
      padding: 5px 10px;
    }
  `;
  document.head.appendChild(style);
  
  const messageLogAlerts = [];
  function createMessageLogAlert() {
    const messageLogAlert = document.createElement("div");
    messageLogAlert.className = "message-log-alert";
    document.body.appendChild(messageLogAlert);
    return messageLogAlert;
  }
  
  function showAlert(message, color) {
    const messageLogAlert = createMessageLogAlert();
    if (color === "er") {
      messageLogAlert.style.color = "white";
      messageLogAlert.style.backgroundColor = "rgba(255,7,7,0.700)";
    }
    messageLogAlerts.push(messageLogAlert);
    messageLogAlert.textContent = message;
    messageLogAlert.offsetWidth;
    messageLogAlert.classList.add("show");
    
    setTimeout(() => {
      messageLogAlert.classList.remove("show");
      messageLogAlert.classList.add("hide");
      
      messageLogAlert.addEventListener("transitionend", function handleHide() {
        if (messageLogAlert.classList.contains("hide")) {
          document.body.removeChild(messageLogAlert);
          messageLogAlerts.splice(messageLogAlerts.indexOf(messageLogAlert), 1);
          messageLogAlert.removeEventListener("transitionend", handleHide);
        }
      });
    }, 5000);
  }

  const messageSistemInfo = [];
  function showMessageSistemInfo(message) {
    const el = document.createElement("div");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    const btnContainer = document.createElement("div");
    const btn = document.createElement("button");

    el.className = "message-sistem-boxinfo";
    h1.textContent = lang.title_info + window.location.hostname;
    p.textContent = message;
    btnContainer.className = "container-button";
    btn.textContent = lang.ok;

    btn.onclick = () => {
      document.body.removeChild(el);
      const i = messageSistemInfo.indexOf(el);
      if (i > -1) messageSistemInfo.splice(i, 1);
    };
    
    btnContainer.append(btn);
    el.append(h1, p, btnContainer);
    document.body.appendChild(el);
    messageSistemInfo.push(el);
  }

  const messageSistemConfirm = [];
  function showMessageSistemConfirm(url, message) {
    const el = document.createElement("div");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    const btnContainer = document.createElement("div");
    const btnNo = document.createElement("button");
    const btnYes = document.createElement("button");
    
    if (message === "default") {
      message = lang.default_confirm;
    }
    
    el.className = "message-sistem-boxinfo";
    h1.textContent = lang.title_confirm;
    p.textContent = message;
    btnContainer.className = "container-button";
    btnNo.textContent = lang.cancel;
    btnYes.textContent = lang.continue;
    
    btnNo.onclick = () => {
      document.body.removeChild(el);
      const i = messageSistemConfirm.indexOf(el);
      if (i > -1) messageSistemConfirm.splice(i, 1);
    };
    
    btnYes.onclick = () => {
      sistem.message.log(lang.bye);
      window.location.href = url;
      document.body.removeChild(el);
      const i = messageSistemConfirm.indexOf(el);
      if (i > -1) messageSistemConfirm.splice(i, 1);
    };
    
    btnContainer.append(btnNo, btnYes);
    el.append(h1, p, btnContainer);
    document.body.appendChild(el);
    messageSistemConfirm.push(el);
  }
  
  global.sistem = global.sistem || {};
  global.sistem.message = {
    log: showAlert,
    info: showMessageSistemInfo,
    confirm: showMessageSistemConfirm
  };
  
const messageSistemPrompt = [];
function showMessageSistemPrompt(message, typeForm) {
  return new Promise((resolve, reject) => {
    const el = document.createElement("div");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    const form = document.createElement("input");
    const btnContainer = document.createElement("div");
    const btnNo = document.createElement("button");
    const btnYes = document.createElement("button");

    el.className = "message-sistem-boxinfo";
    h1.textContent = lang.prompt_title;
    p.textContent = message;
    if (typeForm === "" && null) {
      typeForm = "text";
    } else if (typeForm === "num") {
      typeForm = "number";
    } else if (typeForm === "email") {
      typeForm = "email";
    } else if (typeForm === "url") {
      typeForm = "url";
    } else if (typeForm === "date") {
      typeForm = "date";
    } else if (typeForm === "time") {
      typeForm = "time";
    } else if (typeForm === "tel") {
      typeForm = "tel";
    } else if (typeForm === "range") {
      typeForm = "range";
    } else {
      typeForm = "hidden";
      sistem.message.log("hello", "er");
      
    }
    form.type = typeForm;
    btnContainer.className = "container-button";
    btnNo.textContent = lang.cancel;
    btnYes.textContent = lang.send;

    btnNo.onclick = () => {
      document.body.removeChild(el);
      const i = messageSistemPrompt.indexOf(el);
      if (i > -1) messageSistemPrompt.splice(i, 1);
      reject("Dibatalkan");
    };

    btnYes.onclick = () => {
      const value = form.value;
      document.body.removeChild(el);
      const i = messageSistemPrompt.indexOf(el);
      if (i > -1) messageSistemPrompt.splice(i, 1);
      resolve(value);
    };

    btnContainer.append(btnNo, btnYes);
    el.append(h1, p, form, btnContainer);
    document.body.appendChild(el);
    messageSistemPrompt.push(el);
  });
}
  

global.sistem = global.sistem || {};
global.sistem.message = {
  log: showAlert,
  info: showMessageSistemInfo,
  confirm: showMessageSistemConfirm,
  prompt: showMessageSistemPrompt
};
global.sistem.setLang = setBahasa;

})(window);