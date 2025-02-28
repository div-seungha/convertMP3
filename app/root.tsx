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
