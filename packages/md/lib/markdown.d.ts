import type { MarkdownRenderOptions, MarkdownRenderResult } from 'astro/markdown'

export type { MarkdownRenderOptions, MarkdownRenderResult }

export var markdown: {
	(
		content: string,
		options?: MarkdownRenderOptions
	): Promise<string>

	inline(
		content: string,
		options?: MarkdownRenderOptions
	): Promise<string>
}
