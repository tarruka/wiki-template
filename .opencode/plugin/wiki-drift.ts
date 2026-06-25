import path from "node:path";
import fs from "node:fs";
import type { Plugin } from "@opencode-org/plugin";

interface ToolOutput {
  result?: unknown;
  error?: unknown;
  args?: {
    file_path?: string;
    oldString?: string;
    newString?: string;
    old?: string;
    new?: string;
  };
}

interface ToolInput {
  tool_name: string;
  tool_input: Record<string, unknown>;
}

function loadPatterns(configPath: string): string[] {
  try {
    const text = fs.readFileSync(configPath, "utf-8");
    const match = text.match(/##\s*Sensitive paths(.*?)(?:\n##\s|\n#|\Z)/is);
    if (!match) return [];
    const patterns: string[] = [];
    for (const line of match[1].split("\n")) {
      const trimmed = line.trim().replace(/^`|`$/g, "");
      if (!trimmed || trimmed.startsWith("#")) continue;
      const glob = trimmed.split("→")[0].trim();
      if (!glob.includes("/") && !glob.endsWith(".ts")) continue;
      const rx = glob
        .replace(/\./g, "\\.")
        .replace(/\*\*/g, ".*")
        .replace(/\*/g, "[^/]*");
      patterns.push(rx);
    }
    return patterns;
  } catch {
    return [];
  }
}

function matchPath(relPath: string, patterns: string[]): boolean {
  for (const p of patterns) {
    const re = new RegExp("^" + p + "$");
    if (re.test(relPath)) return true;
  }
  return false;
}

export default (async ({ directory }) => {
  return {
    "tool.execute.after": async (
      input: ToolInput,
      output: ToolOutput & { additional_context?: string }
    ) => {
      const toolName = input.tool_name;
      if (toolName !== "Edit" && toolName !== "Write" && toolName !== "MultiEdit")
        return;

      const filePath = input.tool_input?.file_path as string | undefined;
      if (!filePath) return;

      const rel = path.relative(directory, filePath);
      const configPath = path.join(directory, "wiki", "CONFIG.md");
      const patterns = loadPatterns(configPath);

      if (!matchPath(rel, patterns)) return;

      const existing = output.additional_context ?? "";
      const msg =
        `📚 Wiki: editó un path trackeado (${rel}). ` +
        `Si el cambio altera comportamiento documentado, corrija la skill ` +
        "`wiki-ingest` para integrarlo a los dossiers afectados.";

      output.additional_context = existing ? `${existing}\n\n${msg}` : msg;
    },
  };
}) satisfies Plugin;