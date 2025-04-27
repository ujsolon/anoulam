import './globals.css';

export const metadata = {
  title: 'Ano Ulam',
  description: 'Get personalized meal suggestions based on what you have at home',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="py-6 bg-gray-100 mt-auto">
          <div className="container mx-auto px-5 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} What's for Dinner? All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}