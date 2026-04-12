<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:shopify-agent-rules -->
# Shopify: always use MCP + skills

For anything Shopify-related, you MUST:
1. Use the `shopify-dev-mcp` MCP server for API references, docs lookups, and dev tooling.
2. Load and apply any available Shopify skills before writing code or giving advice.

Do this automatically — do not wait to be asked.
<!-- END:shopify-agent-rules -->