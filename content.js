// Biến để theo dõi trạng thái copy
let isCopying = false;
let lastSelectedText = '';

// Lắng nghe sự kiện copy (Ctrl+C)
document.addEventListener('copy', async (event) => {
  try {
    isCopying = true;
    
    // Kiểm tra xem tính năng lưu Ctrl+C có được bật không
    const result = await chrome.storage.local.get(['enableCtrlC']);
    if (result.enableCtrlC !== false) { // Mặc định là true
      // Lấy text đã được copy
      const selectedText = window.getSelection().toString();
      if (selectedText && selectedText.trim()) {
        lastSelectedText = selectedText.trim();
        
        // Gửi text về background script để lưu
        chrome.runtime.sendMessage({
          action: "saveTempText",
          text: lastSelectedText
        });
      }
    }
  } catch (error) {
    console.error('Lỗi khi xử lý sự kiện copy:', error);
  } finally {
    // Reset sau một khoảng thời gian ngắn
    setTimeout(() => {
      isCopying = false;
    }, 100);
  }
});

// Lắng nghe sự kiện keydown để phát hiện Ctrl+C
document.addEventListener('keydown', async (event) => {
  try {
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
      // Kiểm tra xem tính năng lưu Ctrl+C có được bật không
      const result = await chrome.storage.local.get(['enableCtrlC']);
      if (result.enableCtrlC !== false) { // Mặc định là true
        // Đợi một chút để đảm bảo text đã được copy
        setTimeout(async () => {
          try {
            const selectedText = window.getSelection().toString();
            if (selectedText && selectedText.trim() && !isCopying) {
              chrome.runtime.sendMessage({
                action: "saveTempText",
                text: selectedText.trim()
              });
            }
          } catch (error) {
            console.error('Lỗi khi xử lý Ctrl+C:', error);
          }
        }, 50);
      }
    }
  } catch (error) {
    console.error('Lỗi khi xử lý sự kiện keydown:', error);
  }
});

// Lắng nghe sự kiện selectionchange để cải thiện việc phát hiện copy
document.addEventListener('selectionchange', async () => {
  try {
    // Chỉ xử lý khi có text được chọn
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      // Lưu trữ text được chọn để sử dụng sau
      lastSelectedText = selection.toString().trim();
    }
  } catch (error) {
    console.error('Lỗi khi xử lý selectionchange:', error);
  }
});

// Lắng nghe sự kiện mouseup để phát hiện copy qua chuột phải
document.addEventListener('mouseup', async (event) => {
  try {
    // Kiểm tra xem có phải chuột phải không
    if (event.button === 2) {
      const selectedText = window.getSelection().toString();
      if (selectedText && selectedText.trim()) {
        // Đợi một chút để context menu xuất hiện
        setTimeout(async () => {
          const result = await chrome.storage.local.get(['enableCtrlC']);
          if (result.enableCtrlC !== false) {
            chrome.runtime.sendMessage({
              action: "saveTempText",
              text: selectedText.trim()
            });
          }
        }, 200);
      }
    }
  } catch (error) {
    console.error('Lỗi khi xử lý mouseup:', error);
  }
});

// Lắng nghe sự kiện beforecopy để chuẩn bị
document.addEventListener('beforecopy', async (event) => {
  try {
    const selectedText = window.getSelection().toString();
    if (selectedText && selectedText.trim()) {
      lastSelectedText = selectedText.trim();
    }
  } catch (error) {
    console.error('Lỗi khi xử lý beforecopy:', error);
  }
});

// Lắng nghe sự kiện aftercopy để xác nhận
document.addEventListener('aftercopy', async (event) => {
  try {
    if (lastSelectedText && !isCopying) {
      const result = await chrome.storage.local.get(['enableCtrlC']);
      if (result.enableCtrlC !== false) {
        chrome.runtime.sendMessage({
          action: "saveTempText",
          text: lastSelectedText
        });
      }
    }
  } catch (error) {
    console.error('Lỗi khi xử lý aftercopy:', error);
  }
}); 