import { convertToData, convertToHtml } from "./block/api";

const MANGLE_SHIFT = 65565;

/**
 * Converts binary to our block structure.
 *
 * @param {Uint8Array} bin
 *
 * @returns {{data: BlockInstance, html: String}}
 * @author Bas Milius <bas@mili.us>
 * @since 1.9.0
 */
export function convertFromBin(bin)
{
	bin = bin.map(b => b - MANGLE_SHIFT);

	const decoder = new TextDecoder();
	const json = decoder.decode(bin);

	return JSON.parse(json);
}

/**
 * Converts the block structure to binary.
 *
 * @param {BlockInstance} root
 *
 * @returns {Uint8Array}
 * @author Bas Milius <bas@mili.us>
 * @since 1.9.0
 */
export function convertToBin(root)
{
	const data = convertToData(root);
	const html = convertToHtml(root);
	const json = JSON.stringify({data, html});

	const encoder = new TextEncoder();
	const bin = encoder.encode(json);

	return bin.map(b => b + MANGLE_SHIFT);
}
