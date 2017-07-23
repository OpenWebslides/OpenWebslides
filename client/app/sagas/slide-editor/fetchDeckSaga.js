import { takeLatest, put /*, call */ } from 'redux-saga/effects';
import { FETCH_DECK, FETCH_DECK_SUCCESS } from 'actions/entities/decks';

import convertToState from 'lib/convert-to-state';
// import fetchDeckApi from 'api/fetchDeckApi';

const testDeckFlames = `
<!DOCTYPE html>
<html lang="nl">
<head>
	<title>Opening up educational content for debate via Web technology</title>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="stylesheet" href="styles/screen-16x10.css" id="style">
	<link rel="stylesheet" href="styles/custom.css">
</head>

<body class="shower list">
	<header class="caption">
		<h1>Opening up educational content for debate via Web technology</h1>
		<h2>FLAMES annual meeting 2017</h2>
		<p>
			<a href="https://www.linkedin.com/in/rubenverborgh/">Ruben Verborgh</a>,
			<a href="https://be.linkedin.com/in/estherdeloof">Esther De Loof</a>,
			<a href="https://www.linkedin.com/in/rein-van-imschoot-458935ba/">Rein Van Imschoot</a> &
			<a href="https://www.linkedin.com/in/bramdejaegher/">Bram De Jaegher</a>
		</p>
	</header>
	
	<!--<section class="slide" id="TestSlideSections">
		<h2>Lorem ipsum</h2>
		<p>Nullam a lacinia lorem. Nullam ut tincidunt ligula, vitae feugiat tortor. Aliquam tincidunt felis sed neque rutrum dapibus. In tristique magna eget enim efficitur, nec rutrum mauris placerat.</p>
		<section>
		  <h3>Dolor sit</h3>
		  <p>Quisque faucibus lacus ac eros sagittis, et ultricies dui volutpat. Nulla facilisi. Sed semper porta tortor, in faucibus tortor.</p>
		</section>
		<section>
		  <h3>Amet</h3>
		  <p>In auctor elementum orci ac pharetra. Sed accumsan, orci id sodales eleifend, nisl risus semper nulla, ut ultrices dolor nulla eu nunc. </p>
		  <!--<h4>Blub</h4>
		  <p>Let it go, let it go, I'm one with the wind and sky!</p>-->
		</section>
	</section>-->
	
	<!--<section class="slide" id="TestSlideImplicitSections" data-level="1">
		<h2>Lorem ipsum</h2>
		<p>Nullam a lacinia lorem. Nullam ut tincidunt ligula, vitae feugiat tortor. Aliquam tincidunt felis sed neque rutrum dapibus. In tristique magna eget enim efficitur, nec rutrum mauris placerat.</p>
    <h3>Dolor sit</h3>
    <p>Quisque faucibus lacus ac eros sagittis, et ultricies dui volutpat. Nulla facilisi. Sed semper porta tortor, in faucibus tortor.</p>
    <h3>Amet</h3>
    <p>In auctor elementum orci ac pharetra. Sed accumsan, orci id sodales eleifend, nisl risus semper nulla, ut ultrices dolor nulla eu nunc. </p>
    <!--<h5>Test</h5>
    <ul>
      <li>Blab</li>
      <li>Bleb</li>
      <li>Blib</li>
      <li>Blob</li>
      <li>Blub</li>
    </ul>-->
	</section>-->

	<section class="black title slide" id="title">
		<h2>Open Webslides</h2>
		<p>
			<a href="https://www.linkedin.com/in/rubenverborgh/">Ruben</a>,
			<a href="https://be.linkedin.com/in/estherdeloof">Esther</a>,
			<a href="https://www.linkedin.com/in/rein-van-imschoot-458935ba/">Rein</a> &
			<a href="https://www.linkedin.com/in/bramdejaegher/">Bram</a>
			<span style="float: right">
				<a href="http://bit.ly/flames28th">bit.ly/flames28th</a>
			</span>
		</p>

		<p>
			WiFi    netwerk:     <strong>eduroam</strong> or mobile
		</p>
	</section>

	<section class="slide" id="TrumpTweet">
		<h2>What's in a tweet?</h2>
		<p>What if the most powerful person in the world would communicate via Twitter?</p>
		<blockquote class="twitter-tweet" data-lang="en">
			<p lang="en" dir="ltr">The two fake news polls released yesterday, ABC &amp; NBC, while containing some very positive info, were totally wrong in General E. Watch!</p>&mdash; Donald J. Trump (@realDonaldTrump) <a href="https://twitter.com/realDonaldTrump/status/856481786938916865">April 24, 2017</a>
		</blockquote>
	</section>

	<section class="slide" id="TrumpYoutube">
		<h2>What's in a tweet?</h2>
		<iframe
			width="800"
			class="center"
			height="315"
			src="https://www.youtube.com/embed/geEVwslL-YY?start=141&amp;end=160&amp;rel=0&amp;showinfo=0&amp;autohide=1"
			frameborder="0" allowfullscreen></iframe>
	</section>

	<section class="slide" id="projector">
		<img src="images/projector.jpg" alt="[foto van een diaprojector]" class="cover">
	</section>

	<section class="black toc slide" id="toc-what">
		<h2>Webslides: education lives on the Web</h2>
		<ul>
			<li><strong><a href="#toc-what">What are webslides?</a></strong></li>
			<li><a href="#toc-multimedia">Embedding multimedia</a></li>
			<li><a href="#toc-open">Open educational content</a></li>
			<li><a href="#toc-creators">From consumers to creators</a></li>
		</ul>
	</section>

	<div class="slide" id="webslides">
    <h2>Slides with the power of websites</h2>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="860" height="410">
      <style>
        #webslides path, #webslides line {
          fill: none;
          stroke: #1D70B7;
          stroke-width: 4;
        }
        #webslides polygon {
          fill: #1D70B7;
        }
        .paper {
          transform-origin: right bottom;
        }
        #mouse {
          animation: rotate 2.1s ease-in-out infinite alternate;
        }
        @keyframes rotate {
          from { transform: rotate(-1deg); }
          to   { transform: rotate( 1deg); }
        }
        #webslides .next.active, #open-source .next.active {
          animation: pop .5s;
          transform-origin: 200px 400px;
        }
        @keyframes pop {
          0%   { transform: scale(1.05) rotate(-10deg); }
          50%  { transform: scale(0.95); }
          100% { transform: scale(1.00); }
        }
        .play {
          animation: pulse 1s linear infinite;
          transform-origin: center;
        }
        @keyframes pulse {
          0%   { transform: scale(1.05); }
          50%  { transform: scale(0.95); }
          100% { transform: scale(1.00); }
        }
      </style>

      <text transform="translate(339 81)"  style="font: 40px Arial; font-weight: bold; font-style: italic; letter-spacing: 1px;">webslides</text>

      <g id="slide">
        <g>
          <g>
            <rect x="283.67" y="94.68" fill="#FFFFFF" width="312.43" height="196.02"/>
            <g class="next">
              <rect x="343.38" y="114.55" fill="#FFD200" width="251.72" height="16.77"/>
              <rect x="284.67" y="114.55" fill="#1E64C8" width="29.88" height="16.77"/>
              <g>
                <rect x="320.15" y="129.79" fill="#1E64C8" width="19.1" height="0.81"/>
                <rect x="320.15" y="120.47" fill="#1E64C8" width="19.1" height="0.73"/>
                <rect x="316.61" y="132.56" fill="#1E64C8" width="26.24" height="1.3"/>
                <rect x="324.57" y="135.76" fill="#1E64C8" width="10.32" height="1.22"/>
                <polygon fill="#1E64C8" points="329.73,116.42 321.14,119.78 338.27,119.78"/>
                <rect x="322.38" y="122.07" fill="#1E64C8" width="1.18" height="7.03"/>
                <rect x="325.07" y="122.07" fill="#1E64C8" width="1.18" height="7.03"/>
                <rect x="327.77" y="122.07" fill="#1E64C8" width="1.18" height="7.03"/>
                <rect x="330.46" y="122.07" fill="#1E64C8" width="1.18" height="7.03"/>
                <rect x="333.16" y="122.07" fill="#1E64C8" width="1.18" height="7.03"/>
                <rect x="335.85" y="122.07" fill="#1E64C8" width="1.18" height="7.03"/>
              </g>
              <text transform="matrix(1 0 0 1 574.001 128.3286)" style="font: 14px Arial;">24</text>
            </g>
            <rect stroke="black" stroke-width="3" x="283.67" y="94.68" fill="none" width="312.43" height="196.02"/>
          </g>
          <rect x="309.61" y="151.05" fill="#D9D9D9" width="263.75" height="13.95"/>
          <rect x="366.62" y="216.03" fill="#D9D9D9" width="40.8" height="13.95"/>
          <rect x="309.61" y="186.52" fill="#D9D9D9" width="97.81" height="13.95"/>
          <rect x="309.61" y="250.2" fill="#D9D9D9" width="97.81" height="13.95"/>
          <g class="next">
            <rect x="422.65" y="186" width="150.71" height="78"/>
            <g class="play">
              <path style="fill: #BD1622; stroke: none" d="M521.58,230.57c0,6.25-4.58,11.31-10.22,11.31h-26.71c-5.64,0-10.22-5.06-10.22-11.31v-10.28
                c0-6.25,4.58-11.31,10.22-11.31h26.71c5.64,0,10.22,5.06,10.22,11.31V227.57z"/>
              <polygon style="fill: white" points="493.35,218.76 503.64,224.71 493.35,230.65"/>
            </g>
          </g>
          <g class="next">
            <rect x="309.61" y="215.76" fill="#1D70B7" width="48.91" height="14.47"/>
            <rect x="309.61" y="233.76" fill="#1D70B7" stroke="#1D70B7" width="48.91" height="2.11"/>
          </g>
        </g>
      </g>

      <g class="next">
        <g>
          <path d="M170.24,153.31c18.36,32.37,92.12,80.13,142.1,81.51"/>
          <polygon points="162.26,159.16 166.04,139.58 181.11,152.64"/>
        </g>

        <g id="mouse">
          <polygon style="fill: white; stroke: black" stroke-width="2" points="343.75,223.53 347.69,245.22 354.69,239.13 368.79,255.94 373,252.28 358.6,235.73 365.21,229.97 		"/>
          <line style="stroke: #BD1622" x1="353.5"  y1="219.28" x2="356.87" y2="209.5"/>
          <line style="stroke: #BD1622" x1="334.34" y1="219.28" x2="324.57" y2="216.03"/>
          <line style="stroke: #BD1622" x1="333.16" y1="227.65" x2="326.25" y2="227.65"/>
          <line style="stroke: #BD1622" x1="337.03" y1="238.88" x2="331.05" y2="242"/>
          <line style="stroke: #BD1622" x1="342.85" y1="214.39" x2="342.85" y2="205.98"/>
        </g>

        <image width="860" height="400" xlink:href="images/webslides-papers.svg" />
      </g>

      <g class="next">
        <image width="860" height="400" xlink:href="images/webslides-coursesEN.svg" />
        <g>
          <path d="M88.12,375.12c155.52,12.32,257.8-9.84,280.23-41.62"/>
          <polygon points="375.92,339.63 372.95,319.91 357.36,332.34"/>
        </g>
      </g>

      <g class="next">
        <image width="860" height="400" xlink:href="images/webslides-tweets.svg" />
        <g>
          <path d="M528.16,330.87c41.91,54.99,220.18,2.8,238.53-139.67"/>
          <polygon points="521.25,338.03 521.63,318.09 538.71,328.38"/>
        </g>
      </g>

      <g class="next">
        <text x="282" y="313" style="font: 20px Arial;" fill="#1D70B7">www.ugent.be/slides/innoversity#24</text>
      </g>
    </svg>
  </div>
	
	<section class="slide" id="future">
		<h2>Educational content 2.0</h2>
		<h3>Webslides use <strong>the same technology</strong> as websites.</h3>
      <ul>
        <li>offers an infinite amount of multimedia possibilities</li>
        <li>embed YouTube, Twitter, interactive webtools</li>
        <li class="next"><strong>Linking</strong> to <a href="https://rubenverborgh.github.io/WebFundamentals/architecture/">other courses</a> is simple.</li>
      </ul>
    <h3>Webslides can be viewed and edited <strong>on each device</strong></h3>
      <ul>
        <li>no need to install additional plugins</li>
        <li>flexibel: teaching on location, at a museum, etc.</li>
      </ul>
	</section>

	<div class="slide" id="open-source">
    <h2>Co-creation via open-source</h2>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="930" height="440">
      <g>
        <line fill="none" stroke="#FFD200" stroke-width="12" stroke-miterlimit="10" x1="3.67" y1="200" x2="832.17" y2="200"/>
        <polygon fill="#FFD200" points="826.91,217.85 858,199.9 826.91,181.95 				"/>
      </g>

      <g>
        <image width="860" height="400" xlink:href="images/open-source-lesgever.svg" />
        <image width="860" height="400" xlink:href="images/open-source-publicatieEN.svg" />
      </g>

      <g class="next">
        <g>
          <path fill="none" stroke="#1E64C8" stroke-width="4" stroke-miterlimit="10" d="M179.07,236.84c20.97-37.32,73.58-84.39,97.96-99.23"/>
          <polygon fill="#1E64C8" points="263.82,161.75 260.72,159.22 277.29,138.92 251.55,143.82 250.8,139.89 287.33,132.94 				"/>
        </g>
        <image width="860" height="400" xlink:href="images/open-source-student.svg" />
        <image width="860" height="400" xlink:href="images/open-source-suggestieEN.svg" />
      </g>

      <style>
        #acceptatie.active .good {
          animation: bigpulse 1.5s .2s;
          transform-origin: center;
        }
        #acceptatie.active .bad {
          animation: bigpulse 1s;
          transform-origin: center;
        }
        @keyframes bigpulse {
          0%   { transform: scale(0.1); }
          40%  { transform: scale(1.1); }
          50%  { transform: scale(2.0); }
          100% { transform: scale(1.0); }
        }
        #update.active image {
          animation: touchandgo 2s .5s;
          transform-origin: center right;
        }
        @keyframes touchandgo {
          0%   { transform: scale(1.0); }
          5%   { transform: scale(1.2); }
          10%  { transform: scale(1.0); }
          80%  { transform: scale(0.95); }
          100% { transform: translate(320px); }
        }
      </style>

      <g class="next" id="acceptatie">
        <g>
          <path fill="none" stroke="#1E64C8" stroke-width="4" stroke-miterlimit="10" d="M478.26,77.41
          c28.2,29.99,58.32,115.81,66.25,149.8"/>
          <polygon fill="#1E64C8" points="526.18,207.17 529.54,204.99 543.84,226.95 547,200.94 550.96,201.42 546.48,238.34 				"/>
        </g>
        <image width="860" height="400" xlink:href="images/open-source-acceptatieEN.svg" />
        <path class="bad" style="transform: scale(0.8)" fill="#E20613" stroke="#FFFFFF" stroke-width="3" stroke-miterlimit="10" d="M436.42,359.27l-0.87,1.21
          c-6.01,9.09-10.94,13.63-14.79,13.63c-4.43,0-8.78-3.6-13.06-10.8c0.58,0.04,1,0.06,1.27,0.06c5.04,0,10.67-3.85,16.87-11.55
          l1.56-1.96l-2.02-2.2c-5.66-6.01-8.49-11.11-8.49-15.31c0-3.43,3.1-7.47,9.3-12.13c0.89,5.97,3.52,11.78,7.92,17.45l1.73,2.19
          l1.39-1.79c6.43-8.2,12.27-12.3,17.5-12.3c4.08,0,7.18,3.1,9.3,9.3c-0.62-0.08-1.06-0.12-1.33-0.12c-1.85,0-4.45,1.24-7.8,3.73
          c-3.35,2.48-6.18,5.29-8.49,8.4l-1.73,2.37l1.68,1.62c6.2,6.01,12.67,9.01,19.41,9.01c-3.62,7.32-7.39,10.98-11.32,10.98
          c-3.54,0-8.67-3.12-15.37-9.36L436.42,359.27z"/>
        <path class="good" fill="#009540" stroke="#FFFFFF" stroke-width="3" stroke-miterlimit="10" d="M431.05,314.21l2.01,5.13
          c-7.88,5.93-16.73,12.7-26.38,25.04c-9.65,12.34-8.52,14.41-13.61,25.13l-4.09,2.76c-3.39,2.36-5.69,4.11-6.91,5.25
          c-0.48-1.73-1.53-4.57-3.15-8.51l-1.55-3.59c-2.21-5.16-4.26-8.97-6.16-11.44s-4.03-4.11-6.38-4.92c3.98-4.2,7.62-6.3,10.94-6.3
          c2.84,0,5.99,3.85,9.45,11.55l1.71,3.87c6.23-10.5,5.72-11.24,15.49-21.15C412.19,327.12,421.73,319.51,431.05,314.21z"/>
      </g>

      <g class="next" id="update">
        <g>
          <path fill="none" stroke="#1E64C8" stroke-width="4" stroke-miterlimit="10" d="M593,328.18c16.86-5.35,41.35-15.77,73.25-58.63" />
          <polygon fill="#1E64C8" points="661.74,295.86 657.92,294.66 665.74,269.66 643.68,283.79 641.52,280.42 672.84,260.36 				"/>
        </g>
        <image width="860" height="400" xlink:href="images/open-source-update.svg" />
        <text x="688" y="282" style="font-family: Arial; font-size: 24px; font-weight: bold">update!</text>
      </g>
    </svg>
  </div>

	<section class="slide" id="mindset">
		<blockquote><strong>Open Webslides are not a tool but a mindset.</strong></blockquote>
		<img src="http://madra.com/wp-content/uploads/2015/10/online-marketing-tools.jpg" alt="[tools picture]" width="800" height="400">
	</section>

	<section class="black toc slide" id="toc-multimedia">
		<h2>Webslides: education lives on the Web</h2>
		<ul>
			<li><a href="#toc-what">What are webslides?</a></li>
			<li><strong><a href="#toc-multimedia">Embedding multimedia</a></strong></li>
			<li><a href="#toc-open">Open educational content</a></li>
			<li><a href="#toc-creators">From consumers to creators</a></li>
		</ul>
	</section>

	<section class="slide" id="earthQuake">
		<h2>Explore data in 3D</h2>
		<!-- Was: http://labs.gmt.io/quake/ -->
		<iframe width="800" height="450" src="https://ows.florian.dejonckhee.re/quake/"></iframe>
		<!-- <iframe width="800" height="450" src="http://www.earthquake3d.com/"></iframe>-->
	</section>

	<section class="slide" id="IncomeInequality">
		<h2>Explore data through time</h2>
		<iframe width="800" height="450" src="https://www.gapminder.org/tools/#_chart-type=bubbles"></iframe>
	</section>

	<section class="slide" id="mentimeter-interest">
		<iframe src="https://www.mentimeter.com/s/dd4ec8b136ec6826c7b666dd08d1de2a/820fdf2743b8" height="500" width="820"></iframe>
		<p class="center">Go to <a href="https://www.menti.com/6f7d25">www.menti.com</a> (code 30 73 6)</p>
	</section>

	<section class="slide" id="experiences">
		<h2>Embedding multimedia: our experiences so far</h2>
		<ul>
			<li class="next">Less is more: choose one or two <strong>fitting tools</strong> per presentation and take your time.</li>
			<li class="next">Interactive tools help understanding <strong>difficult concepts</strong>.</li>
			<li class="next">Avoid <strong>e-pollution</strong> by gathering all content in the slide deck.</li>
			<li class="next">Avoid <strong>e-fatigue</strong> by creating Web content, which is a relatively stable medium.</li>
			<li class="next">Excellent environment for <strong>flipped classroom</strong><br> and <strong>interactive workshop</strong> applications.</li>
		</ul>
	</section>

	<section class="black toc slide" id="toc-open">
		<h2>Webslides: education lives on the Web</h2>
		<ul>
			<li><a href="#toc-what">What are webslides?</a></li>
			<li><a href="#toc-multimedia">Embedding multimedia</a></li>
			<li><strong><a href="#toc-open">Open educational content</a></strong></li>
			<li><a href="#toc-creators">From consumers to creators</a></li>
		</ul>
	</section>

	<section class="slide" id="open">
		<h2>&ldquo;Open&rdquo; is a word with multiple layers</h2>
		<p>
			&ldquo;open&rdquo; can imply:
		</p>
		<ul>
			<li class="next">using <a href="#open-technology">open technologies</a></li>
			<li class="next">publishing slides on the <a href="#open-publication">open Web</a></li>
			<li class="next">opening up slides for <a href="#open-audience">feedback from the audience</a></li>
		</ul>
		<p>
			Presenters are absolutely <em>free</em>
			in how they implement &ldquo;open&rdquo;.
		</p>
	</section>

	<section class="slide" id="open-technology">
		<h2>The Web consists of open technologies</h2>
		<ul>
			<li>for all to use <strong>free of charge</strong></li>
			<li>choice among <strong>several browsers</strong></li>
			<li>choice among <strong>several editors</strong></li>
		</ul>
	</section>

	<section class="slide" id="open-technologyFB">
		<h2>Closed technologies on the Web</h2>
		<h3>Closed or open?</h3>
		<ul>
      <li><strong>closed</strong> Facebook groups or
          university  <strong>log-in walls</strong></li>
    </ul>
    <h3>reduced benefits for non-members</h3>
    <ul>
      <li>creation of knowledge silos</li>
    </ul>
    <h3><strong>we choose open</strong></h3>
    <ul>
      <li>even compatible with closed systems</li>
      <li>people will prefer open in the end</li>
    </ul>
	</section>

	<section class="slide" id="open-publication">
		<h2>Slides can easily be published publicly</h2>
		<h3>The <strong>presenter determines</strong> who can see the slides:</h3>
    <ul>
      <li>e.g. only <em>UGent students</em> through <a href="https://login.ugent.be">CAS</a></li>
      <li><em>everyone</em>, just like a typical website</li>
    </ul>
    <h3>Leverage content as online <strong>networking</strong> tool.</h3>
    <ul>
      <li>Increased <strong>recognition</strong> for teaching efforts, research, message ...</li>
    </ul>
    <h3>Be careful with <strong>intellectual property</strong> rights.</h3>
	</section>

	<section class="slide" id="open-exampleRuben">
		<h2>Example: <a href="https://ruben.verborgh.org/">Ruben</a>'s course</h2>
		<blockquote class="twitter-tweet" data-lang="en">
			<p lang="en" dir="ltr">Last part of Web Fundamentals, Linked Data Publishing, now available as <a href="https://twitter.com/OpenWebSlides">@OpenWebSlides</a>: <a href="https://t.co/Lh0JMdSBtg">https://t.co/Lh0JMdSBtg</a> <a href="https://twitter.com/hashtag/LinkedData?src=hash">#LinkedData</a> <a href="https://twitter.com/hashtag/SemWeb?src=hash">#SemWeb</a> <a href="https://twitter.com/hashtag/ITech16?src=hash">#ITech16</a></p>&mdash; Ruben Verborgh (@RubenVerborgh) <a href="https://twitter.com/RubenVerborgh/status/710429385250250754">March 17, 2016</a>
		</blockquote>
	</section>

	<section class="slide" id="open-audience-analytics">
		<h2>Opening up slides for analytical feedback</h2>
		<ul>
			<li>Real time <strong>feedback</strong> (clicks, views, analytics)</li>
		</ul>
		<img src="images/analytics.jpg" alt="[analytics]" width="800">
	</section>

	<section class="slide" id="open-audience">
		<h2>Opening up slides for audience feedback</h2>
		<blockquote>
			<p>
				Dear Professor,
			</p>
			<p>
				I suspect that in chapter 3 on slide 107 (version of October)<br>
				the word &ldquo;indirect&rdquo; should be replaced by &ldquo;direct&rdquo;?
			</p>
			<p>
				Kind regards,
			</p>
			<p>
				John Johnson
			</p>
		</blockquote>
	</section>

	<section class="slide" id="open-audience-new">
		<h2>Opening up slides for audience feedback</h2>
		<blockquote>
			<h3>List of suggestions</h3>
			<p>
				Suggestion from John Incognito:<br>
				<em><del>Indirect</del> <ins>Direct</ins> effects of climate change are listed below.</em>
			</p>
			<p>
				<a href="#open-feedback-new">view slide</a> –
				<a href="#open-feedback-new">accept</a> –
				<a href="#open-feedback-new">reject</a>
			</p>
		</blockquote>
	</section>

	<section class="slide" id="open-audience-exampleRuben2">
		<h2>Example: <a href="https://ruben.verborgh.org/">Ruben</a>'s course</h2>
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Students keep on correcting my slides—and I like it :-) <a href="https://t.co/JVtuN6br42">https://t.co/JVtuN6br42</a> All of that is possible with <a href="https://twitter.com/OpenWebSlides">@OpenWebSlides</a>! <a href="https://twitter.com/hashtag/Innoversity?src=hash">#Innoversity</a></p>&mdash; Ruben Verborgh (@RubenVerborgh) <a href="https://twitter.com/RubenVerborgh/status/700407350159663108">February 18, 2016</a></blockquote>
	</section>

	<section class="slide" id="open-audience-fakenews">
		<h2>Importance of active input in education</h2>
		<p>In a world of echo chambers, source verification is a crucial skill to acquire</p>
		<blockquote class="twitter-tweet" data-lang="en">
			<p lang="en" dir="ltr">The two fake news polls released yesterday, ABC &amp; NBC, while containing some very positive info, were totally wrong in General E. Watch!</p>&mdash; Donald J. Trump (@realDonaldTrump) <a href="https://twitter.com/realDonaldTrump/status/856481786938916865">April 24, 2017</a>
		</blockquote>
	</section>

	<section class="black toc slide" id="toc-creators">
		<h2>Webslides: education lives on the Web</h2>
		<ul>
			<li><a href="#toc-what">What are webslides?</a></li>
			<li><a href="#toc-multimedia">Embedding multimedia</a></li>
			<li><a href="#toc-open">Open educational content</a></li>
			<li><strong><a href="#toc-creators">From consumers to creators</a></strong></li>
		</ul>
	</section>

	<section class="slide" id="influence">
		<blockquote><strong>Content consumers are increasingly becoming creators</strong></blockquote>
		<img src="http://www.tubefilter.com/wp-content/uploads/2015/06/Pixability-Beauty-on-YouTube-2015-Infographic.jpg" alt="[influence picture]" width="700" height="450">
	</section>

	<section class="slide" id="creators-social">
		<h2>Lessons to learn from social media</h2>
		<ul>
			<li class="next">They create a level playing field and generation Z is used to chiming in</li>
			<li class="next">The conversation has shifted from a one-to-many to <strong>many-to-many</strong> paradigm</li>
			<li class="next">Many social media platform actively support their <strong>content creators</strong></li>
			<li class="next">Professional social media users rely strongly on analytics</li>
			<li class="next">Professional social media users respond quickly to their audience</li>
		</ul>
	</section>

	<section class="slide" id="creators-social2">
		<h2>Social media are not necessarily collaborative</h2>
		<ul>
			<li>We take it one step further: <strong>co-creation</strong> in small or large collaborative networks</li>
			<li>Current development: webslides <strong>editor</strong> for general use</li>
			<li>Current development: <strong>social layer</strong> to support collaboration</li>
			<li>Future development: leverage data through <strong>learning analytics</strong> for all parties</li>
		</ul>
		<br>
		<p>
		More info: <a href="http://openwebslides.ugent.be/">openwebslides.ugent.be</a>
		</p>
	</section>

	<div class="white slide" id="creators-tweetout">
		<figure>
			<img src="https://www.screenflanders.be/uploads/images/location/9169/leuven_arenbergkasteel_2__normal.jpg" alt="" class="cover"  height="400">
			<figcaption class="white">
				<a href="https://www.screenflanders.be/uploads/images/location/9169/leuven_arenbergkasteel_2__normal.jpg">KU Leuven</a>
			</figcaption>
		</figure>
		<p>
			<a href="https://twitter.com/intent/tweet?button_hashtag=FLAMES" class="twitter-hashtag-button" data-url="https://openwebslides.github.io/presentatie_FLAMES/" data-dnt="true">Tweet #FLAMES</a>
		</p>
	</div>

	<section class="slide" id="mentimeter-feedback">
		<iframe src="https://www.mentimeter.com/s/dd4ec8b136ec6826c7b666dd08d1de2a/c8f94812cff0" height="500" width="820"></iframe>
		<p class="center">Go to <a href="https://www.menti.com/6f7d25">www.menti.com</a> (code 30 73 6)</p>
	</section>

	<div class="progress"></div>
	<footer class="badge">
		<a href="https://github.com/OpenWebslides/presentatie_FLAMES">Fork me on GitHub</a>
	</footer>

	<script src="scripts/shower.min.js"></script>
	<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</body>
</html>
`;

const testDeckEmpty = `
<!DOCTYPE html>
<html lang="nl">
<head>
	<title>Opening up educational content for debate via Web technology</title>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="stylesheet" href="styles/screen-16x10.css" id="style">
	<link rel="stylesheet" href="styles/custom.css">
</head>

<body class="shower list">
	<section class="slide" id="TestEmptySlide">
		
	</section>
	
	<section class="slide" id="TestNestedSections">
	  <section>
      <h2>...</h2>
      <section>
        <section>
          <section>
            <h3>I Just Want To <strong>Sleep</strong> T__T</h3>
          </section>
        </section>
      </section>
    </section>
  </section>
  
  <section class="slide" id="TestComplicatedDelete">
  <h1>Heading <strong>level</strong> 1</h1>
  <ul>
    <li>Unordered item 1</li>
    <li>Unordered item 2</li>
    <li>Unordered item 3</li>
  </ul>
  <h2>Heading <strong>level</strong> 2</h2>
  <ol>
    <li>Ordered item 1</li>
    <li>Ordered item 2</li>
    <li>Ordered item 3</li>
  </ol>
  <h2>Heading <strong>level</strong> 2</h2>
  <ol>
    <li>Ordered item 1</li>
    <li>Ordered item 2</li>
    <li>Ordered item 3</li>
  </ol>
</section>

	<div class="progress"></div>
	<footer class="badge">
		<a href="https://github.com/OpenWebslides/presentatie_FLAMES">Fork me on GitHub</a>
	</footer>

	<script src="scripts/shower.min.js"></script>
	<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</body>
</html>
`;

function* doFetchDeck(action) {

  try {
    // const HTMLResponse = yield call(fetchDeckApi, action.meta.deckId); // #TODO
    const HTMLResponse = testDeckEmpty; // testDeckFlames;

    const entities = yield convertToState(action.meta.deckId, HTMLResponse);
    const payload = {
      deckId: action.meta.deckId,
      ...entities,
    };

    yield put({ type: FETCH_DECK_SUCCESS, payload });

  } catch (e) {
    console.log(e);
  }
}

function* fetchDeckWatcher() {
  yield takeLatest(FETCH_DECK, doFetchDeck);
}

export default fetchDeckWatcher;
