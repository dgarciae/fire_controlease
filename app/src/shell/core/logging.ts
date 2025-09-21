/// <reference types="vite/client" />

const LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL;

interface LogParams {
  caller: string;
  data: object[] | object;
}

export const log = ({ caller, data }: LogParams) => {
  if (LOG_LEVEL > "20") return;
  console.log("********************************************");
  console.log("caller: ", caller);
  console.log(data);
  console.log("********************************************");
};
