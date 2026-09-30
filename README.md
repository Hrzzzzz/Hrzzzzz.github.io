# Personal Website

A dependency-free personal website template that can be deployed directly to
GitHub Pages.

## Local Preview

Open `index.html` directly, or run the following command in this directory:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Customization

1. Open `index.html`, search for `TODO`, and replace the placeholder name,
   biography, academic history, research themes, publications, and contact details.
2. Edit the color variables at the top of `styles.css` to change the theme.
3. Save your academic CV as `assets/resume.pdf`.
4. Replace every instance of `your-username` with your GitHub username.

The previous Chinese copy is preserved in `locales/zh-CN.json`. It is not loaded
or displayed by the website.

## Deploy to GitHub Pages

1. Create a repository on GitHub. For a root-level personal site, name it
   `your-username.github.io`.
2. Upload this project:

   ```bash
   git add .
   git commit -m "Create personal website"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repository.git
   git push -u origin main
   ```

3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` directory, then click **Save**.

After a few minutes, the site will be available at:

- `https://your-username.github.io` for a `your-username.github.io` repository.
- `https://your-username.github.io/your-repository` for any other repository name.

## Project Structure

```text
.
├── index.html          # Page content
├── styles.css          # Theme, responsive layout, and dark mode
├── script.js           # Navigation, theme toggle, and scroll effects
├── locales/
│   └── zh-CN.json      # Inactive Chinese copy for future localization
└── assets/             # Academic CV and optional supporting files
```
