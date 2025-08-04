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
    
    // Kiểm tra xem text đã tồn tại chưa
    if (!persistentTexts.includes(text)) {
      persistentTexts.unshift(text); // Thêm vào đầu danh sách
      
      // Không giới hạn số lượng items
      await chrome.storage.local.set({ clipboard_persistent: persistentTexts });
    }
  } catch (error) {
    console.error('Lỗi khi lưu text:', error);
  }
}

// Lắng nghe message từ content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveTempText") {
    saveTextToTemp(request.text);
    sendResponse({ success: true });
  }
});

// Lưu text vào storage (temp hoặc persistent tùy theo toggle)
async function saveTextToTemp(text) {
  try {
    // Kiểm tra xem tính năng Ctrl+C có được bật không
    const settings = await chrome.storage.local.get(['enableCtrlC']);
    if (settings.enableCtrlC === false) {
      return; // Không lưu nếu tính năng bị tắt
    }

    // Kiểm tra xem tính năng persistent có được bật không
    const persistentSettings = await chrome.storage.local.get(['enablePersistent']);
    
    if (persistentSettings.enablePersistent !== false) {
      // Nếu toggle "Lưu vào máy" BẬT -> lưu vào persistent storage (tag real)
      await saveTextToPersistent(text);
    } else {
      // Nếu toggle "Lưu vào máy" TẮT -> lưu vào temp storage (tag temp)
      const result = await chrome.storage.session.get(['clipboard_temp']);
      const tempTexts = result.clipboard_temp || [];
      
      // Kiểm tra xem text đã tồn tại chưa
      if (!tempTexts.includes(text)) {
        tempTexts.unshift(text); // Thêm vào đầu danh sách
        
        // Không giới hạn số lượng items
        await chrome.storage.session.set({ clipboard_temp: tempTexts });
      }
    }
  } catch (error) {
    console.error('Lỗi khi lưu text tạm:', error);
  }
} 