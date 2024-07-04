const {contextBridge, ipcRenderer} = require("electron")
const url = require("url");

contextBridge.exposeInMainWorld("electronAPI", {
    closeAPP: () => ipcRenderer.send("closeAPP"),
    CompleteTip: () => ipcRenderer.send("complete-tip"),
    openUrlInDefaultBrowser: (url) => {
        ipcRenderer.send("openUrlInDefaultBrowser", url)
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const minimumButton = document.getElementById("minimumButton")
    minimumButton.onclick = () => {
        ipcRenderer.send("minimumWindow")
    }

})
