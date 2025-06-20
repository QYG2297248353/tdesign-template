# TDesign 框架模板

前后台模板项目(桌面端)

## 使用说明

1. 安装依赖

```bash
npm install
```

2. 启动项目 (Web模式)

```bash
npm dev
```

3. 启动项目 (Tauri模式)

```bash
npm run tauri dev
```

4. 打包项目 (Web模式)

```bash
npm run build
```

5. 打包项目 (Tauri模式)

```bash
npm run tauri build
```

## 项目结构

```bash
├── src
│   ├── api # 接口
│   ├── assets # 静态资源
│   ├── components # 全局组件
│   ├── layouts # 布局组件
│   ├── router # 路由
│   ├── store # 状态管理
│   ├── utils # 工具函数
│   ├── views # 视图
│   ├── App.vue # 应用入口
│   ├── main.ts # 主入口
├── src-tauri # Tauri 项目
│   ├── capabilities # Tauri 项目权限
│   ├── icons # Tauri 项目图标
│   ├── src # Tauri 项目源码
│   ├── tauri.conf.json # Tauri 项目配置
```
