// Cache cờ cấu hình để đỡ await liên tục
let enableCtrlC = true;
chrome.storage.local.get(['enableCtrlC']).then(res => {
  if (res.enableCtrlC === false) enableCtrlC = false;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'enableCtrlC' in changes) {
    enableCtrlC = changes.enableCtrlC.newValue !== false;
  }
});

// Lấy text đang chọn, hỗ trợ input/textarea/contentEditable và selection thường
function getCurrentSelectionText() {
  const ae = document.activeElement;
  // Input/Textarea
  if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA')) {
    const start = ae.selectionStart ?? 0;
    const end = ae.selectionEnd ?? 0;
    if (typeof start === 'number' && typeof end === 'number' && end > start) {
      return ae.value.substring(start, end);
    }
    return '';
  }
  // ContentEditable hoặc selection trên trang
  const sel = window.getSelection();
  return sel ? sel.toString() : '';
}

// Bắt mọi hành vi copy trong PAGE (Ctrl+C, menu, v.v.)
document.addEventListener('copy', () => {
  if (!enableCtrlC) return;

  const text = getCurrentSelectionText();
  if (text && text.trim()) {
    chrome.runtime.sendMessage({
      action: 'saveTempText',
      text: text.trim()
    });
  }
}, true); // capture=true để ưu tiên trước một số lib chặn sự kiện

// Optional: khi Paste trong PAGE thì cũng lưu (hữu ích khi user paste URL đã copy ở chỗ khác)
document.addEventListener('paste', (event) => {
  if (!enableCtrlC) return;
  const cd = event.clipboardData || window.clipboardData;
  if (!cd) return;
  const pasted = cd.getData('text');
  if (pasted && pasted.trim()) {
    chrome.runtime.sendMessage({
      action: 'saveTempText',
      text: pasted.trim()
    });
  }
}, true); 