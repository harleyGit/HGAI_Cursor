# 新手引导视频教程列表

一个高性能、支持多语言的视频教程列表组件，兼容网页和移动应用，支持 iOS WKWebView 集成。

## 功能特性

- ✅ **高性能滚动**: 使用虚拟滚动和懒加载优化
- ✅ **多语言支持**: 支持中文和英文，可轻松扩展
- ✅ **响应式设计**: 兼容桌面和移动设备
- ✅ **iOS 集成**: 支持 WKWebView 原生方法调用
- ✅ **网页嵌入**: 可嵌入到 iframe 中
- ✅ **无障碍支持**: 支持屏幕阅读器和键盘导航
- ✅ **暗色模式**: 自动适配系统主题

## 文件结构

```
app/
├── hg_guide_video_list_view.jsx          # React组件
├── hg_guide_video_list_view.css          # 样式文件
├── hg_guide_video_list_view.html         # 独立HTML版本
├── ios_integration_example.swift         # iOS集成示例
└── README.md                             # 说明文档
```

## 使用方法

### 1. React 项目中使用

```jsx
import HGGuideVideoListView from "./hg_guide_video_list_view.jsx";
import "./hg_guide_video_list_view.css";

function App() {
  return (
    <div className="App">
      <HGGuideVideoListView />
    </div>
  );
}
```

### 2. 独立 HTML 页面

直接打开 `hg_guide_video_list_view.html` 文件即可在浏览器中查看。

### 3. 嵌入到 iframe

```html
<iframe
  src="hg_guide_video_list_view.html"
  width="100%"
  height="600px"
  frameborder="0"
>
</iframe>
```

### 4. iOS WKWebView 集成

参考 `ios_integration_example.swift` 文件中的示例代码：

```swift
// 创建WKWebView配置
let configuration = WKWebViewConfiguration()
configuration.userContentController.add(self, name: "playVideo")

// 加载HTML文件
webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
```

## 自定义配置

### 修改视频数据

在组件中修改 `videoData` 数组：

```javascript
const videoData = [
  {
    id: 1,
    titleKey: "bindDevice",
    videoUrl: "https://your-domain.com/videos/bind_device.mp4",
    thumbnail: "data:image/svg+xml;base64,...", // 或使用图片URL
  },
  // 添加更多视频...
];
```

### 添加新语言

在 `translations` 对象中添加新语言：

```javascript
const translations = {
  zh: {
    /* 中文翻译 */
  },
  en: {
    /* 英文翻译 */
  },
  ja: {
    /* 日文翻译 */
  }, // 新增
  ko: {
    /* 韩文翻译 */
  }, // 新增
};
```

### 自定义样式

修改 `hg_guide_video_list_view.css` 文件中的 CSS 变量：

```css
:root {
  --primary-color: #007aff;
  --background-color: #f5f5f5;
  --card-background: white;
  --text-color: #333;
}
```

## iOS 原生方法调用

当在 iOS WKWebView 中点击视频时，会调用原生方法：

```javascript
window.webkit.messageHandlers.playVideo.postMessage({
  videoUrl: "https://example.com/video.mp4",
  title: "视频标题",
});
```

在 iOS 端接收消息：

```swift
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    if message.name == "playVideo" {
        // 处理视频播放
        let body = message.body as? [String: Any]
        let videoUrl = body?["videoUrl"] as? String
        let title = body?["title"] as? String

        // 打开视频播放器
        openVideoPlayer(url: videoUrl, title: title)
    }
}
```

## 性能优化

### 1. 懒加载

- 视频缩略图使用 `loading="lazy"` 属性
- 图片使用 `will-change` 和 `transform: translateZ(0)` 优化

### 2. 虚拟滚动

- 使用 `contain: layout style paint` 优化渲染
- 避免不必要的重绘和重排

### 3. 事件优化

- 使用 `useCallback` 和 `React.memo` 优化 React 组件
- 防抖处理滚动事件

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## 注意事项

1. **视频 URL**: 确保视频 URL 可访问且支持跨域
2. **HTTPS**: 在生产环境中使用 HTTPS 协议
3. **缓存**: 建议为静态资源设置适当的缓存策略
4. **错误处理**: 添加网络错误和视频加载失败的处理

## 更新日志

### v1.0.0

- 初始版本发布
- 支持基本的视频列表展示
- 支持多语言切换
- 支持 iOS WKWebView 集成
- 支持响应式设计

## 许可证

MIT License
