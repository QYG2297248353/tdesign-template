# Tauri 应用 开发说明

## 窗口匹配 `windows`

仅匹配窗口标签为 `tdesign-template` 的主窗口。
仅匹配窗口标签前缀为 `tdesign-template-` 的子窗口。

## 外部访问 `remote`

仅允许 `https://*.lifebus.top` 和 `https://*.lifebus.fun` 域名的外部访问。

## 权限说明 `permissions`

### 默认权限

`src-tauri\capabilities\default.json`

包含项目最基本的启动权限。

- `core:app:default` 默认权限
- `core:event:default` 默认权限
- `core:image:default` 默认权限
- `core:menu:default` 默认权限
- `core:path:default` 默认权限
- `core:resources:default` 默认权限
- `core:tray:default` 默认权限
- `core:webview:default` 默认权限
- `core:window:default` 默认权限

### Desktop 应用权限

`src-tauri\capabilities\desktop.json`

包含桌面应用的权限申请。

#### 核心权限

- `core:window:allow-start-dragging`：允许窗口拖动权限，用于允许用户拖动窗口。
- `core:window:allow-center`：允许窗口居中权限，用于允许窗口居中显示。
- `core:window:allow-create`：允许创建窗口权限，用于允许创建新窗口。
- `core:window:allow-close`：允许关闭窗口权限，用于允许关闭窗口。
- `core:window:allow-hide`：允许隐藏窗口权限，用于允许隐藏窗口。
- `core:window:allow-show`：允许显示窗口权限，用于允许显示窗口。
- `core:window:allow-destroy`：允许销毁窗口权限，用于允许销毁窗口。
- `core:window:allow-minimize`：允许最小化窗口权限，用于允许最小化窗口。
- `core:window:allow-title`：允许设置窗口标题权限，用于允许设置窗口的标题。
- `core:webview:allow-create-webview`: 允许创建 WebView 权限，用于允许创建 WebView 实例。
- `core:webview:allow-create-webview-window`: 允许创建 WebView 窗口权限，用于允许创建 WebView 窗口。
- `core:webview:allow-webview-show`: 允许显示 WebView 权限，用于允许显示 WebView 实例。
- `core:webview:allow-webview-hide`: 允许隐藏 WebView 权限，用于允许隐藏 WebView 实例。
- `core:webview:allow-clear-all-browsing-data`: 允许清除所有浏览器数据权限，用于允许清除 WebView 实例的所有浏览器数据。

#### 插件权限

- `window-state:default`：窗口状态权限，用于管理窗口的状态，如最小化、最大化、关闭等。
- `autostart:default`：自动启动权限，用于管理应用的自动启动。
- `fs:default`：文件系统权限，用于管理文件系统的读写权限。
- `deep-link:default`：深链接权限，用于处理应用的深链接。
- `clipboard-manager:allow-clear`：剪贴板权限，用于清空剪贴板内容。
- `clipboard-manager:allow-read-image`：剪贴板权限，用于读取剪贴板中的图片。
- `clipboard-manager:allow-read-text`：剪贴板权限，用于读取剪贴板中的文本。
- `clipboard-manager:allow-write-html`：剪贴板权限，用于写入剪贴板中的 HTML 内容。
- `clipboard-manager:allow-write-image`：剪贴板权限，用于写入剪贴板中的图片。
- `clipboard-manager:allow-write-text`：剪贴板权限，用于写入剪贴板中的文本。
- `dialog:default`：对话框权限，用于管理对话框的显示和操作。
- `dialog:allow-message`：对话框权限，用于允许显示消息对话框。
- `notification:default`：通知权限，用于管理通知的显示和操作。
- `notification:allow-request-permission`：通知权限，用于允许请求通知权限。
- `store:default`: 存储权限，用于管理存储的读写权限。
- `store:allow-get-store`: 存储权限，用于允许获取存储中的数据。
- `store:allow-get`：存储权限，用于允许获取存储中的数据。
- `store:allow-set`：存储权限，用于允许设置存储中的数据。
- `store:allow-save`：存储权限，用于允许保存存储中的数据。
- `store:allow-load`：存储权限，用于允许加载存储中的数据。
- `shell:allow-open`：Shell 权限，用于允许打开外部应用。

## 插件说明

### 单例 `single-instance`

插件初始配置中 `src/lib.rs` 中 `tauri_plugin_single_instance::init` 函数中。

```rs
tauri::Builder::default()
.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(window) = app.get_webview_window("tdesign-template") {
                // 如果窗口最小化了，先恢复
                let _ = window.unminimize();
                // 显示window窗口
                let _ = window.show();
                // 然后将窗口激活、置顶
                let _ = window.set_focus();
            }
        }))
```

`"tdesign-template"` 为窗口标签,如果需要修改，请同时修改：

- `src-tauri\tauri.conf.json[app][windows][label]`
- `src\tauri\constant.ts[MAIN_WINDOW_ID]`

同时要注意权限`src-tauri\capabilities\*.json`适配问题。

## 迁移支持

如需其他项目接入，请迁移目录 `src/tauri` 到其他项目中。并在 `src/main.ts` 中引入插件。

```ts
import { setupTauri } from './tauri';

setupTauri();
```

### 插件安装

```sh
npm run tauri add autostart
npm run tauri add clipboard-manager
npm run tauri add deep-link
npm run tauri add dialog
npm run tauri add fs
npm run tauri add notification
npm run tauri add upload
npm run tauri add window-state
npm run tauri add store
```

### 依赖安装

```sh
npm run tauri add single-instance
```
