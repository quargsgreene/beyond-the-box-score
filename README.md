# Beyond the Box

***

## Film Synopsis
*Beyond the Box* is a short film about the trials and tribulations of people with disabilities in the entertainment industry. 
This documentary film follows seven subjects across a range of disciplines and sub-disciplines, such as drumming, cinematography, music, and more. 
The film is one of few in its genre to cover the lives of disabled people without involving the views of non-disabled family members and/or caregivers.
The trailer can be viewed here and the plan is for the production team to submit the film to multiple film festivals, with a focus on the Southern California region.

***

## The Scoring Process
The sountrack of **Beyond the Box** was conceived almost entirely via the [Strudel](https://strudel.cc/learn/getting-started/) music live coding environment. 
In addition to loading samples from [Freesound.org](https://freesound.org/) via [Shadba](https://shabda.ndre.gr/), I also created and loaded several of my own sample packs.
Initially, the custom samples were loaded locally from disk and mostly consist of rather improvisational viola selections and excerpts from *Die Schule der Violintechnik*,
composed by Henry Schradieck in 1899. Other than this, a recording of a band consisting of guitar, bass, and drums
was provided by the director for cue 2 and drums for cue 15. Logic Pro was used for audio editing, mixing, and mastering.

Given the nature of live coding, the Strudel code does not reflect an exact replication of the score, but rather, is more akin to a set of paints and paint brushes, 
where the result is one of infinitely many possibilities. Audio from the Strudel editor was recorded using the virtual audio loopback driver, [*Black Hole*](https://existential.audio/blackhole/).
As is typically the case with live performances involving live coding, much of the recording process captured the usual improvisational on-the-fly ethos, with code often being updated during takes.

***

## Usage
There may be a bit of confusion here due to the seemingly conflicting nature of Strudel's [APGL 3.0 license](https://www.gnu.org/licenses/agpl-3.0.en.html) and the global copyright laws that apply to 
film sound tracks composed by a living composer. APGL 3.0 stipulates that the software in this repository cannot be sold and must be made freely available. However, the musical recordings resulting from 
the use of this free, open-source software, as well as the larger video recording that is the film, do qualify for the usual copyright protections. Furthermore, at no point was any part of the Logic Pro codebase 
(not that anyone on the production team has access to Apple's proprietary code) combined with any of Strudel's codebase. So have fun playing around with the code. 
Just make sure any recorded results are different enough from the film soundtrack if you want to stay out of copyright trouble.

In order to run things locally, fork the repository an run the `npm run dev` command.


## LLM Use
While I cannot guarantee that Strudel's codebase, or any other codebase involved is entirely free of LLM-generated code, the Strudel code in this repository and the resulting musical content are entirely 
human-conceived. 
