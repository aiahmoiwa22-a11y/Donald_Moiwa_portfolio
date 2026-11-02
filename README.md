# Donald Moiwa — portfolio

A hand-built static site (HTML, CSS, JavaScript). No build step: open `index.html` or push to GitHub Pages.

## Updating your content

Everything on the page comes from **`assets/js/content.js`**. Edit that file only.

- **Add a project:** copy one of the objects in `projects`, change its fields. Order in the file = order on the page; the first one is shown large.
- **Add a screenshot:** put `my-project.jpg` (and optionally `my-project.webp`) in `assets/img/`, then set `image: "assets/img/my-project"` (no extension if you have both, or the full filename).
- **Add your CV:** put the PDF in `assets/`, set `person.resume: "assets/your-cv.pdf"`. Download buttons appear automatically.
- **Experience, education, certifications, testimonials:** fill in the example entry and delete its `draft: true` line. Empty sections stay hidden.
- **Preview drafts:** open the site with `?preview` at the end of the URL.

## Contact form

Messages go through [FormSubmit](https://formsubmit.co) to the email in `contact.endpoint`. The first message ever sent triggers a one-time confirmation email to that address. Click the link in it, and from then on messages arrive normally.

## Files

- `index.html` – page structure and SEO tags
- `assets/css/styles.css` – design system (colours, type, layout)
- `assets/js/content.js` – your content
- `assets/js/main.js` – rendering and interactions
- `assets/js/icons.js` – icon set
- `images/` – your original photos (not used directly; optimised copies are in `assets/img/`)
