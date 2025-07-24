document.addEventListener('DOMContentLoaded', function() {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const mainVisualContainer = document.querySelector('.main-visual-container'); // 画像コンテナ
    const mainVisualOverlayText = document.querySelector('.main-visual-overlay-text'); // 重ねるテキスト

    const pageWrapper = document.querySelector('.page-wrapper'); // page-wrapperを取得

    // 背景画像リスト
    const backgroundImages = [
        '../img/1tume.webp',
        '../img/2tume.webp',
        '../img/3tume.jpg'
    ];
    let currentImageIndex = 0;

    // 背景画像を切り替える関数
    const changeBackground = () => {
        // 画像のURLをCSSのbackground-imageプロパティに設定
        pageWrapper.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    };

    // 初期表示時の背景設定
    changeBackground();
    // 5秒ごとに背景画像を切り替える
    setInterval(changeBackground, 5000); // 5000ms = 5秒

    if (hamburgerIcon && sidebar && mainContent && mainVisualContainer && mainVisualOverlayText && pageWrapper) {
        hamburgerIcon.addEventListener('click', function() {
            sidebar.classList.toggle('is-open');
            document.body.classList.toggle('sidebar-open');
        });

        mainContent.addEventListener('click', function(event) {
            if (sidebar.classList.contains('is-open') && !sidebar.contains(event.target) && !hamburgerIcon.contains(event.target)) {
                sidebar.classList.remove('is-open');
                document.body.classList.remove('sidebar-open');
            }
        });

        // main-visual-overlay-textのアニメーション制御 (main-visual-containerがスクロールされたら)
        const checkVisibility = () => {
            const rect = mainVisualContainer.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

            if (isVisible) {
                mainVisualOverlayText.style.opacity = '1';
                mainVisualOverlayText.style.transform = 'translateY(0)';
            } else {
                mainVisualOverlayText.style.opacity = '0';
                mainVisualOverlayText.style.transform = 'translateY(50px)';
            }
        };

        window.addEventListener('scroll', checkVisibility);
        checkVisibility(); // 初期表示時にもチェック
    } else {
        console.error("Some required elements not found. Check HTML IDs/Classes/paths.");
    }
});