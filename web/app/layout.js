import './globals.css';

export const metadata = {
  title: 'Ano Ulam',
  description: 'Get personalized meal suggestions based on what you have at home',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="layout-body">
        {children}
        <footer className="footer">
          <div className="footer-content">
            © {new Date().getFullYear()} What's for Dinner? All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
