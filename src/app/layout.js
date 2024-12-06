import "./globals.css";
import { GlobalStateProvider } from "../Context/page";
import { AuthProvider } from "../Context/auth";
import { FluentCProvider } from "../Context/fluentc";
import DOMPurify from 'isomorphic-dompurify';

export default function RootLayout({ children }) {
  const unsafeHTML = "<script>alert('XSS');</script>";
  const cleanHTML = DOMPurify.sanitize(unsafeHTML);
  console.log('Sanitized HTML:', cleanHTML);
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        ></link>

        {/* <script src="https://widget.fluentc.io/fluentcWidget.min.js"></script> */}
        <script src="https://widget.fluentc.io/fluentcWidgetV2.min.js"></script>
      </head>
      <body className="min-h-[100vh]">
        <GlobalStateProvider>
          <FluentCProvider>
            <AuthProvider>
              {/* Render the sanitized HTML */}
              <div dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>
              {children}
            </AuthProvider>
          </FluentCProvider>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
