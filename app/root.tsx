import { Links, Meta, Outlet, Scripts } from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0, padding: 0, position: "relative" }}>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
