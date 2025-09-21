import { Lease } from "../../../../domain";

export function FilesTab({ urls }: { urls: Lease["contract"]["files"] | undefined }) {
  console.log(urls);
  return <div>Files Tab Content</div>;
}
