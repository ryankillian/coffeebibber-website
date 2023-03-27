export const includesFilter = ({ filterValue, value }: { filterValue: string; value: string }) => {
	if (!filterValue) return true;
	const strValue = String(value).toLowerCase();
	const strFilter = String(filterValue).toLowerCase();
	return strValue.includes(strFilter);
};
