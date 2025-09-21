export type CommitSuccess = { chunkIndex: number; success: true; ids: string[] };
export type CommitFailure = {
  chunkIndex: number;
  success: false;
  ids: string[];
  error: any;
};
export type CommitResult = CommitSuccess | CommitFailure;
