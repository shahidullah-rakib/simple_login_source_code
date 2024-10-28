import { UserAgentProvider } from '../components/providers/userAgentProvider';
import './globals.css';
import { Layout } from '@/components/layout';

const RootLayout: React.FC<{
  children: React.ReactNode;
  userAgent: string | undefined;
}> = async ({ children }) => {
  const userAgent = await fetchUserAgent();

  return (
    <html lang="en">
      <body>
        <UserAgentProvider userAgent={userAgent}>
          <Layout>{children}</Layout>
        </UserAgentProvider>
      </body>
    </html>
  );
};

async function fetchUserAgent() {
  if (typeof window === 'undefined') {
    const userAgent = await getRequestHeaders();
    return userAgent['user-agent'] || undefined;
  }
  return navigator.userAgent;
}

async function getRequestHeaders() {
  return {
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  };
}

export default RootLayout;
