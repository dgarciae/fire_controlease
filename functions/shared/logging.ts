import { Logging } from "@google-cloud/logging";

export type LogDetails = Record<string, any>;

/* **
 * Logging
 * ** */

const REDACT_KEYS = ["password", "token", "accessToken", "refreshToken", "ssn", "email"];

const redact = (obj: LogDetails): LogDetails =>
  Object.entries(obj).reduce(
    (acc, [k, v]) => ({ ...acc, [k]: REDACT_KEYS.includes(k) ? "[REDACTED]" : v }),
    {}
  );

export const logErrors = (
  name: string = "UnnamedError",
  details: LogDetails = {},
  opts: {
    severity?: "ERROR" | "WARNING" | "INFO" | "DEBUG";
    trace?: string;
    requestId?: string;
    userId?: string;
  } = {}
) => {
  const payload = {
    timestamp: new Date().toISOString(),
    service: process.env.K_SERVICE || process.env.FUNCTION_NAME || "unidentified-service",
    severity: opts.severity ?? "ERROR",
    name,
    ...redact(details),
    trace: opts.trace,
    requestId: opts.requestId,
    userId: opts.userId,
  };

  console.error(JSON.stringify(payload));
};

/* **
 * Cloud logging
 * ** */

const PROJECT_ID =
  process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || process.env.PROJECT_ID;
const LOG_NAME = process.env.LOG_NAME ?? "unidentified-logname";
const SERVICE_NAME =
  process.env.K_SERVICE || process.env.FUNCTION_NAME || "unidentified-service";

const loggingClient = new Logging({ projectId: PROJECT_ID });
const log = loggingClient.log(LOG_NAME);

export const logWithCloud = async (
  name: string = "UnnamedError",
  details: LogDetails = {},
  opts: {
    severity?: "ERROR" | "WARNING" | "INFO" | "DEBUG";
    trace?: string;
    requestId?: string;
    userId?: string;
  } = {}
) => {
  try {
    const safeDetails = redact(details);
    const trace =
      opts.trace && PROJECT_ID
        ? `projects/${PROJECT_ID}/traces/${opts.trace}`
        : undefined;

    const metadata: Record<string, any> = {
      resource: {
        type: "cloud_function",
        labels: { function_name: SERVICE_NAME },
      },
      severity: opts.severity ?? "ERROR",
      timestamp: new Date(),
    };

    if (trace) metadata.trace = trace;
    if (opts.requestId)
      metadata["logging.googleapis.com/labels"] = { requestId: opts.requestId };
    if (opts.userId)
      metadata["logging.googleapis.com/labels"] = {
        ...(metadata["logging.googleapis.com/labels"] ?? {}),
        userId: opts.userId,
      };

    const entry = log.entry(metadata, { name, ...safeDetails });
    await log.write(entry);
  } catch (cloudErr) {
    console.error("Cloud logging failed", {
      error: (cloudErr as any)?.message ?? cloudErr,
      originalLogName: name,
    });
  }
};
