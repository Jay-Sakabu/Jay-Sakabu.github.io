---
layout: page
title: Projects
eyebrow: Selected work
heading: Things I've built
subtitle: Small tools with one goal each, kept simple on purpose.
permalink: /project/
---

<div class="project-list">
{% for p in site.data.projects %}{% include project-card.html project=p %}{% endfor %}
</div>
