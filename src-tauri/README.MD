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

#### 插件

- `window-state:default`：窗口状态权限，用于管理窗口的状态，如最小化、最大化、关闭等。
- `autostart:default`：自动启动权限，用于管理应用的自动启动。
