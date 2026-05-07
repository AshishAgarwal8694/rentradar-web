import './globals.css'

export const metadata = {
  title: 'RentRadar — Never Miss a Rental Again',
  description: 'Instant alerts for new rentals in Sydney. Be first, every time.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}