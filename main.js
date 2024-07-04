// main.js

// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, Tray, Menu, nativeImage} = require('electron')
const path = require('node:path')
const Store = require("electron-store")
const {exec} = require("child_process")
const store = new Store()
let isAutoLaunchEnabled = false

if(store.has('isAutoLaunchEnabled')) {
    isAutoLaunchEnabled = store.get('isAutoLaunchEnabled')
}
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
function openUrlInDefaultBrowser(url) {
    switch (process.platform) {
        case "darwin":
            exec(`open ${url}`);
            break;
        case "win32":
            exec(`start ${url}`);
            break;
        case "linux":
            exec(`xdg-open ${url}`);
            break;
    }
}

// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    // 创建窗口
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 400,
        autoHideMenuBar: true,
        transparent: true,
        frame: false,
        resizable: false,
        icon: path.join(__dirname, "asset/Icon.ico"),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    mainWindow.loadFile('index.html')
    const icon = nativeImage.createFromPath(path.join(__dirname, "asset/Icon.ico"));
    const tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
        {label: '显示窗口', click: () => mainWindow.show()},
        {
            label: '开机自启',
            type: "checkbox",
            checked: isAutoLaunchEnabled,
            click: () =>{
                // 切换勾选状态
                isAutoLaunchEnabled = !isAutoLaunchEnabled;

                // 更新开机自启动设置  
                app.setLoginItemSettings({
                    openAtLogin: isAutoLaunchEnabled,
                    path: process.execPath
                });
                store.set("isAutoLaunchEnabled", isAutoLaunchEnabled)
            }
        },
        {label: '退出程序', click: () => app.quit()}
    ])

    tray.on("click", () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide()
        } else {
            mainWindow.show()
        }
    })
    tray.setContextMenu(contextMenu)
    tray.setToolTip('小猫计时器')
    tray.setTitle('Easy Cat Timer')
    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.on("closeAPP", () => {
        if (process.platform !== 'darwin') app.quit()
        // mainWindow.setAlwaysOnTop(false)
        // mainWindow.hide()
    })
    ipcMain.on("minimumWindow", () => {
        mainWindow.setAlwaysOnTop(false)
        mainWindow.hide()
    })
    ipcMain.on("complete-tip", () => {
        mainWindow.show()
        mainWindow.setAlwaysOnTop(true)
    })
    //监听用默认浏览器打开URL的请求
    ipcMain.on("openUrlInDefaultBrowser", (event,url) => {
        openUrlInDefaultBrowser(url)
    })

})