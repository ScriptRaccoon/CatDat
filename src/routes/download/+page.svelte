<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
</script>

<MetaData title="Download" description="Download CatDat's SQLite database" />

<h2>Download</h2>

<p>
	<i>CatDat</i> is built on a
	<a href="https://sqlite.org/" target="_blank">SQLite database</a>. You can download a
	snapshot of it below and inspect the data in your terminal or with any database tool
	of your choice.
</p>

<p>
	This is intended for advanced users. It is useful if you want to explore the data
	beyond what is available through the web application.
</p>

<a href="/databases/catdat-snapshot.db" class="button" download>
	Download CatDat database
</a>

<h3>Example Queries</h3>

<pre>-- List of tables
.tables
</pre>

<pre>-- Schema of categories table
.schema categories
</pre>

<pre>-- Number of categories
SELECT COUNT(*) FROM categories;
</pre>

<pre>-- Categories without an nLab link
SELECT id, name FROM categories WHERE nlab_link IS NULL;
</pre>

<pre>-- Categories involving rings
SELECT id, name FROM categories WHERE name LIKE '%ring%';
</pre>

<pre>-- Finite categories
SELECT category_id FROM category_property_assignments
WHERE property_id = 'finite' AND is_satisfied = TRUE;
</pre>

<pre>-- Categories without a generating set
SELECT category_id FROM category_property_assignments
WHERE property_id = 'generating set' AND is_satisfied = FALSE;
</pre>

<pre>-- Properties without a dual
SELECT id FROM properties WHERE dual_property_id IS NULL;
</pre>

<pre>-- Properties not invariant under equivalences
SELECT id FROM properties WHERE invariant_under_equivalences = FALSE;
</pre>

<pre>-- Equivalences
SELECT assumptions, conclusions FROM implications_view
WHERE is_equivalence = TRUE;
</pre>

<pre>-- Top 5 implications with the most assumptions
SELECT assumptions, conclusions FROM implications_view
ORDER BY json_array_length(assumptions) DESC LIMIT 5;
</pre>

<pre>-- Trivial proofs
SELECT category_id, property_id, is_satisfied, reason
FROM category_property_assignments
WHERE reason = 'This is trivial.';
</pre>

<pre>-- Top 10 longest proofs
SELECT category_id, property_id, is_satisfied, reason
FROM category_property_assignments
ORDER BY length(reason) DESC LIMIT 10;
</pre>

<pre>-- Top 10 properties with the most undecided categories
SELECT
	p.id AS property_id,
	COUNT(c.id) AS undecided_categories
FROM properties p
CROSS JOIN categories c
LEFT JOIN category_property_assignments cp
	ON cp.category_id = c.id
	AND cp.property_id = p.id
WHERE cp.property_id IS NULL
GROUP BY p.id
ORDER BY undecided_categories DESC LIMIT 10;
</pre>

<style>
	pre {
		font-size: 0.875rem;
		white-space: pre-wrap;
		margin-bottom: 1rem;
	}

	pre::first-line {
		color: var(--accent-color);
	}
</style>
