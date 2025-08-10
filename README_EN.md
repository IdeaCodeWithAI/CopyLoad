# CopyLoad - Chrome Extension

<div align="center">
  <img src="icons/icon128.png" alt="CopyLoad Logo" width="128" height="128">
  <h3>Smart Clipboard Storage and Management</h3>
  <p>A powerful Chrome/Edge extension for storing, managing, and searching copied text</p>
  
  [![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install-blue?logo=google-chrome)](https://chrome.google.com/webstore)
  [![Edge Add-ons](https://img.shields.io/badge/Edge%20Add--ons-Install-blue?logo=microsoft-edge)](https://microsoftedge.microsoft.com/addons)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![Language](https://img.shields.io/badge/Language-Vietnamese-red.svg)](README.md)
  [![Language](https://img.shields.io/badge/Language-English-blue.svg)](README_EN.md)
</div>
<p align="center">
<a href="https://github.com/anhhackta/CopyLoad-Extension/blob/main/README.md">Vietnamese</a > | English | <a href="https://github.com/anhhackta/CopyLoad-Extension/blob/main/README_JP.md">日本語</a>
</p >
---

## 🌟 Key Features

### ✨ **Smart Storage**
- **Auto-save**: Automatically save text when using Ctrl+C
- **Manual save**: Save selected text via right-click
- **Smart classification**: Support 2 storage types - temporary and permanent
- **Smart tagging**: Display "temp" tag for temporary clipboards

### 🎨 **Modern Interface**
- **Dark/Light Mode**: Support 3 interface modes (Light/Dark/System)
- **Multi-language**: Support Vietnamese and English
- **Responsive**: Optimized interface for all screen sizes
- **Modern colors**: Beautiful and professional color scheme

### 🔍 **Search and Management**
- **Real-time search**: Fast search in clipboard list
- **Smart counter**: Display number of saved clipboards
- **Quick copy**: Copy text back with one click
- **Smart delete**: Delete individual items or all with confirmation

### 💾 **Flexible Storage**
- **"Save to Device" Toggle**: 
  - **ON**: New clipboards → permanent storage (no temp tag, won't lose when browser closes)
  - **OFF**: New clipboards → temporary storage (with temp tag, lost when browser closes)
- **Download**: Export all list to .txt file
- **Unlimited**: Save unlimited clipboards

---
![Gif showing the conversion](./tutorial.gif)
## 📦 Installation

### Method 1: Install from ZIP file (Recommended)

1. **Download ZIP file** from [releases](../../releases) or other sources
2. **Extract** ZIP file to desired folder
3. **Open Chrome/Edge** and go to `chrome://extensions/`
4. **Enable "Developer mode"**
5. **Click "Load unpacked"**
6. **Select folder** containing extracted extension
7. **Done!** Extension will appear on toolbar

### Method 2: Install from Chrome Web Store (When available - ❌)

1. **Visit** [Chrome Web Store](https://chrome.google.com/webstore)
2. **Search** for "CopyLoad"
3. **Click "Add to Chrome"**
4. **Confirm** installation

### Method 3: Install from Edge Add-ons (When available - ❌ )

1. **Visit** [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons)
2. **Search** for "CopyLoad"
3. **Click "Get"**
4. **Confirm** installation

---

## 🚀 Detailed Usage Guide

### 📋 **Save Clipboard**

#### Auto-save (Ctrl+C)
1. **Select text** on webpage
2. **Press Ctrl+C** (or Cmd+C on Mac)
3. **Text will be saved** automatically to list
4. **Check tag**: If has "temp" tag = temporary storage, no tag = permanent storage

#### Manual save (Right-click)
1. **Select text** on webpage
2. **Right-click**
3. **Choose "Save to Clipboard"**
4. **Text will be saved** permanently (no temp tag)

### ⚙️ **Storage Settings**

#### Toggle "Save when Ctrl+C"
- **ON**: Auto-save when Ctrl+C
- **OFF**: Don't save when Ctrl+C

#### Toggle "Save to Device" (Important!)
- **ON**: New clipboards → permanent storage (no temp tag, won't lose when browser closes)
- **OFF**: New clipboards → temporary storage (with temp tag, lost when browser closes)

### 🎨 **Interface Customization**

#### Change language
1. **Click language dropdown** (VN/EN)
2. **Select desired language**
3. **Interface will change** immediately

#### Change theme
1. **Click theme dropdown** (🌙)
2. **Choose mode**: ☀️ Light / 🌙 Dark / 🖥️ System
3. **Interface will change** immediately

### 🔍 **Search and Management**

#### Search clipboard
1. **Enter keywords** in search box
2. **Results display** real-time
3. **Counter shows** number of results

#### Copy clipboard
1. **Click "Copy" button** next to clipboard
2. **Text will be copied** to system clipboard
3. **Success notification** will appear

#### Delete clipboard
1. **Click "Del" button** next to clipboard
2. **Clipboard will be deleted** from list
3. **Success notification** will appear

#### Delete all
1. **Click "Clear All" button**
2. **Confirm** in modal
3. **All clipboards** will be deleted

#### Download list
1. **Click "Download" button**
2. **.txt file** will be downloaded
3. **Contains all saved** clipboards

---

## 🔧 File Structure

```
CopyLoad/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for background processing
├── content.js             # Content script for event listening
├── popup.html             # Popup interface
├── popup.css              # CSS for popup
├── popup.js               # JavaScript for popup
├── icons/                 # Icons folder
│   ├── icon16.png        # 16x16 icon
│   ├── icon48.png        # 48x48 icon
│   ├── icon128.png       # 128x128 icon
│   └── icon.svg          # Original SVG icon
├── README.md              # Vietnamese guide
├── README_EN.md           # English guide
└── LICENSE                # MIT license
```

---

## 🎯 Detailed Features

### 📊 **Smart Statistics**
- **Real-time counter**: Display number of clipboards
- **Classification**: "Temp" tag for temporary clipboards
- **Search**: Support fast search functionality

### 🔄 **Sync and Storage**
- **Persistent storage**: Permanent storage in `chrome.storage.local`
- **Session storage**: Temporary storage in `chrome.storage.session`
- **Auto-sync**: Automatic sync between tabs

### 🛡️ **Security and Privacy**
- **Local storage**: Data only stored on local machine
- **No data transmission**: No clipboard data sent to servers
- **Minimal permissions**: Only request necessary permissions

---

## 🐛 Common Issues and Solutions

### Extension not working
1. **Check permissions**: Ensure extension has access to webpage
2. **Reload extension**: Go to `chrome://extensions/` and click "Reload"
3. **Check console**: Open DevTools to see errors

### Ctrl+C not saving
1. **Check toggle**: Ensure "Save when Ctrl+C" toggle is ON
2. **Check webpage**: Some websites may block copy events
3. **Try right-click**: Use right-click to save manually

### Clipboard lost
1. **Check "Save to Device" toggle**: 
   - If OFF: Clipboards with "temp" tag will be lost when browser closes
   - If ON: Clipboards will be saved permanently
2. **Check storage**: Go to DevTools > Application > Storage

### "Temp" tag not showing
1. **Check "Save to Device" toggle**: Must be OFF to have temp tags
2. **Reload extension**: Go to `chrome://extensions/` and click "Reload"
3. **Check logic**: Temp tags only show for clipboards in temp storage

---

## 🤝 Contributing

We welcome all contributions! Please:

1. **Fork** this repository
2. **Create new branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Create Pull Request**

### 🐛 Report bugs
- **Create Issue** with detailed description
- **Attach screenshots** if possible
- **Describe steps to reproduce** the bug

### 💡 Suggest features
- **Create Issue** with "enhancement" label
- **Describe in detail** the desired feature
- **Explain benefits** of the feature

---

## 📄 License

This project is distributed under the MIT license. See [LICENSE](LICENSE) file for more details.

---

## 👨‍💻 Author

**Nguyen Ba Hoang** - Supporting ideas

- 🌐 **Website**: [anhhackta.com](https://portfolio.bahoang.com)
- 📧 **Email**: [contact@anhhackta.com](mailto:contact@anhhackta.com)
- 💬 **Facebook**: [@anhhackta](https://facebook.com/anhhackta.official)
- 💰 **Support**: [PayPal](https://paypal.me/bahoang2k2)
- 📂 **GitHub**: [@anhhackta](https://github.com/anhhackta)

---

## ⭐ Rating

If you like this extension, please:

- ⭐ **Star** this repository
- 📝 **Leave a review** on Chrome Web Store
- 💰 **Support** the author via PayPal
- 📢 **Share** with friends

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/anhhackta">Nguyen Ba Hoang</a></p>
  <p>Support the project: <a href="https://paypal.me/bahoang2k2">PayPal</a> | <a href="https://facebook.com/anhhackta.official">Facebook</a></p>
</div> 
