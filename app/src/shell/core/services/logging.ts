const LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL;

interface LogParams {
  caller: string;
  data: object[] | object | string;
}

export const log = ({ caller, data }: LogParams) => {
  if (LOG_LEVEL > "20") return;
  console.log("********************************************");
  console.log("caller: ", caller);
  console.log(data);
  console.log("********************************************");
};

export const logError = ({ caller, data }: LogParams) => {
  if (LOG_LEVEL > "20") return;
  console.info("********************************************");
  console.log("caller: ", caller);
  console.error(data);
  console.info("********************************************");
};
