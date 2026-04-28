# 📤 STEP-BY-STEP: Uploading to GitHub

## Overview
You'll be replacing your current files with this new organized folder structure.

---

## 🗂️ What You'll Upload

```
Your Computer
└── upad-times-organized/
    ├── index.html                    # Main landing page
    ├── README.md                     # Repository description
    ├── issues/
    │   ├── 2026-03-march/
    │   │   └── index.html           # Issue 1 placeholder
    │   └── 2026-05-may/
    │       ├── index.html           # Issue 2 main page
    │       ├── development.html
    │       ├── food.html
    │       ├── history.html
    │       ├── culture.html
    │       └── archive.html
    └── assets/
        └── images/
            └── (future images)
```

---

## 📋 Method 1: Using GitHub Website (Easiest)

### Step 1: Delete Old Files
1. Go to your repository: https://github.com/UPADDetroit/times
2. Click on each OLD file (one at a time):
   - `UPAD_Times_Issue01_March2026.html`
   - `UPAD_Times_Issue02_May2026.html`
   - `index.html` (the old one)
   - `upad-times-issue2-og.png`
3. For each file:
   - Click the file name to open it
   - Click the **trash can icon** (🗑️) at the top right
   - Scroll down and click **"Commit changes"**
   - Click **"Commit changes"** again in the popup

**KEEP:** `README.md` (we'll replace it)

---

### Step 2: Upload New Folder Structure

#### A. Upload Root Files First
1. On the main repository page, click **"Add file"** → **"Upload files"**
2. Drag these files from the downloaded folder:
   - `index.html` (the new main landing page)
   - `README.md` (the new repository README)
3. In the commit message box, type: `Update: New folder structure with organized issues`
4. Click **"Commit changes"**

#### B. Create the `issues` Folder
1. On the main repository page, click **"Add file"** → **"Create new file"**
2. In the filename box, type: `issues/2026-03-march/index.html`
   - Notice: GitHub automatically creates folders when you use `/` in the filename!
3. Copy-paste the content of `2026-03-march/index.html` into the editor
4. Scroll down and click **"Commit changes"**

#### C. Upload May 2026 Issue Files
1. Click **"Add file"** → **"Upload files"**
2. Navigate to the `issues/2026-05-may/` folder on your computer
3. Drag ALL 6 HTML files:
   - `index.html`
   - `development.html`
   - `food.html`
   - `history.html`
   - `culture.html`
   - `archive.html`
4. In the "Upload to:" dropdown at the top, change it to: `issues/2026-05-may/`
   - If the folder doesn't exist, type it manually: `issues/2026-05-may`
5. Commit message: `Add Issue 2 (May 2026 - Varanasi Edition)`
6. Click **"Commit changes"**

#### D. Create Assets Folder
1. Click **"Add file"** → **"Create new file"**
2. Type: `assets/images/.gitkeep`
   - The `.gitkeep` is a placeholder to keep the empty folder
3. Click **"Commit changes"**

---

### Step 3: Enable GitHub Pages
1. Go to **Settings** (top menu)
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Build and deployment"**:
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root)
4. Click **"Save"**
5. Wait ~1 minute, then refresh the page
6. You'll see: **"Your site is live at https://upaddetroit.github.io/times/"**

---

### Step 4: Test Your Site
Visit these URLs to confirm everything works:

✅ **Main landing page:**
https://upaddetroit.github.io/times/

✅ **Issue 2 (May 2026):**
https://upaddetroit.github.io/times/issues/2026-05-may/

✅ **Issue 1 (March 2026):**
https://upaddetroit.github.io/times/issues/2026-03-march/

---

## 📋 Method 2: Using GitHub Desktop (Recommended if uploading many files)

### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com/
2. Install and sign in with your GitHub account

### Step 2: Clone Your Repository
1. Open GitHub Desktop
2. Click **"File"** → **"Clone repository"**
3. Select **"UPADDetroit/times"**
4. Choose where to save it on your computer
5. Click **"Clone"**

### Step 3: Replace Files
1. Open the cloned folder on your computer
2. **Delete** all old files except `.git` folder (hidden folder - don't touch it!)
3. **Copy** everything from the `upad-times-organized` folder into this folder
4. Your folder should now have:
   ```
   times/
   ├── .git/              (hidden - don't delete!)
   ├── index.html
   ├── README.md
   ├── issues/
   └── assets/
   ```

### Step 4: Commit and Push
1. Open GitHub Desktop
2. You'll see all your changes listed
3. In the bottom-left:
   - **Summary:** "Reorganized repository with folder structure"
   - **Description:** "New organized structure: issues by date, main landing page"
4. Click **"Commit to main"**
5. Click **"Push origin"** (top right)

### Step 5: Enable GitHub Pages
(Same as Method 1, Step 3)

---

## 📋 Method 3: Using Git Command Line (Advanced)

```bash
# 1. Clone your repository
git clone https://github.com/UPADDetroit/times.git
cd times

# 2. Remove old files
git rm UPAD_Times_Issue01_March2026.html
git rm UPAD_Times_Issue02_May2026.html
git rm index.html
git rm upad-times-issue2-og.png

# 3. Copy new files
# (Copy the contents of upad-times-organized/ folder here)

# 4. Add all new files
git add .

# 5. Commit
git commit -m "Reorganized repository with folder structure"

# 6. Push
git push origin main
```

---

## ✅ Verification Checklist

After uploading, check:

- [ ] Main landing page loads: https://upaddetroit.github.io/times/
- [ ] Issue 2 loads: https://upaddetroit.github.io/times/issues/2026-05-may/
- [ ] Issue 1 loads: https://upaddetroit.github.io/times/issues/2026-03-march/
- [ ] Navigation works between pages
- [ ] All images display correctly
- [ ] Links to other tabs work
- [ ] Mobile responsive (test on phone)

---

## 🆘 Troubleshooting

### Problem: GitHub Pages shows 404
**Solution:** 
- Wait 1-2 minutes after pushing changes
- Check Settings → Pages shows "Your site is published"
- Verify branch is set to "main" and folder is "/" (root)

### Problem: Some files are missing
**Solution:**
- Check you uploaded to the correct folder path
- File names are case-sensitive (use lowercase)
- Refresh the repository page

### Problem: Images not loading
**Solution:**
- Images are embedded as base64 in HTML files
- Check the HTML files uploaded correctly
- File size should be ~5.9MB for index.html and development.html

### Problem: Navigation broken
**Solution:**
- Check relative paths in links
- From issue page, link to root: `../../`
- Between issue pages: `../2026-03-march/`

---

## 📞 Need Help?

If you get stuck:
1. Take a screenshot of the error
2. Email: UPADTimes@gmail.com
3. Or create an Issue in the GitHub repository

---

## 🎉 You're Done!

Once everything is uploaded and GitHub Pages is enabled, your site will be live at:

**https://upaddetroit.github.io/times/**

Share this URL with your community! 🎊
