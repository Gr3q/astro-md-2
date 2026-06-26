import { satteri } from '@astrojs/markdown-satteri'
import { shared } from './shared.js'
import { HTMLString } from 'astro/runtime/server/index.js'

// shared.markdownConfig.processor isn't set until astro:config:done,
// but this file gets imported during config resolution.
let rendererPromise

function getRenderer() {
	const { processor = satteri() } = shared.markdownConfig
	return (rendererPromise ??= processor.createRenderer(shared.markdownConfig))
}

export async function markdown(
	/** @type {string} */ content,
	/** @type {MarkdownRenderOptions} */ options = null
) {
	const processor = await getRenderer()
	const result = await processor.render(content, options)

	return new HTMLString(result.code)
}

markdown.inline = async function inlinemarkdown(
	/** @type {string} */ content,
	/** @type {MarkdownRenderOptions} */ options = null
) {
	const processor = await getRenderer()
	const result = await processor.render(content, options)

	const code = result.code.trim()
	return new HTMLString(
		code.startsWith('<p>') && code.endsWith('</p>') ? code.slice(3, -4) : code
	)
}

/** @typedef {import('./markdown').MarkdownRenderOptions} MarkdownRenderOptions */
