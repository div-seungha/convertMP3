import { Links, Meta, MetaFunction, Outlet, Scripts } from "@remix-run/react";

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

export default function App() {
  return (
    <html>
      <head>
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
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
