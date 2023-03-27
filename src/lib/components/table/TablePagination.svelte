<script lang="ts">
	import type { PaginationState } from 'svelte-headless-table/lib/plugins/addPagination';
	export let page: PaginationState;
	export let rowCount: number;

	const { pageSize, pageIndex, pageCount, hasPreviousPage, hasNextPage } = page;

	function goToFirstPage() {
		$pageIndex = 0;
	}

	function goToPreviousPage() {
		$pageIndex--;
	}

	function goToNextPage() {
		$pageIndex++;
	}

	function goToLastPage() {
		$pageIndex = $pageCount - 1;
	}
	$pageSize = 5;
</script>

<nav>
	<ul>
		<li>
			<a href="/" on:click|preventDefault={goToFirstPage} class:disabled={!$hasPreviousPage}
				>{'<<'}</a
			>
		</li>
		<li>
			<a href="/" on:click|preventDefault={goToPreviousPage} class:disabled={!$hasPreviousPage}
				>{'<'}</a
			>
		</li>
	</ul>
	<ul>
		<li>{$pageIndex + 1} of {$pageCount} pages</li>
	</ul>
	<ul>
		<li>
			<a href="/" on:click|preventDefault={goToNextPage} class:disabled={!$hasNextPage}>{'>'}</a>
		</li>
		<li>
			<a href="/" on:click|preventDefault={goToLastPage} class:disabled={!$hasNextPage}>{'>>'}</a>
		</li>
	</ul>
</nav>

<div class="rows">
	<div>
		Showing
		{$pageIndex * $pageSize + 1}
		to
		{Math.min(rowCount, $pageIndex * $pageSize + $pageSize)}
		of
		{rowCount}
		results
	</div>
	<div class="sizes">
		<span>Rows per page:</span>
		<a href="/" on:click|preventDefault={() => ($pageSize = 5)} class:disabled={$pageSize == 5}>5</a
		>
		<a href="/" on:click|preventDefault={() => ($pageSize = 10)} class:disabled={$pageSize == 10}
			>10</a
		>
		<a href="/" on:click|preventDefault={() => ($pageSize = 20)} class:disabled={$pageSize == 20}
			>20</a
		>
		<a href="/" on:click|preventDefault={() => ($pageSize = 50)} class:disabled={$pageSize == 50}
			>50</a
		>
		<a href="/" on:click|preventDefault={() => ($pageSize = 500)} class:disabled={$pageSize == 500}
			>500</a
		>
	</div>
</div>

<style>
	.rows {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 1em;
		padding-bottom: 2em;
	}
	@media (min-width: 720px) {
		.rows {
			flex-direction: row;
			justify-content: space-between;
		}
	}
	.sizes {
		display: flex;
		gap: 1em;
	}
	.sizes a {
		text-decoration: none;
	}
	a.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
