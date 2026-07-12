# My Certifications

A beautiful, interactive website to display all your professional certifications in one place.

## Features

✨ **Modern Design** - Clean, responsive interface that looks great on all devices
🔍 **Search & Filter** - Easily find certifications by name or issuer
📊 **Statistics** - View counts of total, active, and expired certifications
🔄 **Real-time Updates** - Simply update `data.json` to refresh the website
📱 **Mobile Responsive** - Fully responsive design for mobile, tablet, and desktop
🎨 **Customizable** - Easy to customize colors, icons, and styling

## Setup

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` as the source
   - Your site will be available at `https://realkevo.github.io/certifications/`

2. **Add Your Certifications**
   - Edit `data.json`
   - Add your certifications following the format below
   - Save and commit the changes

## Data Format

Edit `data.json` to add your certifications:

```json
{
  "certifications": [
    {
      "title": "Certification Name",
      "issuer": "Issuing Organization",
      "icon": "🎓",
      "issueDate": "2023-06-15",
      "expiryDate": "2026-06-15",
      "description": "A brief description of what this certification covers",
      "link": "https://link-to-certificate-or-verification"
    }
  ]
}
```

### Field Descriptions

- **title** (required): The name of the certification
- **issuer** (required): The organization that issued the certification
- **icon** (optional): An emoji to represent the certification (default: 🎓)
- **issueDate** (optional): When the certification was issued (YYYY-MM-DD format)
- **expiryDate** (optional): When the certification expires (YYYY-MM-DD format). Leave empty for lifetime certifications
- **description** (optional): A brief description of the certification
- **link** (optional): URL to verify or view the certificate

## Customization

### Change Colors

Edit `styles.css` and update the color values:
- Primary color: `#667eea`
- Secondary color: `#764ba2`

### Change Header

Edit `index.html` to update the header title and subtitle.

### Change Icons

Use any emoji or Unicode character for the `icon` field in `data.json`.

## Example Certifications

The repository comes with sample certifications. Replace them with your own:

```json
{
  "title": "Your Certification Name",
  "issuer": "Your Organization",
  "icon": "🏆",
  "issueDate": "2024-01-15",
  "expiryDate": "2027-01-15",
  "description": "Your certification description",
  "link": "https://your-certificate-link.com"
}
```

## Features in Detail

### Search
Use the search box to filter certifications by title, issuer, or description.

### Filters
- **All** - Shows all certifications
- **Active** - Shows only non-expired certifications
- **Expired** - Shows only expired certifications

### Statistics
The dashboard shows:
- Total number of certifications
- Number of active certifications
- Number of expired certifications

## File Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # Functionality
├── data.json           # Your certification data
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to use this for your own certifications website!

## Tips

- Keep certifications sorted by date (newest first) for better presentation
- Use relevant emojis that represent each certification
- Add descriptive text to help visitors understand each certification
- Include links to verify your credentials when possible

---

Made with ❤️ for showcasing your professional achievements
