# Tailwind CSS Setup Instructions

To install and initialize Tailwind CSS in your project, follow these steps:

1. **Uninstall any existing versions of Tailwind CSS, PostCSS, and Autoprefixer:**
   ```bash
   npm uninstall tailwindcss postcss autoprefixer
   ```

2. **Install specific versions of Tailwind CSS, PostCSS, and Autoprefixer as dev dependencies:**
   ```bash
   npm install -D tailwindcss@3.4.3 postcss@8.4.38 autoprefixer@10.4.19
   ```

3. **Initialize Tailwind CSS and PostCSS configuration files:**
   ```bash
   npx tailwindcss init -p
   ```

> **Note:**  
> These steps will set up Tailwind CSS with compatible versions and generate the required `tailwind.config.js` and `postcss.config.js` files in your project root.

