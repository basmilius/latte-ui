/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

declare interface LatteUIDataTableResponse
{
	actions: ActionDefinition[];
	columns: ColumnDefinition[];
	initial_data?: any;
	limit?: number;
	offset?: number;
	sorting?: {
		by: string;
		order: "ASC" | "DESC";
	};
}

declare interface LatteUIDataTableOptions extends LatteUIDataTableResponse
{
	requestData: Function;
}

interface ActionDefinition
{
	template: string;
}

interface ColumnDefinition
{
	field: string;
	is_searchable: boolean;
	is_sortable: boolean;
	label: string;
	template: string;
	width: number;
}
