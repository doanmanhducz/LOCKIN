---
title: 'PhishFusion: A Multimodal Phishing Detection Framework Using Joint URL and JavaScript Features'
description: 'A multimodal phishing detection framework combining raw URLs, structured URL features, and JavaScript code.'
publishedAt: 2026-04-01
type: 'Paper Notes'
tags: ['phishing', 'machine-learning', 'javascript']
draft: false
featured: true
coverLabel: 'ACIIDS 2026'
---

I keep returning to phishing because the signal is rarely in one place. A URL can look ordinary while the JavaScript tells a different story; a page can imitate the right surface while carrying the wrong intent.

## Why I cared

I wanted to treat those fragments as one problem rather than force them into separate detectors.

## The question

Can a model look at raw URLs, structured URL features, and JavaScript together without flattening the useful differences between them?

## What the work explores

PhishFusion joins Transformer, DNN, and CodeBERT branches through late fusion. The point is not that one signal wins; it is that the signals can challenge each other before the final decision.

## What I would keep investigating

The interesting part is what happens when attackers learn the model's habits. Robust detection should be suspicious of its own confidence.

## Source

Presented at the Asian Conference on Intelligent Information and Database Systems (ACIIDS) 2026. A public source link will be added when available.
