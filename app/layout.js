import "@/app/globals.css"

export default function RootLayout({ children }) {
  return (
    (<html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-tomorrow.min.css"
          rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet" />
      </head>
      <body className="font-sans">{children}</body>
    </html>)
  );
}

