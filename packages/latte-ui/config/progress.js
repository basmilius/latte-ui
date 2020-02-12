/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

const readline = require("readline");

let isFirst = true;

function handleProgress(percentage, message, ...args)
{
	const percentageString = (percentage * 100)
		.toFixed(0)
		.padStart(3, " ") + "%";

	if (!isFirst)
	{
		readline.clearLine(process.stdout, 1);
		readline.cursorTo(process.stdout, 0);
	}

	process.stdout.write(`${percentageString} [${message}] ${args[0] || ""}`);

	if (percentage >= 1)
		process.stdout.write("\n");

	isFirst = false;
}

module.exports = handleProgress;
