import React, { Component } from "react";
import "./HGGuideVideoListView.css";

// 多语言支持
const translations = {
  zh: {
    title: "新手引导",
    commonQuestions: "常见问题",
    videoTutorials: "视频教程",
    bindDevice: "绑定设备",
    unbindDevice: "解绑设备",
    shareDevice: "分享设备",
    connectNetworkCable: "连接网线",
    newbieTutorial: "新手教学",
    enterGuide: "进入引导",
  },
  en: {
    title: "Newbie Guide",
    commonQuestions: "FAQ",
    videoTutorials: "Video Tutorials",
    bindDevice: "Bind Device",
    unbindDevice: "Unbind Device",
    shareDevice: "Share Device",
    connectNetworkCable: "Connect Network Cable",
    newbieTutorial: "Newbie Tutorial",
    enterGuide: "Enter Guide",
  },
};

// 视频数据
const videoData = [
  {
    id: 1,
    titleKey: "bindDevice",
    videoUrl: "https://example.com/videos/bind_device.mp4",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjBGOUZGIi8+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iNDAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSIyMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPHN2ZyB4PSIxNDAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIiBmaWxsPSJyZ2JhKDAsMCwwLDAuOCkiLz4KPHBhdGggZD0iTTEwIDhMMTYgMTJMMTAgMTZWNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K",
  },
  {
    id: 2,
    titleKey: "unbindDevice",
    videoUrl: "https://example.com/videos/unbind_device.mp4",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjBGOUZGIi8+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iNDAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSIyMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPHN2ZyB4PSIxNDAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIiBmaWxsPSJyZ2JhKDAsMCwwLDAuOCkiLz4KPHBhdGggZD0iTTEwIDhMMTYgMTJMMTAgMTZWNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K",
  },
  {
    id: 3,
    titleKey: "shareDevice",
    videoUrl: "https://example.com/videos/share_device.mp4",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjBGOUZGIi8+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iNDAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSIyMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPHN2ZyB4PSIxNDAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIiBmaWxsPSJyZ2JhKDAsMCwwLDAuOCkiLz4KPHBhdGggZD0iTTEwIDhMMTYgMTJMMTAgMTZWNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K",
  },
  {
    id: 4,
    titleKey: "connectNetworkCable",
    videoUrl: "https://example.com/videos/connect_network_cable.mp4",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjBGOUZGIi8+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iNDAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSIyMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPHN2ZyB4PSIxNDAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIiBmaWxsPSJyZ2JhKDAsMCwwLDAuOCkiLz4KPHBhdGggZD0iTTEwIDhMMTYgMTJMMTAgMTZWNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K",
  },
];

// 检测是否在iOS WKWebView中
const isIOSWKWebView = () => {
  return window.webkit && window.webkit.messageHandlers;
};

// 检测语言
const detectLanguage = () => {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith("zh") ? "zh" : "en";
};

class HGGuideVideoListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: detectLanguage(),
      currentVideoUrl: null,
      showVideoList: false, // 控制是否显示视频列表
    };
  }

  // 切换语言
  switchLanguage = (lang) => {
    this.setState({ language: lang });
  };

  // 进入视频列表页面
  enterVideoList = () => {
    this.setState({ showVideoList: true });
  };

  // 返回主页面
  goBack = () => {
    this.setState({ showVideoList: false });
  };

  // 处理视频点击
  handleVideoClick = (video) => {
    if (isIOSWKWebView()) {
      // 在iOS WKWebView中调用原生方法
      if (window.webkit.messageHandlers.playVideo) {
        window.webkit.messageHandlers.playVideo.postMessage({
          videoUrl: video.videoUrl,
          title: translations[this.state.language][video.titleKey],
        });
      }
    } else {
      // 在网页中直接播放
      this.setState({ currentVideoUrl: video.videoUrl });
    }
  };

  // 关闭视频播放器
  closeVideoPlayer = () => {
    this.setState({ currentVideoUrl: null });
  };

  // 处理常见问题点击
  handleFAQ = () => {
    console.log("FAQ clicked");
  };

  // 处理返回按钮
  handleBack = () => {
    if (this.state.showVideoList) {
      this.goBack();
    } else {
      window.history.back();
    }
  };

  render() {
    const { language, currentVideoUrl, showVideoList } = this.state;
    const t = translations[language];

    // 如果显示视频列表，渲染视频列表页面
    if (showVideoList) {
      return this.renderVideoListPage(t);
    }

    // 否则渲染主页面（包含进入按钮）
    return this.renderMainPage(t);
  }

  // 渲染主页面
  renderMainPage = (t) => {
    return (
      <div className="guide-container">
        {/* 状态栏 */}
        <div className="status-bar">
          <div className="time">2:32</div>
          <div className="status-icons">
            <div className="signal-icon">📶</div>
            <div className="wifi-icon">📶</div>
            <div className="battery-icon">🔋</div>
          </div>
        </div>

        {/* 导航栏 */}
        <div className="navigation-bar">
          <button className="back-button" onClick={this.handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="title">{t.title}</h1>
          <button className="faq-button" onClick={this.handleFAQ}>
            {t.commonQuestions}
          </button>
        </div>

        {/* 主内容区域 */}
        <div className="main-content">
          <div className="content-card">
            <h2 className="section-title">{t.videoTutorials}</h2>
            <div className="welcome-message">
              <p>欢迎使用新手引导系统！</p>
              <p>点击下方按钮开始学习视频教程。</p>
            </div>
            <button
              className="enter-guide-button"
              onClick={this.enterVideoList}
            >
              {t.enterGuide}
            </button>
          </div>
        </div>

        {/* 语言切换按钮 */}
        <div className="language-switcher">
          <button
            className={`lang-btn ${
              this.state.language === "zh" ? "active" : ""
            }`}
            onClick={() => this.switchLanguage("zh")}
          >
            中文
          </button>
          <button
            className={`lang-btn ${
              this.state.language === "en" ? "active" : ""
            }`}
            onClick={() => this.switchLanguage("en")}
          >
            EN
          </button>
        </div>
      </div>
    );
  };

  // 渲染视频列表页面
  renderVideoListPage = (t) => {
    return (
      <div className="guide-container">
        {/* 状态栏 */}
        <div className="status-bar">
          <div className="time">2:32</div>
          <div className="status-icons">
            <div className="signal-icon">📶</div>
            <div className="wifi-icon">📶</div>
            <div className="battery-icon">🔋</div>
          </div>
        </div>

        {/* 导航栏 */}
        <div className="navigation-bar">
          <button className="back-button" onClick={this.handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="title">{t.title}</h1>
          <button className="faq-button" onClick={this.handleFAQ}>
            {t.commonQuestions}
          </button>
        </div>

        {/* 主内容区域 */}
        <div className="main-content">
          <div className="content-card">
            <h2 className="section-title">{t.videoTutorials}</h2>
            <div className="video-list">
              {videoData.map((video) => (
                <div key={video.id} className="video-item">
                  <div className="video-title">{t[video.titleKey]}</div>
                  <div
                    className="video-preview"
                    onClick={() => this.handleVideoClick(video)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={t[video.titleKey]}
                      className="video-thumbnail"
                      loading="lazy"
                    />
                    <div className="video-overlay">
                      <div className="tutorial-label">{t.newbieTutorial}</div>
                      <div className="play-button">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="rgba(0,0,0,0.8)"
                          />
                          <path d="M10 8L16 12L10 16V8Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 视频播放器 */}
        {this.state.currentVideoUrl && (
          <div className="video-player-overlay">
            <div className="video-player-container">
              <button className="close-button" onClick={this.closeVideoPlayer}>
                ×
              </button>
              <video
                src={this.state.currentVideoUrl}
                controls
                autoPlay
                className="video-player"
              >
                您的浏览器不支持视频播放
              </video>
            </div>
          </div>
        )}

        {/* 语言切换按钮 */}
        <div className="language-switcher">
          <button
            className={`lang-btn ${
              this.state.language === "zh" ? "active" : ""
            }`}
            onClick={() => this.switchLanguage("zh")}
          >
            中文
          </button>
          <button
            className={`lang-btn ${
              this.state.language === "en" ? "active" : ""
            }`}
            onClick={() => this.switchLanguage("en")}
          >
            EN
          </button>
        </div>
      </div>
    );
  };
}

export default HGGuideVideoListView;
