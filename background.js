// Cache settings để tối ưu hiệu suất
let enableCtrlC = true;
let enablePersistent = true;

// Load settings ban đầu
chrome.storage.local.get(['enableCtrlC', 'enablePersistent']).then(res => {
  enableCtrlC = res.enableCtrlC !== false;
  enablePersistent = res.enablePersistent !== false;
});

// Lắng nghe thay đổi settings
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') {
    if ('enableCtrlC' in changes) {
      enableCtrlC = changes.enableCtrlC.newValue !== false;
    }
    if ('enablePersistent' in changes) {
      enablePersistent = changes.enablePersistent.newValue !== false;
    }
  }
});

// Khởi tạo context menu khi extension được cài đặt
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveToClipboard",
    title: "Lưu vào Clipboard",
    contexts: ["selection"]
  });
});

// Xử lý khi user click vào context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveToClipboard" && info.selectionText) {
    saveTextToPersistent(info.selectionText);
  }
});

// Lưu text vào storage vĩnh viễn (context menu luôn hoạt động)
async function saveTextToPersistent(text) {
  try {
    const result = await chrome.storage.local.get(['clipboard_persistent']);
    const persistentTexts = result.clipboard_persistent || [];
    
    // Loại bỏ text cũ nếu đã tồn tại (tránh duplicate)
    const filteredTexts = persistentTexts.filter(item => item !== text);
    
    // Thêm text mới vào đầu danh sách (mới nhất ở trên)
    filteredTexts.unshift(text);
    
    await chrome.storage.local.set({ clipboard_persistent: filteredTexts });
  } catch (error) {
    console.error('Lỗi khi lưu text persistent:', error);
  }
}

// Lưu text vào storage tạm thời
async function saveTextToTemp(text) {
  try {
    const result = await chrome.storage.session.get(['clipboard_temp']);
    const tempTexts = result.clipboard_temp || [];
    
    // Loại bỏ text cũ nếu đã tồn tại
    const filteredTexts = tempTexts.filter(item => item !== text);
    
    // Thêm text mới vào đầu danh sách (mới nhất ở trên)
    filteredTexts.unshift(text);
    
    await chrome.storage.session.set({ clipboard_temp: filteredTexts });
  } catch (error) {
    console.error('Lỗi khi lưu text temp:', error);
  }
}

// Lắng nghe message từ content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveTempText") {
    // Kiểm tra cache thay vì await
    if (!enableCtrlC) {
      sendResponse({ success: false });
      return;
    }

    // Quyết định lưu vào đâu dựa trên cache
    if (enablePersistent) {
      saveTextToPersistent(request.text);
    } else {
      saveTextToTemp(request.text);
    }
    
    sendResponse({ success: true });
  }
}); 