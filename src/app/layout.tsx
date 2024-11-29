import "ress";
import "@/styles/globals.scss";
import AppProvider from "@/providers/AppProvider";
import Layout from "@/components/layout/layout";
import Web3Provider from "@/providers/Web3Provider";
import ReduxProvider from "@/states/global/provider";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <ReduxProvider>
            <AppProvider>
              <Layout>{children}</Layout>
            </AppProvider>
          </ReduxProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
