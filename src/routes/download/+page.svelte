<script lang="ts">
	import CodeSnippet from '$components/CodeSnippet.svelte'
	import MetaData from '$components/MetaData.svelte'
	import { PUBLIC_ADMIN_URL } from '$env/static/public'

	/**
	 * This is (temporarily) recorded to see if this feature is used at all.
	 */
	async function record_download() {
		await fetch(`${PUBLIC_ADMIN_URL}/api/user_action`, {
			method: 'POST',
			body: JSON.stringify({ action: 'download_database' }),
			headers: { 'Content-Type': 'application/json' }
		})
	}
</script>

<MetaData title="Download" description="Download CatDat's SQLite database" />

<h1>Download</h1>

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

<h2>Example Queries</h2>

<CodeSnippet language="sql" title="List of tables" code={'.tables'} />

<CodeSnippet
	language="sql"
	title="Schema of structures table"
	code={`.schema structures`}
/>

<CodeSnippet
	language="sql"
	title="Number of categorical structures per type"
	code={`SELECT type, COUNT(*) AS count
FROM structures
GROUP BY type;`}
/>

<CodeSnippet
	language="sql"
	title="Categories without an nLab link"
	code={`SELECT id, name
FROM structures
WHERE type = 'category'
AND nlab_link IS NULL;`}
/>

<CodeSnippet
	language="sql"
	title="Structures involving rings"
	code={`SELECT id, name, type
FROM structures
WHERE name LIKE '%ring%';`}
/>

<CodeSnippet
	language="sql"
	title="Finite categories"
	code={`SELECT structure_id
FROM property_assignments
WHERE type = 'category'
AND property_id = 'finite'
AND is_satisfied = TRUE;`}
/>

<CodeSnippet
	language="sql"
	title="Categories without a generating set"
	code={`SELECT structure_id
FROM property_assignments
WHERE type = 'category'
AND property_id = 'generating set'
AND is_satisfied = FALSE;`}
/>

<CodeSnippet
	language="sql"
	title="Abelian categories that are not cocomplete"
	code={`SELECT a.structure_id
FROM property_assignments a
CROSS JOIN property_assignments b
WHERE a.type = 'category'
AND a.structure_id = b.structure_id
AND a.property_id = 'abelian'
AND a.is_satisfied = TRUE
AND b.property_id = 'cocomplete'
AND b.is_satisfied = FALSE;`}
/>

<CodeSnippet
	language="sql"
	title="Top 20 categories with the most unsatisfied properties"
	code={`SELECT
    structure_id AS category,
    count(property_id) AS count
FROM property_assignments
WHERE is_satisfied = FALSE
AND type = 'category'
GROUP BY structure_id
ORDER BY count
DESC LIMIT 20;`}
/>

<CodeSnippet
	language="sql"
	title="Categories with unknown regular epimorphisms"
	code={`SELECT s.id
FROM structures s
WHERE s.type = 'category'
AND NOT EXISTS (
    SELECT 1 FROM special_morphism_assignments a
    WHERE a.category_id = s.id
    AND a.type = 'regular epimorphisms'
);`}
/>

<CodeSnippet
	language="sql"
	title="Number of categories per tag"
	code={`SELECT
    tag,
    COUNT(structure_id) AS tagged_categories
FROM structure_tag_assignments
WHERE type = 'category'
GROUP BY tag
ORDER BY tagged_categories DESC;`}
/>

<CodeSnippet
	language="sql"
	title="Properties without a dual"
	code={`SELECT id, type
FROM properties
WHERE dual_property_id IS NULL;`}
/>

<CodeSnippet
	language="sql"
	title="Self-dual properties"
	code={`SELECT id, type
FROM properties
WHERE id = dual_property_id;`}
/>

<CodeSnippet
	language="sql"
	title="Properties not invariant under equivalences"
	code={`SELECT id, type
FROM properties
WHERE invariant_under_equivalences = FALSE;`}
/>

<CodeSnippet
	language="sql"
	title="Properties without related properties"
	code={`SELECT p.id, p.type
FROM properties p
WHERE NOT EXISTS (
   SELECT 1 FROM related_properties r
   WHERE r.property_id = p.id
)
ORDER BY p.type;`}
/>

<CodeSnippet
	language="sql"
	title="Number of non-deduced implications per type"
	code={`SELECT type, COUNT(*) AS count
FROM implications
WHERE is_deduced = FALSE
GROUP BY type;`}
/>

<CodeSnippet
	language="sql"
	title="Equivalent characterizations for categories"
	code={`SELECT assumptions, conclusions
FROM implications_view
WHERE type = 'category'
AND is_equivalence = TRUE;`}
/>

<CodeSnippet
	language="sql"
	title="Top 5 implications of categories with the most assumptions"
	code={`SELECT assumptions, conclusions
FROM implications_view
WHERE type = 'category'
ORDER BY json_array_length(assumptions)
DESC LIMIT 5;`}
/>

<CodeSnippet
	language="sql"
	title="Trivial proofs"
	code={`SELECT structure_id, type, property_id, is_satisfied, proof
FROM property_assignments
WHERE proof = 'This is trivial.';`}
/>

<CodeSnippet
	language="sql"
	title="Top 10 longest proofs"
	code={`SELECT structure_id, type, property_id, is_satisfied, length(proof)
FROM property_assignments
ORDER BY length(proof)
DESC LIMIT 10;`}
/>

<CodeSnippet
	language="sql"
	title="Top 10 properties with the most undecided categories"
	code={`SELECT
    p.id AS property_id,
    COUNT(s.id) AS undecided_categories
FROM properties p
CROSS JOIN structures s
LEFT JOIN property_assignments pa
ON pa.structure_id = s.id
AND pa.property_id = p.id
WHERE p.type = 'category'
AND pa.property_id IS NULL
AND s.type = 'category'
GROUP BY p.id
ORDER BY undecided_categories
DESC LIMIT 10;`}
/>

<CodeSnippet
	language="sql"
	title="Properties which cannot be decided for a given structure"
	code={`SELECT structure_id, type, property_id, proof
FROM property_assignments
WHERE is_satisfied IS NULL;`}
/>

<CodeSnippet
	language="sql"
	title="Functors with left adjoints"
	code={`SELECT
    structure_id AS functor,
    associated_structure_id AS left_adjoint
FROM associated_structures
WHERE type = 'functor'
AND label = 'left_adjoint';`}
/>

<CodeSnippet
	language="sql"
	title="Symmetric monoidal categories with their underlying categories"
	code={`SELECT
    structure_id AS symmetric_monoidal_category,
    associated_structure_id AS category
FROM associated_structures
WHERE type = 'symmetric_monoidal_category'
AND label = 'underlying_category';`}
/>

<CodeSnippet
	language="sql"
	title="Types of epimorphisms"
	code={`SELECT property_id
FROM property_tag_assignments
WHERE type = 'morphism'
AND tag = 'types of epimorphisms';`}
/>
