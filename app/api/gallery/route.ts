import path from "node:path"
import { promises as fs } from "node:fs"

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]) as const

function sanitizeSubPath(input: string): string {
  // Remove leading slashes and normalize to prevent path traversal
  const withoutLeading = input.replace(/^\/+/, "")
  return path.normalize(withoutLeading)
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const dirParam = url.searchParams.get("dir") || ""
    const subPath = sanitizeSubPath(dirParam)

    const publicRoot = path.join(process.cwd(), "public")
    const targetDir = path.join(publicRoot, subPath)
    const normalized = path.normalize(targetDir)

    if (!normalized.startsWith(publicRoot)) {
      return new Response(JSON.stringify({ error: "Invalid directory" }), { status: 400 })
    }

    let entries: string[] = []
    try {
      const dirents = await fs.readdir(normalized, { withFileTypes: true })
      entries = dirents
        .filter((d) => d.isFile() && IMAGE_EXTENSIONS.has(path.extname(d.name).toLowerCase()))
        .map((d) => d.name)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    } catch (e) {
      // Directory might not exist yet
      entries = []
    }

    return new Response(JSON.stringify({ files: entries }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to list images" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}


