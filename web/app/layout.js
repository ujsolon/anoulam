import './globals.css';

export const metadata = {
  title: 'Ano Ulam?',
  description: 'Get personalized meal suggestions based on what you have at home',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
      </body>
    </html>
  )
}