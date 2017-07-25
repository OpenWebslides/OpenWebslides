export const testDeckContentItemViewTypes = `
  <!DOCTYPE html>
  <html lang="nl">
  <head>
    <title>ContentItemViewTypes</title>
    <meta charset="utf-8">
  </head>
  
  <body class="shower list">
  
<div class="slide">
  <section>
    <h2>This is the main slide heading</h2>
    <p>The main slide heading:</p>
    <ul>
      <li>is located at the top of the slide;</li>
      <li>contains a summary of the slide contents;</li>
    </ul>
    <p data-view-type="course">
      This paragraph contains further information about the main heading. 
      It contains full sentences and in-depth explanation, whereas the 
      bullet points before it only contain the main points. This paragraph should
      not be shown on the slide, but should instead only be visible in course
      view.
    </p>
    <section>
      <h3>This is the first subheading</h3>
      <p>This is some short summary about the first subheading.</p>
      <p data-view-type="course">
        This paragraph contains more in-depth information about the first
        subheading. It should also not be visible on the slide.
      </p>
    </section>
    <section>
      <h3>This is the second subheading</h3>
      <p>This is some short summary about the second subheading.</p>
      <p data-view-type="course">
        This is one more course-view-only paragraph, which contains information
        about the second subheading.
      </p>
    </section>
  </section>
</div>

  </body>
  </html>
`;