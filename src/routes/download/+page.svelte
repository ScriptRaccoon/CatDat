<script lang="ts">
	import MetaData from '$components/MetaData.svelte'

	/**
	 * This is (temporarily) recorded to see if this feature is used at all.
	 */
	async function record_download() {
		await fetch(`/api/user_action`, {
			method: 'POST',
			body: JSON.stringify({ action: 'download_database' }),
			headers: { 'Content-Type': 'application/json' },
		})
	}
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

<a href="/databases/catdat-snapshot.db" class="button" download onclick={record_download}>
	Download CatDat database
</a>

<h3>Example Queries</h3>

<pre>-- List of tables
.tables
</pre>

<pre>-- Schema of structures table
.schema structures
</pre>

<pre>-- Number of categories
SELECT COUNT(*) FROM categories;
</pre>

<pre>-- Categories without an nLab link
SELECT id, name FROM structures
WHERE type = 'category' AND nlab_link IS NULL;
</pre>

<pre>-- Structures involving rings
SELECT id, name, type FROM structures WHERE name LIKE '%ring%';
</pre>

<pre>-- Finite categories
SELECT structure_id FROM property_assignments
WHERE type = 'category' AND property_id = 'finite'
AND is_satisfied = TRUE;
</pre>

<pre>-- Categories without a generating set
SELECT structure_id FROM property_assignments
WHERE type = 'category' AND property_id = 'generating set'
AND is_satisfied = FALSE;
</pre>

<pre>-- Abelian categories that are not cocomplete
SELECT a.structure_id
FROM property_assignments a
CROSS JOIN property_assignments b
WHERE a.type = 'category'
AND a.structure_id = b.structure_id
AND a.property_id = 'abelian' AND a.is_satisfied = TRUE
AND b.property_id = 'cocomplete' AND b.is_satisfied = FALSE;
</pre>

<pre>-- Number of categories per tag
SELECT tag, count(structure_id) AS tagged_categories
FROM structure_tag_assignments
WHERE type = 'category'
GROUP BY tag
ORDER BY tagged_categories DESC;
</pre>

<pre>-- Properties without a dual
SELECT id, type FROM properties WHERE dual_property_id IS NULL;
</pre>

<pre>-- Self-dual properties
SELECT id, type FROM properties WHERE id = dual_property_id;
</pre>

<pre>-- Properties not invariant under equivalences
SELECT id, type FROM properties WHERE invariant_under_equivalences = FALSE;
</pre>

<pre>-- Properties of categories without related properties
SELECT p.id FROM properties p
LEFT JOIN related_properties r
ON r.property_id = p.id
WHERE p.type = 'category' AND r.related_property_id IS NULL;
</pre>

<pre>-- Equivalent characterizations
SELECT assumptions, conclusions FROM implications_view
WHERE type = 'category' AND is_equivalence = TRUE;
</pre>

<pre>-- Top 5 implications of categories with the most assumptions
SELECT assumptions, conclusions FROM implications_view
WHERE type = 'category'
ORDER BY json_array_length(assumptions) DESC LIMIT 5;
</pre>

<pre>-- Trivial proofs
SELECT structure_id, type, property_id, is_satisfied, proof
FROM property_assignments
WHERE proof = 'This is trivial.';
</pre>

<pre>-- Top 10 longest proofs
SELECT structure_id, type, property_id, is_satisfied, proof
FROM property_assignments
ORDER BY length(proof) DESC LIMIT 10;
</pre>

<pre>-- Top 10 properties with the most undecided categories
SELECT p.id AS property_id, COUNT(s.id) AS undecided_categories
FROM properties p
CROSS JOIN structures s
LEFT JOIN property_assignments pa
ON pa.structure_id = s.id AND pa.property_id = p.id
WHERE p.type = 'category' AND pa.property_id IS NULL
AND s.type = 'category'
GROUP BY p.id
ORDER BY undecided_categories DESC LIMIT 10;
</pre>

<pre>-- Properties which cannot be decided for a given structure
SELECT structure_id, type, property_id, proof
FROM property_assignments
WHERE is_satisfied IS NULL;
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
