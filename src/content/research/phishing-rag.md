---
title: 'Phishing Website Detection via Multimodal Learning and Retrieval-Augmented Reasoning'
description: 'A research paper combining multimodal phishing detection with retrieval-augmented reasoning.'
publishedAt: 2025-12-01
type: 'Paper Notes'
tags: ['phishing', 'rag', 'llm']
draft: false
featured: true
coverLabel: 'RIVF 2025'
---

The harder a phishing page works to look familiar, the more important it becomes to ask what the model is actually reasoning from. I was interested in whether retrieval could make that reasoning more deliberate.

## Why I cared

Detection is not useful if it cannot explain what persuaded it. The goal was to make the final decision feel less like a black box that happened to be right.

## The question

How can URL, structured features, and HTML work with retrieval-augmented reasoning without making the system slower or less legible?

## What the work explores

The paper combines multimodal signals with selective cross-attention and retrieval-augmented reasoning. Retrieval is reserved for the inputs where extra context has the most to say.

## What I would keep investigating

I would keep testing where explanation turns into decoration. A convincing answer is not automatically a useful one.

## Source

[Read the publication on IEEE Xplore](https://ieeexplore.ieee.org/document/11365186).
