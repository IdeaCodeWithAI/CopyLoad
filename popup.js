// DOM elements
const textList = document.getElementById('textList');
const toggleCtrlC = document.getElementById('toggleCtrlC');
const togglePersistent = document.getElementById('togglePersistent');
const downloadBtn = document.getElementById('downloadBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const searchInput = document.getElementById('searchInput');
const clipboardCounter = document.getElementById('clipboardCounter');
const languageBtn = document.getElementById('languageBtn');
const languageContent = document.getElementById('languageContent');
const currentLang = document.getElementById('currentLang');
const themeBtn = document.getElementById('themeBtn');
const themeContent = document.getElementById('themeContent');
const currentTheme = document.getElementById('currentTheme');
const clearAllModal = document.getElementById('clearAllModal');
const cancelClear = document.getElementById('cancelClear');
const confirmClear = document.getElementById('confirmClear');
const authorName = document.getElementById('authorName');
const supportLink = document.getElementById('supportLink');

// Theme management
let currentThemeMode = 'light';
const themes = ['light', 'dark', 'system'];

// Language management
let currentLanguage = 'vi';
const languages = {
    vi: {
        searchPlaceholder: 'Tìm kiếm clipboard...',
        saveCtrlC: 'Lưu khi Ctrl+C',
        saveToDevice: 'Lưu vào máy',
        download: 'Download',
        clearAll: 'Xóa hết',
        confirmClearTitle: 'Xác nhận xóa',
        confirmClearText: 'Bạn có chắc chắn muốn xóa tất cả clipboard? Hành động này không thể hoàn tác.',
        cancel: 'Hủy',
        confirm: 'Xóa tất cả',
        copySuccess: 'Đã copy vào clipboard!',
        copyError: 'Lỗi khi copy text!',
        deleteSuccess: 'Đã xóa text!',
        deleteError: 'Lỗi khi xóa text!',
        downloadSuccess: 'Đã download file thành công!',
        downloadError: 'Lỗi khi download file!',
        noTextToDownload: 'Không có text nào để download!',
        noTextSaved: 'Chưa có text nào được lưu',
        noSearchResults: 'Không tìm thấy kết quả',
        clearAllSuccess: 'Đã xóa tất cả clipboard!',
        clearAllError: 'Lỗi khi xóa tất cả clipboard!',
        light: 'Sáng',
        dark: 'Tối',
        system: 'Thiết bị',
        temp: 'temp'
    },
    en: {
        searchPlaceholder: 'Search clipboard...',
        saveCtrlC: 'Save when Ctrl+C',
        saveToDevice: 'Save to device',
        download: 'Download',
        clearAll: 'Clear All',
        confirmClearTitle: 'Confirm Delete',
        confirmClearText: 'Are you sure you want to delete all clipboards? This action cannot be undone.',
        cancel: 'Cancel',
        confirm: 'Delete All',
        copySuccess: 'Copied to clipboard!',
        copyError: 'Error copying text!',
        deleteSuccess: 'Text deleted!',
        deleteError: 'Error deleting text!',
        downloadSuccess: 'File downloaded successfully!',
        downloadError: 'Error downloading file!',
        noTextToDownload: 'No text to download!',
        noTextSaved: 'No text saved yet',
        noSearchResults: 'No results found',
        clearAllSuccess: 'All clipboards cleared!',
        clearAllError: 'Error clearing all clipboards!',
        light: 'Light',
        dark: 'Dark',
        system: 'System',
        temp: 'temp'
    }
};

// Load settings khi popup mở
document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();
    await loadTheme();
    await loadLanguage();
    await loadTextList();
    setupEventListeners();
});

// Load settings từ storage
async function loadSettings() {
    try {
        const result = await chrome.storage.local.get(['enableCtrlC', 'enablePersistent', 'theme', 'language']);
        toggleCtrlC.checked = result.enableCtrlC !== false; // Mặc định true
        togglePersistent.checked = result.enablePersistent !== false; // Mặc định true
        currentThemeMode = result.theme || 'light';
        currentLanguage = result.language || 'vi';
    } catch (error) {
        console.error('Lỗi khi load settings:', error);
    }
}

// Load theme
async function loadTheme() {
    const savedTheme = await chrome.storage.local.get(['theme']);
    currentThemeMode = savedTheme.theme || 'light';
    applyTheme(currentThemeMode);
    updateThemeButton();
}

// Load language
async function loadLanguage() {
    const savedLang = await chrome.storage.local.get(['language']);
    currentLanguage = savedLang.language || 'vi';
    updateLanguageUI();
}

// Apply theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
}

// Update theme button
function updateThemeButton() {
    const icons = { light: '☀️', dark: '🌙', system: '🖥️' };
    currentTheme.textContent = icons[currentThemeMode] || '🌙';
}

// Update language UI
function updateLanguageUI() {
    currentLang.textContent = currentLanguage === 'vi' ? 'VN' : 'EN';
    searchInput.placeholder = languages[currentLanguage].searchPlaceholder;
    
    // Update toggle texts
    document.querySelector('.toggle-text').textContent = languages[currentLanguage].saveCtrlC;
    document.querySelectorAll('.toggle-text')[1].textContent = languages[currentLanguage].saveToDevice;
    
    // Update button texts
    downloadBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        ${languages[currentLanguage].download}
    `;
    
    clearAllBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
        </svg>
        ${languages[currentLanguage].clearAll}
    `;
    
    // Update dropdown items - theme dropdown only shows icons
    const themeItems = themeContent.querySelectorAll('.dropdown-item');
    themeItems[0].textContent = '☀️';
    themeItems[1].textContent = '🌙';
    themeItems[2].textContent = '🖥️';
    
    // Update modal texts
    const modalTitle = clearAllModal.querySelector('.modal-title');
    const modalText = clearAllModal.querySelector('.modal-text');
    const cancelBtn = clearAllModal.querySelector('#cancelClear');
    const confirmBtn = clearAllModal.querySelector('#confirmClear');
    
    modalTitle.textContent = languages[currentLanguage].confirmClearTitle;
    modalText.textContent = languages[currentLanguage].confirmClearText;
    cancelBtn.textContent = languages[currentLanguage].cancel;
    confirmBtn.textContent = languages[currentLanguage].confirm;
}

// Setup event listeners
function setupEventListeners() {
    // Theme dropdown
    themeBtn.addEventListener('click', () => {
        themeContent.classList.toggle('show');
        languageContent.classList.remove('show');
    });
    
    themeContent.addEventListener('click', async (e) => {
        if (e.target.classList.contains('dropdown-item')) {
            const theme = e.target.getAttribute('data-theme');
            currentThemeMode = theme;
            applyTheme(currentThemeMode);
            updateThemeButton();
            await chrome.storage.local.set({ theme: currentThemeMode });
            themeContent.classList.remove('show');
        }
    });
    
    // Language dropdown
    languageBtn.addEventListener('click', () => {
        languageContent.classList.toggle('show');
        themeContent.classList.remove('show');
    });
    
    languageContent.addEventListener('click', async (e) => {
        if (e.target.classList.contains('dropdown-item')) {
            const lang = e.target.getAttribute('data-lang');
            currentLanguage = lang;
            updateLanguageUI();
            await chrome.storage.local.set({ language: currentLanguage });
            languageContent.classList.remove('show');
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            languageContent.classList.remove('show');
            themeContent.classList.remove('show');
        }
    });
    
    // Author links
    authorName.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://facebook.com/anhhackta' });
    });
    
    supportLink.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://paypal.me/anhhackta' });
    });
    
    // Clear all modal
    clearAllBtn.addEventListener('click', () => {
        clearAllModal.style.display = 'block';
    });
    
    cancelClear.addEventListener('click', () => {
        clearAllModal.style.display = 'none';
    });
    
    confirmClear.addEventListener('click', async () => {
        await clearAllClipboards();
        clearAllModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    clearAllModal.addEventListener('click', (e) => {
        if (e.target === clearAllModal) {
            clearAllModal.style.display = 'none';
        }
    });
}

// Save settings khi toggle thay đổi
toggleCtrlC.addEventListener('change', async () => {
    await chrome.storage.local.set({ enableCtrlC: toggleCtrlC.checked });
});

togglePersistent.addEventListener('change', async () => {
    await chrome.storage.local.set({ enablePersistent: togglePersistent.checked });
    // Reload danh sách khi toggle thay đổi để cập nhật hiển thị
    await loadTextList();
});

// Search functionality
searchInput.addEventListener('input', async () => {
    await loadTextList();
});

// Load và hiển thị danh sách text
async function loadTextList() {
    try {
        // Lấy cả temp và persistent text
        const [tempResult, persistentResult] = await Promise.all([
            chrome.storage.session.get(['clipboard_temp']),
            chrome.storage.local.get(['clipboard_persistent'])
        ]);

        const tempTexts = tempResult.clipboard_temp || [];
        const persistentTexts = persistentResult.clipboard_persistent || [];
        
        // Kết hợp và loại bỏ trùng lặp
        let allTexts = [...new Set([...tempTexts, ...persistentTexts])];
        
        // Filter by search
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            allTexts = allTexts.filter(text => 
                text.toLowerCase().includes(searchTerm)
            );
        }
        
        // Update counter
        clipboardCounter.textContent = allTexts.length;
        
        displayTextList(allTexts, tempTexts);
    } catch (error) {
        console.error('Lỗi khi load text list:', error);
        displayTextList([], []);
    }
}

// Hiển thị danh sách text
function displayTextList(texts, tempTexts) {
    if (texts.length === 0) {
        textList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"></path>
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"></path>
                    <path d="M12 3c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"></path>
                    <path d="M12 21c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"></path>
                </svg>
                <div>${searchInput.value ? languages[currentLanguage].noSearchResults : languages[currentLanguage].noTextSaved}</div>
            </div>
        `;
        return;
    }

    textList.innerHTML = texts.map((text, index) => {
        // Chỉ hiển thị tag temp cho những text trong temp storage
        const isTemp = tempTexts.includes(text);
        const tempTag = isTemp ? `<div class="temp-tag">${languages[currentLanguage].temp}</div>` : '';
        
        return `
            <div class="text-item" data-text="${encodeURIComponent(text)}">
                ${tempTag}
                <div class="text-content" title="${text}">${truncateText(text, 50)}</div>
                <div class="text-actions">
                    <button class="btn btn-copy" data-text="${encodeURIComponent(text)}">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                    </button>
                    <button class="btn btn-delete" data-text="${encodeURIComponent(text)}">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                        </svg>
                        Del
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Add event listeners for copy and delete buttons
    textList.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const encodedText = btn.getAttribute('data-text');
            await copyText(encodedText);
        });
    });

    textList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const encodedText = btn.getAttribute('data-text');
            await deleteText(encodedText);
        });
    });
}

// Cắt text nếu quá dài
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Copy text
async function copyText(encodedText) {
    try {
        const text = decodeURIComponent(encodedText);
        await navigator.clipboard.writeText(text);
        
        // Hiển thị thông báo thành công
        showNotification(languages[currentLanguage].copySuccess);
    } catch (error) {
        console.error('Lỗi khi copy text:', error);
        showNotification(languages[currentLanguage].copyError, 'error');
    }
}

// Delete text
async function deleteText(encodedText) {
    try {
        const text = decodeURIComponent(encodedText);
        
        // Xóa khỏi cả temp và persistent storage
        const [tempResult, persistentResult] = await Promise.all([
            chrome.storage.session.get(['clipboard_temp']),
            chrome.storage.local.get(['clipboard_persistent'])
        ]);

        const tempTexts = tempResult.clipboard_temp || [];
        const persistentTexts = persistentResult.clipboard_persistent || [];

        // Lọc bỏ text cần xóa
        const newTempTexts = tempTexts.filter(t => t !== text);
        const newPersistentTexts = persistentTexts.filter(t => t !== text);

        // Lưu lại
        await Promise.all([
            chrome.storage.session.set({ clipboard_temp: newTempTexts }),
            chrome.storage.local.set({ clipboard_persistent: newPersistentTexts })
        ]);

        // Reload danh sách
        await loadTextList();
        showNotification(languages[currentLanguage].deleteSuccess);
    } catch (error) {
        console.error('Lỗi khi xóa text:', error);
        showNotification(languages[currentLanguage].deleteError, 'error');
    }
}

// Clear all clipboards
async function clearAllClipboards() {
    try {
        await Promise.all([
            chrome.storage.session.set({ clipboard_temp: [] }),
            chrome.storage.local.set({ clipboard_persistent: [] })
        ]);
        
        await loadTextList();
        showNotification(languages[currentLanguage].clearAllSuccess);
    } catch (error) {
        console.error('Lỗi khi xóa tất cả clipboard:', error);
        showNotification(languages[currentLanguage].clearAllError, 'error');
    }
}

// Download tất cả text
downloadBtn.addEventListener('click', async () => {
    try {
        const [tempResult, persistentResult] = await Promise.all([
            chrome.storage.session.get(['clipboard_temp']),
            chrome.storage.local.get(['clipboard_persistent'])
        ]);

        const tempTexts = tempResult.clipboard_temp || [];
        const persistentTexts = persistentResult.clipboard_persistent || [];
        
        // Kết hợp và loại bỏ trùng lặp
        const allTexts = [...new Set([...tempTexts, ...persistentTexts])];
        
        if (allTexts.length === 0) {
            showNotification(languages[currentLanguage].noTextToDownload, 'warning');
            return;
        }

        // Tạo nội dung file
        const content = allTexts.map((text, index) => `${index + 1}. ${text}`).join('\n\n');
        
        // Tạo và download file
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `copyload_texts_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification(languages[currentLanguage].downloadSuccess);
    } catch (error) {
        console.error('Lỗi khi download:', error);
        showNotification(languages[currentLanguage].downloadError, 'error');
    }
});

// Hiển thị thông báo
function showNotification(message, type = 'success') {
    // Tạo notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 6px;
        color: white;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        background: ${type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#28a745'};
    `;
    notification.textContent = message;
    
    // Thêm CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Reload danh sách khi popup được focus
window.addEventListener('focus', loadTextList);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (currentThemeMode === 'system') {
        applyTheme('system');
    }
}); 