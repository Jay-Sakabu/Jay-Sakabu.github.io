---
layout: page
title: Resumé
eyebrow: Experience
heading: Resumé
subtitle: The one-page version. Grab the PDF or read it right here.
permalink: /resume/
---

<div class="btn-row reveal">
  <a class="btn btn-primary" href="{{ '/assets/JaySakabuResume.pdf' | relative_url }}" download>{% include icon.html name="download" %} Download PDF</a>
  <a class="btn btn-ghost" href="{{ '/assets/JaySakabuResume.pdf' | relative_url }}" target="_blank" rel="noopener">Open in new tab {% include icon.html name="external" %}</a>
</div>

<div class="card resume-frame reveal">
  <object class="resume-pdf" data="{{ '/assets/JaySakabuResume.pdf' | relative_url }}#view=FitH" type="application/pdf" aria-label="Resumé PDF">
    <img src="{{ '/assets/resumescreenshot.png' | relative_url }}" alt="Jay Sakabu's resumé">
  </object>
  <a class="resume-img" href="{{ '/assets/JaySakabuResume.pdf' | relative_url }}">
    <img src="{{ '/assets/resumescreenshot.png' | relative_url }}" alt="Jay Sakabu's resumé" loading="lazy">
  </a>
</div>
