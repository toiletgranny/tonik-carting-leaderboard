import { PageShell } from '@/components/PageShell';
import { SkeletonLoadingRow } from '@/components/SkeletonLoadingRow';

export default function Loading() {
  return (
    <PageShell headerTitle="" headerIsLoading>
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonLoadingRow key={index} />
      ))}
    </PageShell>
  );
}