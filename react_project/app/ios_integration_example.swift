// iOS WKWebView 集成示例 - 使用 Frame 布局
// 这个文件展示了如何在iOS应用中集成视频教程页面

import WebKit
import UIKit
import AVKit

class VideoGuideViewController: UIViewController {
    private var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupWebView()
        loadVideoGuidePage()
    }
    
    private func setupWebView() {
        // 创建WKWebView配置
        let configuration = WKWebViewConfiguration()
        
        // 添加JavaScript消息处理器
        configuration.userContentController.add(self, name: "playVideo")
        
        // 创建WKWebView
        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.navigationDelegate = self
        webView.uiDelegate = self
        
        // 设置frame布局
        webView.frame = CGRect(
            x: 0,
            y: view.safeAreaInsets.top,
            width: view.bounds.width,
            height: view.bounds.height - view.safeAreaInsets.top
        )
        
        view.addSubview(webView)
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        // 更新webView的frame
        webView.frame = CGRect(
            x: 0,
            y: view.safeAreaInsets.top,
            width: view.bounds.width,
            height: view.bounds.height - view.safeAreaInsets.top
        )
    }
    
    private func loadVideoGuidePage() {
        // 加载本地HTML文件或远程URL
        if let url = Bundle.main.url(forResource: "hg_guide_video_list_view", withExtension: "html") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else if let url = URL(string: "https://your-domain.com/hg_guide_video_list_view.html") {
            webView.load(URLRequest(url: url))
        }
    }
}

// MARK: - WKScriptMessageHandler
extension VideoGuideViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        switch message.name {
        case "playVideo":
            handlePlayVideo(message: message)
        default:
            break
        }
    }
    
    private func handlePlayVideo(message: WKScriptMessage) {
        guard let body = message.body as? [String: Any],
              let videoUrl = body["videoUrl"] as? String,
              let title = body["title"] as? String else {
            return
        }
        
        // 创建视频播放器视图控制器
        let videoPlayerVC = VideoPlayerViewController()
        videoPlayerVC.videoUrl = videoUrl
        videoPlayerVC.videoTitle = title
        
        // 以模态方式呈现视频播放器
        present(videoPlayerVC, animated: true)
    }
}

// MARK: - WKNavigationDelegate
extension VideoGuideViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // 页面加载完成后的处理
        print("Video guide page loaded successfully")
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        // 页面加载失败的处理
        print("Failed to load video guide page: \(error.localizedDescription)")
    }
}

// MARK: - WKUIDelegate
extension VideoGuideViewController: WKUIDelegate {
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        // 处理新窗口打开请求
        if let url = navigationAction.request.url {
            UIApplication.shared.open(url)
        }
        return nil
    }
}

// MARK: - 视频播放器视图控制器 - 使用 Frame 布局
class VideoPlayerViewController: UIViewController {
    var videoUrl: String?
    var videoTitle: String?
    
    private var playerView: UIView!
    private var closeButton: UIButton!
    private var titleLabel: UILabel!
    private var playerViewController: AVPlayerViewController!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupVideoPlayer()
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        updateFrames()
    }
    
    private func setupUI() {
        view.backgroundColor = .black
        
        // 创建标题标签
        titleLabel = UILabel()
        titleLabel.text = videoTitle
        titleLabel.textColor = .white
        titleLabel.font = UIFont.boldSystemFont(ofSize: 18)
        titleLabel.textAlignment = .center
        titleLabel.numberOfLines = 0
        view.addSubview(titleLabel)
        
        // 创建关闭按钮
        closeButton = UIButton(type: .system)
        closeButton.setTitle("×", for: .normal)
        closeButton.titleLabel?.font = UIFont.systemFont(ofSize: 24)
        closeButton.setTitleColor(.white, for: .normal)
        closeButton.backgroundColor = UIColor.black.withAlphaComponent(0.5)
        closeButton.layer.cornerRadius = 20
        closeButton.addTarget(self, action: #selector(closeButtonTapped), for: .touchUpInside)
        view.addSubview(closeButton)
        
        // 创建播放器视图
        playerView = UIView()
        playerView.backgroundColor = .black
        view.addSubview(playerView)
        
        // 设置初始frame
        updateFrames()
    }
    
    private func updateFrames() {
        let safeAreaTop = view.safeAreaInsets.top
        let safeAreaBottom = view.safeAreaInsets.bottom
        let viewWidth = view.bounds.width
        let viewHeight = view.bounds.height
        
        // 标题标签frame
        let titleHeight: CGFloat = 60
        titleLabel.frame = CGRect(
            x: 20,
            y: safeAreaTop + 20,
            width: viewWidth - 80, // 为关闭按钮留出空间
            height: titleHeight
        )
        
        // 关闭按钮frame
        let buttonSize: CGFloat = 40
        closeButton.frame = CGRect(
            x: viewWidth - 60,
            y: safeAreaTop + 20,
            width: buttonSize,
            height: buttonSize
        )
        
        // 播放器视图frame
        let playerY = titleLabel.frame.maxY + 20
        let playerHeight = viewHeight - playerY - safeAreaBottom - 20
        playerView.frame = CGRect(
            x: 0,
            y: playerY,
            width: viewWidth,
            height: playerHeight
        )
        
        // 更新播放器控制器的frame
        if let playerVC = playerViewController {
            playerVC.view.frame = playerView.bounds
        }
    }
    
    private func setupVideoPlayer() {
        guard let videoUrl = videoUrl,
              let url = URL(string: videoUrl) else {
            return
        }
        
        // 创建AVPlayerViewController
        playerViewController = AVPlayerViewController()
        let player = AVPlayer(url: url)
        playerViewController.player = player
        
        // 添加播放器视图控制器
        addChild(playerViewController)
        playerView.addSubview(playerViewController.view)
        playerViewController.didMove(toParent: self)
        
        // 设置播放器视图的frame
        playerViewController.view.frame = playerView.bounds
        
        // 开始播放
        player.play()
    }
    
    @objc private func closeButtonTapped() {
        dismiss(animated: true)
    }
}

// MARK: - 主应用入口示例
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // 创建主窗口
        window = UIWindow(frame: UIScreen.main.bounds)
        
        // 创建根视图控制器
        let rootViewController = MainViewController()
        let navigationController = UINavigationController(rootViewController: rootViewController)
        
        // 设置根视图控制器
        window?.rootViewController = navigationController
        window?.makeKeyAndVisible()
        
        return true
    }
}

// MARK: - 主视图控制器
class MainViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    private func setupUI() {
        view.backgroundColor = .white
        title = "新手引导"
        
        // 创建进入引导按钮
        let enterGuideButton = UIButton(type: .system)
        enterGuideButton.setTitle("进入新手引导", for: .normal)
        enterGuideButton.titleLabel?.font = UIFont.systemFont(ofSize: 18, weight: .semibold)
        enterGuideButton.setTitleColor(.white, for: .normal)
        enterGuideButton.backgroundColor = .systemBlue
        enterGuideButton.layer.cornerRadius = 12
        enterGuideButton.addTarget(self, action: #selector(enterGuideButtonTapped), for: .touchUpInside)
        
        // 设置按钮frame
        let buttonWidth: CGFloat = 200
        let buttonHeight: CGFloat = 50
        enterGuideButton.frame = CGRect(
            x: (view.bounds.width - buttonWidth) / 2,
            y: (view.bounds.height - buttonHeight) / 2,
            width: buttonWidth,
            height: buttonHeight
        )
        
        view.addSubview(enterGuideButton)
    }
    
    @objc private func enterGuideButtonTapped() {
        let videoGuideVC = VideoGuideViewController()
        let navigationController = UINavigationController(rootViewController: videoGuideVC)
        present(navigationController, animated: true)
    }
}

// MARK: - 使用示例
/*
// 在SceneDelegate中设置（iOS 13+）
func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    guard let windowScene = (scene as? UIWindowScene) else { return }
    
    window = UIWindow(windowScene: windowScene)
    let mainVC = MainViewController()
    let navController = UINavigationController(rootViewController: mainVC)
    window?.rootViewController = navController
    window?.makeKeyAndVisible()
}

// 在AppDelegate中设置（iOS 12及以下）
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    window = UIWindow(frame: UIScreen.main.bounds)
    let mainVC = MainViewController()
    let navController = UINavigationController(rootViewController: mainVC)
    window?.rootViewController = navController
    window?.makeKeyAndVisible()
    return true
}
*/