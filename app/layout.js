import './globals.css'

export const metadata = {
  metadataBase: new URL('https://caravan72.com'),
  title: {
    default: 'Caravan 72 | Hajj & Umrah Services',
    template: '%s | Caravan 72'
  },
  description: 'Experience the spiritual journey of a lifetime with Caravan 72. Your trusted partner for Hajj and Umrah services.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Caravan 72 | Hajj & Umrah Services',
    description: 'Experience the spiritual journey of a lifetime with Caravan 72. Your trusted partner for Hajj and Umrah services.',
    url: 'https://caravan72.com',
    siteName: 'Caravan 72',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Caravan 72 Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}