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
