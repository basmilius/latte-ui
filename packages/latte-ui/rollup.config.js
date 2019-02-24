/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import devConfig from "./rollup.dev.config";
import prodConfig from "./rollup.prod.config";

export default cla => cla.configDebug === true ? devConfig : prodConfig;
