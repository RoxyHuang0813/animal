document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const forestAnimation = document.getElementById('forest-animation');
    const mainSection = document.getElementById('main-section');
    const forestVideo = document.getElementById('forest-video');
    const skipBtn = document.querySelector('.skip-animation');
    let typeWriterTimeout = null; // 用於儲存打字機效果的 setTimeout ID

    // 初始化頁面
    setTimeout(() => loader.style.display = 'none', 1000); // 隱藏載入動畫

    // 影片事件處理
    forestVideo.addEventListener('loadeddata', () => {
        forestVideo.play().catch(() => handleAnimationEnd());
    });

    forestVideo.addEventListener('ended', handleAnimationEnd);
    forestVideo.addEventListener('error', handleAnimationEnd);

    // 跳過按鈕
    skipBtn.addEventListener('click', handleAnimationEnd);

    function handleAnimationEnd() {
        forestAnimation.style.opacity = '0';
        setTimeout(() => {
            forestAnimation.style.display = 'none';
            mainSection.style.display = 'flex';
            void mainSection.offsetHeight; // 強制重繪
            mainSection.classList.add('active');
            startDialogue();
        }, 800);
    }

    // 重新測驗按鈕
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // 重置頁面狀態
            resetPage();
            // 清除所有動態內容
            clearDynamicContent();
            // 重定向到測驗頁面
            window.location.href = '/test';
        });
    }

    // 重置頁面狀態
    function resetPage() {
        const dialogueText = document.querySelector('.dialogue-text');
        if (dialogueText) {
            dialogueText.textContent = ''; // 清空對話框內容
        }
        if (mainSection) {
            mainSection.style.display = 'none'; // 隱藏主內容區
            mainSection.style.opacity = '0'; // 重置透明度
            mainSection.classList.remove('active'); // 移除 active 類
        }
        if (forestAnimation) {
            forestAnimation.style.display = 'flex'; // 顯示動畫區
            forestAnimation.style.opacity = '1'; // 重置透明度
        }
    }

    // 清除所有動態內容
    function clearDynamicContent() {
        const teacherSection = document.querySelector('.teacher-result-section');
        if (teacherSection) {
            teacherSection.style.display = 'none'; // 隱藏大K老師的對話框
            teacherSection.style.opacity = '0'; // 重置透明度
        }
    }

    // 打字機效果（分段顯示）
    function startDialogue() {
        const text = [
            "歡迎來到潛意識財富森林！\n",
            "我是潛意識無限學院的院長\n",
            "～大K老師～\n",
            "準備好探索你的金錢動物了嗎？"
        ];
        const dialogueText = document.querySelector('.dialogue-text');
        if (dialogueText) {
            // 清除之前的打字機效果
            if (typeWriterTimeout) {
                clearTimeout(typeWriterTimeout);
                typeWriterTimeout = null;
            }

            dialogueText.textContent = ''; // 清空原有內容
            let lineIndex = 0;
            let charIndex = 0;

            const typeWriter = () => {
                if (lineIndex < text.length) {
                    if (charIndex < text[lineIndex].length) {
                        // 逐字顯示
                        dialogueText.textContent += text[lineIndex].charAt(charIndex);
                        charIndex++;
                        const typeSound = document.getElementById('type-sound');
                        if (typeSound) {
                            typeSound.currentTime = 0; // 重置音效
                            typeSound.play(); // 播放打字音效
                        }
                        typeWriterTimeout = setTimeout(typeWriter, 100); // 控制打字速度
                    } else {
                        // 換行並顯示下一段文字
                        dialogueText.innerHTML += '<br>'; // 使用 <br> 換行
                        lineIndex++;
                        charIndex = 0;
                        typeWriterTimeout = setTimeout(typeWriter, 500); // 換行後稍作停頓
                    }
                } else {
                    // 顯示測驗按鈕
                    const quizSection = document.getElementById('quiz-section');
                    if (quizSection) {
                        quizSection.style.display = 'flex';
                    }
                }
            };
            typeWriter();
        }
    }

    // 獲取大K老師的圖像元素
    const teacherK = document.querySelector('.character-img'); // 使用 class 選擇器
    if (teacherK) {
        teacherK.addEventListener('click', showTeacherIntro);
    }

    // 獲取「上一頁」按鈕元素
    const backToIndexBtn = document.getElementById('back-to-index-btn');
    if (backToIndexBtn) {
        backToIndexBtn.addEventListener('click', goBackToIndex);
    }

    // 顯示大K老師的介紹
    function showTeacherIntro() {
        const teacherIntroSection = document.getElementById('teacher-intro-section');
        const mainSection = document.getElementById('main-section');
        if (teacherIntroSection && mainSection) {
            mainSection.style.display = 'none'; // 隱藏主內容區
            teacherIntroSection.style.display = 'flex'; // 顯示大K老師的介紹
        }
    }

    // 返回首頁
    function goBackToIndex() {
        const teacherIntroSection = document.getElementById('teacher-intro-section');
        const mainSection = document.getElementById('main-section');
        if (teacherIntroSection && mainSection) {
            teacherIntroSection.style.display = 'none'; // 隱藏大K老師的介紹
            mainSection.style.display = 'flex'; // 顯示主內容區
        }
    }

    // 音效處理
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.volume = 0.6;
        bgMusic.play().catch(() => {
            const audioPrompt = document.getElementById('audio-prompt');
            if (audioPrompt) {
                audioPrompt.style.display = 'block';
            }
        });
    }

    document.body.addEventListener('click', () => {
        if (bgMusic) {
            bgMusic.play().catch(console.error);
        }
    });
});