import { PageTransition } from '@wmt/ui';

export default function MainTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
