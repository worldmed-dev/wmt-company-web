import { PageTransition } from '@wmt/ui';

export default function CareerTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
