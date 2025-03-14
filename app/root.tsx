import { captureRemixErrorBoundaryError } from "@sentry/remix";
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  useRouteError,
} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Convert Youtube Clip to an Audio File" },
    {
      property: "og:title",
      content: "Convert Youtube Clip to an Audio File",
    },
    {
      property: "og:description",
      content: "Convert Youtube Clip to an Audio File",
    },
    {
      property: "og:image",
      content: "/assets/background.jpg",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      name: "description",
      content: "광고 일절 없는 유튜브 -> 오디오 컨버터",
    },
  ];
};

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export default function App() {
  return (
    <html>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-THZGX4VX');`,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-89XDGJW42G"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-89XDGJW42G');`,
          }}
        />
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "5218bdafd7b847e5b591e359a536842f"}'
        ></script>
      </head>
      <body style={{ margin: 0, padding: 0, position: "relative" }}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-THZGX4VX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
