# Proofs in CatDat

CatDat contains thousands of proofs. This note explains why we often write them down instead of only citing references, how AI is used to produce them, and why none of them claims to be original.

## Literature

Some proofs in CatDat are routine checks, while others are very involved. Sometimes we merely cite a reference (a book, research paper, or online post) that contains the proof. But often we write down the proof ourselves, even when a suitable reference might exist. There are several reasons for this.

First, it is often very hard to find a suitable reference, in particular for non-trivial results. Second, even when a reference exists, it may be inaccessible: many people have no university affiliation and therefore no access to paywalled publications, and online references may disappear at some point. A proof in CatDat itself, in contrast, is accessible to everybody and stays available. Third, readers do not have to look up the argument elsewhere: they see it right away.

When a proof written down in CatDat follows a published argument or construction, we still credit the source. Sometimes we even give two different proofs of a result, such as a citation and a direct argument, or two direct arguments.

The aim of CatDat is to collect as many properties of categories and other categorical structures as possible, together with their proofs. It does not try to determine who first proved a result and where it was published. Instead, CatDat wants to be a canonical source in its own right, and its main focus is to make proofs accessible to everybody.

If you know a source that we have missed, please [contribute](/CONTRIBUTING.md) it so that we can credit it.

## AI usage

In the first months of CatDat, all proofs were written by hand. Since then, many proofs have been generated with the help of AI. As required by the [contribution guidelines](/CONTRIBUTING.md), every AI-generated proof is checked thoroughly by the contributor who submits it, and they take full responsibility for it. Readers can therefore trust that a human has verified every proof (though mathematicians can make mistakes as well, of course).

Within these guidelines, every contributor decides for themselves to what extent they use AI. In the rest of this section, I (Martin, the creator of CatDat) describe how I use AI.

At first, I only used AI for isolated questions and for proofreading my texts, since English is not my native language. Later, it became clear that some properties are very hard to decide for some categories, and I started using AI to complete such proofs. Over time, I relied on AI more and more and experimented with different tools.

In the fall of 2026, I finally decided to let **Claude Code** generate every proof and every line of application code. This boosted my productivity enormously. Much more importantly, it enabled me to contribute proofs that would otherwise not have been found anytime soon. To reiterate: I check and question everything Claude Code does, and I usually revise its proofs, which I also do by prompting Claude Code rather than editing the text myself. Claude Code has also helped me find errors, inaccuracies, and typos in many of the existing handwritten proofs.

This workflow relies on several [skills](.claude/skills) and [rules](.claude/rules) for Claude Code, which are based on my earlier manual work. In other words, I have taught Claude Code, and keep teaching it, how to work on CatDat.

Admittedly, I could have found and written down some of the proofs that Claude Code provides by hand. But it is much easier to let Claude Code do everything, and it saves the step of having AI proofread texts I write by hand. Since the goal is to make proofs accessible, the means of achieving it are secondary. Besides, checking and revising Claude's contributions requires all of my mathematical skills anyway.

Many other proofs found by Claude Code are highly non-trivial and would even have deserved publication as research papers, at least in the pre-AI era. One of many examples is the [characterization of when epimorphisms of locally ringed spaces are product-stable](https://catdat.app/content/LRS-product-stable-epis). As is typical, Claude Code generated the proof within minutes, while understanding and revising it took me several hours. I can vouch for every detail of it, even though I did not write a single line myself.

I also use Claude Code for every change to the application code, and for complex changes, I first work out a plan with it. I could certainly make all of these changes by hand, since Svelte and SQLite are much less complicated than category theory. Still, Claude Code makes the work easier and faster, and it tends to cover edge cases that I would not have thought of.

Let me finish by saying that I am absolutely amazed by what Claude Code can do.

## Originality

As the previous sections suggest, no proof in CatDat claims to be original. Some of them prove standard facts, and others might reprove results from an obscure publication of decades ago. For AI-generated proofs, moreover, we cannot tell which training data they draw on. After all, the goal of CatDat is not originality, but accessibility.
