# 📁 FOLDER STRUCTURE — Quick Reference

## What You're Uploading

```
github-upload/                        ← This entire folder goes to GitHub
│
├── 📄 index.html                     ← Main landing page (shows all issues)
├── 📄 README.md                      ← Repository description
├── 📄 UPLOAD_INSTRUCTIONS.md         ← Step-by-step guide (you're reading it!)
│
├── 📂 issues/                        ← All magazine issues
│   │
│   ├── 📂 2026-03-march/            ← Issue 1: March 2026
│   │   └── 📄 index.html            ← Inaugural issue placeholder
│   │
│   └── 📂 2026-05-may/              ← Issue 2: May 2026 (Varanasi Edition)
│       ├── 📄 index.html            ← Landing page (Development content)
│       ├── 📄 development.html      ← Development article (5.9 MB with images)
│       ├── 📄 food.html             ← Food section (1.4 MB with images)
│       ├── 📄 history.html          ← History of Varanasi
│       ├── 📄 culture.html          ← Cultural traditions
│       └── 📄 archive.html          ← Archive page
│
└── 📂 assets/                       ← Shared assets (images, etc.)
    └── 📂 images/                   ← Image folder (currently empty)
```

---

## 🌐 How URLs Will Work

After uploading to GitHub:

```
Your Repository: https://github.com/UPADDetroit/times

Your Website:    https://upaddetroit.github.io/times/
                 ↓
                 index.html (main landing page)
                 Shows cards for all issues


Issue 2 URL:     https://upaddetroit.github.io/times/issues/2026-05-may/
                 ↓
                 issues/2026-05-may/index.html
                 (Development content with navigation to other tabs)


Issue 1 URL:     https://upaddetroit.github.io/times/issues/2026-03-march/
                 ↓
                 issues/2026-03-march/index.html
                 (Placeholder page)
```

---

## 📊 File Sizes

```
Total Size: ~12 MB

Breakdown:
├── index.html                     ~15 KB    (Main landing)
├── README.md                      ~6 KB     (Docs)
├── issues/2026-03-march/          ~4 KB     (Placeholder)
└── issues/2026-05-may/
    ├── index.html                 ~5.9 MB   (Development with 9 images)
    ├── development.html           ~5.9 MB   (Same content)
    ├── food.html                  ~1.4 MB   (With 2 images)
    ├── history.html               ~201 KB
    ├── culture.html               ~219 KB
    └── archive.html               ~18 KB
```

---

## ✅ Upload Checklist

Use this checklist as you upload:

### Before Upload
- [ ] Downloaded the `github-upload` folder
- [ ] Verified all files are present (10 HTML files total)
- [ ] Read UPLOAD_INSTRUCTIONS.md

### During Upload
- [ ] Deleted old files from repository
- [ ] Uploaded root files (index.html, README.md)
- [ ] Created issues/2026-03-march/ folder
- [ ] Uploaded Issue 1 files
- [ ] Created issues/2026-05-may/ folder
- [ ] Uploaded all Issue 2 files (6 HTML files)
- [ ] Created assets/images/ folder

### After Upload
- [ ] Enabled GitHub Pages in Settings
- [ ] Waited 1-2 minutes for deployment
- [ ] Tested main landing page
- [ ] Tested Issue 2 (May 2026)
- [ ] Tested Issue 1 (March 2026)
- [ ] Verified navigation works
- [ ] Tested on mobile device
- [ ] Shared URL with team!

---

## 🎯 Next Steps (After Upload)

### Future Issues
When you create June 2026 issue:

1. Create new folder: `issues/2026-06-june/`
2. Add your HTML files
3. Update main `index.html` to add new issue card
4. Upload to GitHub
5. Done! Auto-deploys in ~1 minute

### Adding Content
- **New images:** Upload to `assets/images/`
- **New pages:** Add to respective issue folder
- **Update navigation:** Edit index.html to show new issues

---

## 📞 Questions?

If something doesn't make sense:
1. Check UPLOAD_INSTRUCTIONS.md for detailed steps
2. Email: UPADTimes@gmail.com
3. Or just start uploading — you can always fix things later!

---

**Ready? Let's do this! 🚀**

Start with UPLOAD_INSTRUCTIONS.md for detailed step-by-step guide.
