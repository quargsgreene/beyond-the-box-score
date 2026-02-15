

// registered functions and sounds
const choppy_fx = register('choppy', (pat) => pat
.adsr(".2:.2:.3:.3")
.tremolosync(1)
.tremolodepth(2)
.chop(100)
.pcurve("<1? 0>/2")
.pan("<.5 1 0 .5>")
.degrade()
)

const bloat_fx = register('bloat', (pat) => pat
.chorus(1)
.room(1)
.phaser(4)                                                     
)

registerSound(
  'mysaw',
  (time, value, onended) => {
    let { freq } = value; // destructure control params
    const ctx = getAudioContext();
    const d = ctx.createWaveShaper();
    // create oscillator
    const o = new OscillatorNode(ctx, { type: 'sine', frequency: Number(freq) });
    o.start(time);
    // add gain node to level down osc
    const g = new GainNode(ctx, { gain: 0.3 });

    function makeDistortionCurve(amount) {
      const k = typeof amount === "number" ? amount : 50;
      const numSamples = 48000;
      const curve = new Float32Array(numSamples);
      const deg = Math.PI / 180;
    
      for (let i = 0; i < numSamples; i++) {
        const x = (i * 2) / numSamples - 1;
        curve[i] = ((4 % k) * x * 12 - Math.sinh(deg)) / (Math.E + k * Math.clz32(x));
        
      }
      return curve;
    }
  
// …

    d.curve = makeDistortionCurve(400);
        // connect osc to gain
    const node = o.connect(d);
    // this function can be called from outside to stop the sound
    const stop = (time) => o.stop(time);
    // ended will be fired when stop has been fired
    o.addEventListener('ended', () => {
      o.disconnect();
      d.disconnect();
      onended();
    });
    return { node, stop };
  },
  { type: 'synth' },
);

//cue 1
setcpm(68/3)
let synth_pad_0_cue_1 = sound("[gm_oboe:4, sine]")
.note("<g <g,f> <g, a> <a, b> <f, d> f>")
.vowel("<aa ae o <oe, u> aa ae>")
.slow(2) 
.room(1)

let synth_piano_0_cue_1 = n(run(3))
.scale("g5:pentatonic")
.rev()
.degrade()
.sometimes(x=>x.jux(rev))
.sound("piano:4")
//.color("cyan")
.pianoroll()

let synth_lead_00_cue_1 = sound("[saw, gm_synth_brass_1:1]")
.note("<~!30 ~ g4 <g4, a4> <g4, a4,  b4> <g4, a4, b4, d5>  <g4, a4, b4, d5, f5>>")
.fast(3)
.lpf(1500)
.gain(0.2)

let synth_lead_01_cue_1 = sound("[saw, gm_synth_brass_1:1]")
.note("<g4, a4, b4, d5, f5, g5, a5>")
.slow(2)
.lpf(1500)
.gain(0.2)

let synth_lead_0_cue_1 = arrange(
  [12, synth_lead_00_cue_1],
  [2, synth_lead_01_cue_1]
)
.vib(100)

let synth_bass_0_cue_1 = sound("gm_synth_bass_1:2")
.note("g1")
.lpf(800)
.lpq(1)
.adsr(".3:.4:.4:.2")

let synth_fx_0_cue_1 = sound("gm_breath_noise:8")

let cue_1 = arrange(
  [12, synth_pad_0_cue_1],
  [14, stack(
    synth_pad_0_cue_1, 
    synth_bass_0_cue_1,
    synth_piano_0_cue_1,
    synth_lead_0_cue_1,
    synth_fx_0_cue_1 
  )]
)

// cue 2
setcpm(120/4)
synth_fx_0_cue_2:sound("[gm_orchestra_hit:4, gm_brass_section:3]")
.clip(0.3)
.note("[a1, a2, a3]")
.slow(2)
.room(2)

synth_vox_0_cue_2: "Box"
.speak(4, "en")
.slow(2)

// cue 3
setcpm(92/5)
let synth_pad_0_cue_3 = "<<8,5,7,0> ~ <5,7,9,12> ~>"
.tune("gumbeng")
.mul(getFreq('c1'))
.freq()
.vib("<3 6>") 
.vibmod("<.25 1>")
.penv("3")
.clip(.8)
.room("3:10")
.rfade(8)
.sound("[gm_voice_oohs:1, gm_english_horn:2, sine]")
.lpf(3000)
.superimpose(x=>x.mul(2))
.echo(3, 1/10, .6)
.postgain(0.2)
.color("gray")
._spectrum()

let synth_pad_1_cue_3 = sound("zzfx")
.room(2)
.freq("<659.24 ~!3 587.33 659.24 ~!3 <592, 659.24> <659.24, 98> ~!4 <659.24, 98, 123, 592> ~!3 <592, 659.24, 783.99>>")
.penv("4")
.vib(5)
.fast(4)
.degradeBy(0.2)
.gain(0.8)
.adsr(".1:.1:.5:.2")

let synth_fx_0_cue_3 = sound("gm_breath_noise:5")
.delay(.25)

.delayfeedback("<.25 .5 .75 1>")
.room(3)
.color("<blue white gray brown yellow>")
.sometimes(x=>x.rev())
._pianoroll()
.spiral()

let synth_fx_1_cue_3 = sound("gm_applause")
.room(5)
.crush("<2 3 4 5 6 7 8 16>")
.vib("<.5 1 2 4 8 16>")
.phaser("1")
.color("brown")
.gain(0.3)
._scope()
let synth_bass_0_cue_3 = arrange(
  [4, sound("zzfx").freq("<98 120 98 <98, 120>>")],
  [8, sound("zzfx").freq("<98, 120>")]
)
.phaser("2")
.lpf("<100 2000 30 8000 ~>")
.adsr(".2:.2:.1:.2")

let synth_fx_2_cue_3 = sound("pink")
.room(2)
.phaser("<2 3 4 1>")
.postgain(0.3)
.color("brown")
.gain("<0? 0.3>")
._spectrum()


let cue_3 = arrange(
  [4, synth_pad_0_cue_3.hush()],
  [4, stack(
      synth_pad_0_cue_3,
      synth_fx_0_cue_3,
      synth_bass_0_cue_3
  )],
  [8, stack(
      synth_pad_0_cue_3,
      synth_pad_1_cue_3, 
      synth_fx_0_cue_3,
      synth_fx_1_cue_3,
      synth_fx_2_cue_3,
      synth_bass_0_cue_3
  )]
)
.gain(0.3)

// cue 4
setcpm(30/4)

let bass_synth_cue_4 = sound("zzfx")
.room(3)
.stack("98", "123", ["164.81", "148"])
.freq()
let synth_fx_0_cue_4 = sound("gm_breath_noise:5")
.delay(.25)
.delayfeedback("<.25 .5 .75 1>")
.room(2)
let synth_fx_1_cue_4 = sound("gm_applause")
.room(5)
.crush("<2 3 4 5 6 7 8 16>")
.vib("<.5 1 2 4 8 16>")
.postgain(0.1)
let synth_fx_2_cue_4 = sound("pink")
.room(2)
.phaser("<2 3 4 1>")
.postgain(0.3)
let synth_fx_3_cue_4 = sound("gm_breath_noise:5")
.delay(.25)
.delayfeedback("<.25 .5 .75 1>")
.room(3)
let cue_4 = stack(bass_synth_cue_4, synth_fx_0_cue_4, synth_fx_1_cue_4, synth_fx_2_cue_4, synth_fx_3_cue_4)

// cue 5
setcpm(150/4)

let synth_drums_0_cue_5 = sound("mpc1000_bd:5 [mpc1000_bd:5, emudrumulator_cb:1] mfb512_cr:1 [bossdr550_misc:1, casiovl1_hh:1]")
.degradeBy(0.2)
.gain(0.2)
.whenKey("CapsLock", x => x.hush())

let synth_drums_1_cue_5 = sound(choose("space:1", "space:10", "spacedrum_hh:1", "viscospacedrum_mt:2", "akaixr10_perc:1", "circuitsdrumtracks_sh:1"))
.struct(binaryN(60000, 8))
.rev()
.gain(0.2)
.whenKey("CapsLock", x => x.hush())

let synth_bass_cue_5 = sound("zzfx")
.stack("g2", "b2", "d3")
.note()
.transpose("<0 12>")
//.transpose("1")
.room(3)
.delay(0.5)
.slow(4)
.postgain(0.5)
.whenKey("Fn", x=>x.transpose("1"))

let synth_lead_0_cue_5 = note("<0 1 2!2 3>"
.superimpose(x=>x.sub(slider(0, 0, 12, 1)))
.pick(["71 74", "69 66", "71 74" , "67 74 71 69"]))
.sound("[triangle, gm_lead_1_square:3]")
.transpose("<0 12>")
.transpose("1")
.lpf(2000)
.lpq("<0 5 10 15>")
.phaser(choose("1", "2", "4", "8"))
.slow("4")
.gain(0.2)
.whenKey("Fn", x=>x.transpose("1"))

let synth_lead_1_cue_5 = "<g4 a4 b4 d5 f#5>"
.transpose("<0 -12 -24 12>")
.note().fast(16)
.sound("wt_vgame:10")
.lpf(1400)
.postgain(0.75)
.transpose("1")
.degrade()
.gain(0.2)
.whenKey("Fn", x=>x.transpose("1"))

let cue_5 = stack(
synth_drums_0_cue_5, 
synth_drums_1_cue_5, 
synth_bass_cue_5, 
synth_lead_0_cue_5, 
synth_lead_1_cue_5
)

// cue 6
setcpm(120/4)

let stab_samples = samples('https://shabda.ndre.gr/stab.json?strudel=1')
samples('https://shabda.ndre.gr/glass:1.json?strudel=1')

let synth_drums_0_cue_6 = sound(choose("[stab:4, space:4]", "[stab:1, soundmastersr88_bd:1]", "[stab:2, sk1_bd:1]"))
.clip(0.2)
.almostNever(x=>x.sound("glass").gain(0.1))
.struct("<[x x*3] x*2!3>")
.fast(4)
.crush(8)

let synth_lead_0_cue_6 = note("<e4@4 b4@4 e4@7 f#4 g4@8 d5@8>")
.fast(4)
.sound(choose("gm_voice_oohs:1", "gm_voice_oohs:2", "gm_voice_oohs:3", "gm_voice_oohs:4", "gm_voice_oohs:5", "gm_voice_oohs:6"))
.vib(10)
.bloat()
.room(2)
.pan("<1@4 0@4 0@7 0.2 0.3@8 0.5@8>")

let synth_lead_1_cue_6 = sound("firehose")
.note("<e4@4 b4@4 e4@7f#4 g4@8 d5@8>")
.fast(4)

let synth_pad_0_cue_6 = chord("<EM Em EM@2 GM [Gm9 GM9] GM@2>")
.voicing()
.sometimes(x=>x.penv(2))

let synth_fx_0_cue_6 = sound("[wind:1, wind:2, wind:3, wind:4, wind:5, crowd:1, crowd:2, crowd:3, crowd:4, crowd:5]")
.choppy()

let synth_strings_0_cue_6 = sound("[gm_tremolo_strings:1, gm_pizzicato_strings:2, square:0.3]")
.note("<e5@3 ~!4 b5 e5@2 ~!5 b5 e5@3 ~!4 b5 e5@2 ~!4 d5@2 g@2 ~!6 d@3 ~!6 g@2 ~!6 g@3 ~!4>")
.fast(8)
.rarely(x=>x.ply(8))
.distort(0.2)

let synth_bass_0_cue_6 = sound("[supersaw, gm_oboe:4, gm_piano:2]")
.note("<e2@2 ~!5 d2 e2@2 ~!5 d2 e2@2 ~!5 d2 e2@2 ~!4 f#2@2 g@2 ~!6 d@3 ~!6 g@2  ~!6 g@3 ~!4>")
.fast(8)
.penv(2)

_cue_6: arrange(
  [16, stack(synth_drums_0_cue_6, synth_lead_0_cue_6)],
  [16, stack(synth_drums_0_cue_6, 
             synth_lead_0_cue_6, 
             synth_bass_0_cue_6
            )],
  [16, stack(synth_pad_0_cue_6, synth_fx_0_cue_6)],
  [16, stack(
    synth_pad_0_cue_6, 
    synth_fx_0_cue_6, 
    synth_strings_0_cue_6 
  )],
  [16, stack(
    synth_drums_0_cue_6, 
    synth_lead_0_cue_6, 
    synth_bass_0_cue_6, 
    synth_strings_0_cue_6, 
    synth_fx_0_cue_6
  )]
)
.gain(0.5)

// cue 7
setcpm(50/4)

let bass_synth_cue_7 = sound("zzfx")
.room(3)
.stack("49", "61.5", ["82.20", "74"])
.freq()
  
let pad_cue_7 = chord("<CM CM9 F G^7 E CM ~>")
.voicing().room(.5)
.vib("<0 200 100 50 25 12 0>")
.color("<purple green blue>")
._pianoroll()

let synth_fx_0_cue_7 = freq("< ~ ~ ~ ~ ~ [523, 620, 666, 777] * 100 [523, 620, 666, 777] * 90>")
.penv("1")
.vib("5")
.gain(slider(1, 0.01, 1, 0.01))
let synth_fx_1_cue_7 = sound("gm_breath_noise:8")
.delay(.75)
.delayfeedback("<.25 .3 .8 .25> * 10")
.room(3)

let synth_fx_2_cue_7 = sound("crow")
.distort(slider(1, 1, 16, 1))
.struct("~ ~ ~ x ~ ~ x ~ x")
.postgain(0.1)
.compressor("-20:20:10:.001:.2")
let synth_fx_3_cue_7 = sound("<gm_bird_tweet:1 gm_bird_tweet:2 gm_bird_tweet:3>").struct("~ ~ ~ x ~ ~ x ~ x@").gain(slider(2, 0, 2, 0.1))

let cue_7 = stack(bass_synth_cue_7, pad_cue_7, synth_fx_0_cue_7, synth_fx_1_cue_7, synth_fx_2_cue_7, synth_fx_3_cue_7)

// cue 8
setcpm(76/4)

let synth_lead_0_cue_8 = n(run(8))
.scale("<F5:pentatonic F3:pentatonic>")
.transpose("<0 7 0 12>*2")
.almostNever(x=>x.transpose("<12 -12>"))
.sound("tri")
.lpf("3000")
.often(x=>x.jux(iter(4)))
.rarely(x=>x.pan(tri.fast(2)))
.someCycles(x=>x.rev())
.degradeBy("0.3")
.gain(0.3)

let synth_bass_0_cue_8 = note("<F2@3 F3>*8")
.transpose("<0 -12 0 7>")
.sound("gm_lead_8_bass_lead:3")
.gain(0.5)

let synth_drums_0_cue_8 = sound("[bd hh sd oh*<1 2 3 4>, lt]")
.bank("ViscoSpaceDrum")
.compressor("-15:20:0.1:0.3")
.gain(0.1)

let synth_pad_0_cue_8 = note("[f6, a6, c6]")
.sound(choose("gm_pad_new_age:12", "gm_pad_new_age:5")).slow(2)
.room(choose(range(1, 5)))
.gain(0.5)

let synth_fx_0_cue_8 = sound("gm_breath_noise:8")
.delay(.5)
.delayfeedback("<.5 .2 .7 0.9>")
.struct("<~ x>/2")
.room(2)

let synth_lead_1_cue_8 = n(run(8))
.scale("<F5:minor F3:minor>")
.transpose("<0 7 0 12>*2")
.almostNever(x=>x.transpose("<12 -12>"))
.sound("tri")
.lpf("3000")
.often(x=>x.jux(iter(4)))
.rarely(x=>x.pan(tri.fast(2)))
.someCycles(x=>x.rev())
.degradeBy("0.3")
.gain(0.3)

let synth_fx_1_cue_8 = note(run(127))
.gain(0.1)
.fast(2)

let synth_drum_bass_0_cue_8 = stack(
synth_bass_0_cue_8, 
synth_drums_0_cue_8
)
let synth_drum_bass_pad_fx_0_cue_8 = stack(
synth_bass_0_cue_8, 
synth_drums_0_cue_8, 
synth_pad_0_cue_8, 
synth_fx_0_cue_8 
)

let synth_drum_bass_pad_fx_lead_0_cue_8 = stack(
synth_bass_0_cue_8, 
synth_drums_0_cue_8, 
synth_pad_0_cue_8, 
synth_fx_0_cue_8, 
synth_lead_0_cue_8
)

let synth_lead_fx_bass_1010_cue_8 = stack(
synth_fx_0_cue_8,
synth_bass_0_cue_8,
synth_lead_1_cue_8,
synth_fx_1_cue_8
)
.transpose("<0 [0, 12]>")
.distort("<0.5 [0, 0.25]>/2:0.5:diode")

let synth_lead_fx_bass_drum_10100_cue_8 = stack(
synth_fx_0_cue_8.gain(0.2),
synth_bass_0_cue_8,
synth_drums_0_cue_8,
synth_lead_1_cue_8.degradeBy(0.7),
synth_fx_1_cue_8.gain(0.1).degradeBy(0.9)
)
.phaser(0.5)
.phaserdepth(0.5 * sine.slow(2))

let cue_8 = arrange(
[4, synth_drum_bass_0_cue_8], 
[4, synth_drum_bass_pad_fx_0_cue_8], 
[8, synth_drum_bass_pad_fx_lead_0_cue_8],
[8, synth_lead_fx_bass_1010_cue_8],
[16, synth_lead_fx_bass_drum_10100_cue_8]
)

// cue 9
setcpm(30/4)

let piano_cue_9 = freq("[1568, 3136] [220, 440] [889, 1778] [42, 84]").sound("piano:2").degrade().color("red")
let bass_synth_cue_9 = sound("zzfx")
.room(3)
.stack("98", "123", ["164.81", "148"])
.freq()
.rev()
let synth_fx_0_cue_9 = sound("gm_breath_noise:5")
.delay(.25)
.delayfeedback("<.25 .5 .75 0.9>")
.room(2)
.color("cyan")
let synth_fx_1_cue_9 = sound("gm_breath_noise:8")
.delay(.5)
.delayfeedback("<.5 .2 .7 0.9>")
.room(2)
.color("cyan")
let synth_fx_2_cue_9 = sound("gm_applause")
.room(5)
.vib("<.5 1 2 4 8 16>")
.postgain(0.1) 
let synth_fx_3_cue_9 = sound("brown")
.room(2)
.phaser("<4 6 8 2>")
.postgain(0.3)
.color("<green purple blue>")
._pianoroll()
let synth_fx_4_cue_9 = sound("gm_breath_noise:6")
.delay(.25)
.delayfeedback("<.25 .5 .75 1>")
.room(3)
.slow(2)
let synth_fx_5_cue_9 = sound("crow")
.slow(2)
.gain(0.1)

let cue_9 = stack(
  piano_cue_9, 
  bass_synth_cue_9, 
  synth_fx_0_cue_9, 
  synth_fx_1_cue_9, 
  synth_fx_2_cue_9, 
  synth_fx_3_cue_9, 
  synth_fx_4_cue_9, 
  synth_fx_5_cue_9
)

// cue 10
setcpm(140/4)
_synth_drums_0_cue_10: sound(choose("bassdrum1:1", "clash:2:0.1", "hihat:3", "snare_hi:4", "tom_stick:5:0.5"))
.struct("x")
.jux(rev)
.fast(8)
.swing(4)
.degrade()


_synth_guitar_0_cue_10: arrange([4, note("<[d4, f#4, a4, d5, e5, f#5, d6] [a3, c#4, d#4, e4, f#4] [a4, c#5, e5, g5] [d3, a3, d4, f#4]>")
.struct("<x!6 ~!2>")
.fast(2)
.sound("[gm_electric_guitar_jazz:9, gm_church_organ:5]")
.swing(1)
.gain(0.2)],
[4, note("<[d4, f#4, a4, d5, e5, f#5, d6] [eb4, g4, bb4, eb5, f5] [a4, c#5, e5, g5] [d3, a3, d4, f#4]>")
.struct("<x!6 ~!2>")
.fast(2)
.sound("[gm_electric_guitar_jazz:9, gm_church_organ:4]")
.swing(1)
.gain(0.2)]                         
)
.bloat()
.phaser(1)
.sometimes(x=>x.transpose(-12))
.degradeBy(0.1)

// cue 11
setcpm(150/4)
let bird_samples = samples('https://shabda.ndre.gr/birds.json?strudel=1')
let crowd_samples = samples('https://shabda.ndre.gr/crowd.json?strudel=1')
let computer_samples = samples('https://shabda.ndre.gr/computer.json?strudel=1')

_synth_fx_0_cue_11: sound("<[birds:1, bd] [birds:2, hh] [birds:3, sd] [birds:2, sd], < ~ ~ ~ [birds:1, <mt, rt>]>>")
.end(.1)
.leslie(0.3)
.crush(2)
.pan("<.5 0 1 .5>")
.fast(8)
.degrade()
.gain(0.5)

_synth_fx_1_cue_11: sound("<[crowd:1, bd] [crowd:2, hh] [crowd:5, sd] [crowd:9, sd], < ~ ~ ~ [crowd:7, <mt, rt>]>>")
.begin(.1)
.chop(4)
.crush(8)

_synth_lead_0_cue_11: note("ab4 c5 bb4 db5 c5 eb5 db5 f5 eb5 g5 f5 ab5 g5 bb5 ab5 c6")
.superimpose(x=>x.sound("gm_orchestral_hit:2"))
.sound("sine")
.sometimes(x=>x.transpose(12))
.sometimes(x=>x.jux(rev))
.degradeBy(0.1)
.slow(2)
.bloat()
.crush(slider(16, 3, 16, 1))
.distort(slider(2, 0, 2, 0.1))

_synth_lead_1_cue_11: note("ab4 c5 bb4 db5 c5 eb5 db5 f5 eb5 g5 f5 ab5 g5 bb5 ab5 c6")
.sound("gm_piano:6")
.sometimes(x=>x.transpose(12))
.sometimes(x=>x.jux(rev))
.degradeBy(0.1)
//.slow(2)
.bloat()
.crush(slider(16, 3, 16, 1))
.distort(slider(0, 0, 2, 0.1))

_synth_bass_0_cue_11: note("ab4 c5 bb4 db5 c5 eb5 db5 f5 eb5 g5 f5 ab5 g5 bb5 ab5 c6")
.slow(2)
.transpose(-24)
.crush(slider(3, 3, 16, 1))
.distort(slider(1, 0, 1, 0.1))


_synth_pad_0_cue_11: sound("[gm_drawbar_organ:2, brown]")
.adsr(".3:.3:.5:.7")
.slow(2)
.note("[ab3, c4, eb4, ab4, c5, eb5, g5]")

_synth_pad_1_cue_11: sound("mysaw")
.freq(51.91)
.gain(0.01)
.bloat()

// cue 12
_synth_pad_0_cue_12: sound('mysaw')
.freq(29.14)
.lpf(slider(0, 0, 2000))
.gain(0.04)

_synth_fx_0_cue_12: sound("gm_alto_sax:2")
.note("eb5")
.choppy()
.gain(4)
_synth_fx_1_cue_12: sound("[space:4, pink]")
.choppy()
.gain(3)

_bass_synth_0_cue_12: sound("zzfx")
.room(3)
.stack("bb2", "d3", ["g3", "f3"])
.superimpose(x=>x.add(7))
.lpf(9000)
.chorus(0.5)
.adsr(".2:.3:.1:.4")
.compressor("-20:20:1:.003:.02")
.note()
.slow(4)
.gain(0.1)

// cue 13
setcpm(48/7)
let synth_pad_0_cue_13 =  sound("[gm_celesta:1, gm_breath_noise:8]")
.note("bb")
.choppy()
.room(3)

let synth_piano_0_cue_13 = sound("piano:1")
.note("<<bb2, eb3, ab3, db4> <eb3, ab3, db4, bb4> <ab3, db4, bb4, f4> <eb4, db4, db5, f5> <eb4, db4, db5, f5, g5>? ~!2>")
.rarely(x=>x.scrub("{0.1 .25@3 0.7 <0.8:1.5>}%3"))
.pdecay("<0 .1 .25 .5>")
.hpf(choose("100", "50", "500", "1000", "20", "150"))
.hpq(1)
.room(choose("5", "2", "1"))
.almostNever(x=>x.echo(7, 1/7, 0.9))
.postgain(0.2)
 
let synth_bass_0_cue_13 = sound("gm_synth_bass_1:4")
.note("bb1")
.gain(0.2)
.lpf(choose("400", "200", "2000", "20000", "300", "100", "500"))
.prelease("<0 .1 .25 .5>")
.often(x=>x.adsr("0.5:0.2:0.4:0.5"))
.lpa(0.5)

let synth_lead_0_cue_13 = n(run(10))
.scale("ab5:pentatonic")
.sometimes(x=>x.sub(note("5")))
.sound("[gm_fx_goblins:3, gm_epiano2:8, brown]")
.degradeBy(0.2)
.often(x=>x.jux(rev))
.room(2)
.pan("<0 1>")
.slow(4)
.late("<.1 .3 .4 0>")
.gain("<0.3 0.2 0.1 0.05>")

let cue_13 = arrange(
  [4, stack(
      synth_piano_0_cue_13, 
      synth_pad_0_cue_13.gain(1.5),
      synth_lead_0_cue_13,
      synth_bass_0_cue_13
      
  )]
)

// cue 14
setcpm(180/12)
_synth_lead_0_cue_14: arrange(
  [2, note("<e4 b4 e4 c#5 f#4 c#5 a4 e5 a4 d5 g4 d5>").sound(choose("gm_music_box:2", "gm_harpsichord:2", "sine", "pink"))],
  [2, note("<g4 d5 d4 a4 e5 a4 c5 g5 c5 b5 f#5 b5>").sound(choose("gm_music_box:3", "[tri, gm_guitar_fret_noise:2:0.5]"))]
)
.fast(12)
.bloat()

_synth_bass_0_cue_14:arrange(
  [2, note("<e4 b4 e4 c#5 f#4 c#5 a4 e5 a4 d5 g4 d5>").sound(choose("gm_electric_bass_pick:1", "gm_acoustic_bass:3", "supersaw", "brown"))],
  [2, note("<g4 d5 d4 a4 e5 a4 c5 g5 c5 b5 f#5 b5>").sound(choose("saw", "[tri, gm_slap_bass:2:0.5]"))]
)
.transpose(-36)
.fast(12)


_synth_drums_0_cue_14: s("oh*12")
.degrade()
.swing(1)
//.crush(2)
.sometimes(x=>x.ply(2))
.sometimes(x=>x.sound("birds:5"))
.rarely(x=>x.sound("computer:1:0.1"))

_synth_drums_1_cue_14:s("space:1*12")
.degrade()
.swing(1)
.crush(slider(12, 2, 16, 1))

_synth_fx_0_cue_14: sound("crow")
.choppy()
.gain(4)
.room(4)

_synth_pad_0_cue_14: stack(
  sound("gm_english_horn:3").note("g5").gain(choose("1", "0.3", "2", "0.5")),
  sound("gm_string_ensemble_1:10").note("b5").gain(choose("0.8", "0.2", "1.9", "0.6")),
  sound("gm_oboe:4").note("d5").gain(choose("0.4", "0.2", "0.1", "1")),
  sound("gm_pad_bowed:3").note("f#5").gain(choose("1.5", "0.7", "0.8", "0.2")),
  sound("gm_pad_warm:5").note("a5").gain(choose("1.3", "1.9", "0.4", "0.5")),
  sound("sine").note("c6").gain(choose("2", "0.3", "1.7", "0.1"))
)
.bloat()
.sometimes(x=>x.bpf(2000))
.rarely(x=>x.ply(choose("6", "12", "3")))
.penv(3)

// cue 15
setcpm(150/4)
let dog_samples = samples('https://shabda.ndre.gr/dog.json?strudel=1')


_synth_drum_0_cue_15: sound("computer:3 computer:5 computer:9 computer:1")
.striate(4)
.end(0.1)

_synth_drum_1_cue_15:sound("bd*4")
.bank('RolandTR909')
.room(1)

_synth_bass_0_cue_15: sound("[gm_bassoon:2, gm_contrabass:2, gm_piano:10]*4")
.clip(0.5)
.note("[f#1, f#2]")

_synth_strings_0_cue_15: sound("gm_orchestra_hit:3")
.note("<f#3 a#3>")
.superimpose(x=>x.add(12))
.fast(4)

_synth_vox_0_cue_15: sound("[gm_voice_oohs:3, gm_harmonica:5, gm_synth_bass_1:5]")
.note("<f#4 c#4>")
.superimpose(x=>x.add(7))
.fast(4)

_synth_lead_0_cue_15: sound("[firehose, gm_viola:1]")
.note("<~ a#4 f#4 ~ f#5 e#5 f#4 f#3>")


_synth_lead_1_cue_15: sound("[supersaw, gm_clarinet:5, gm_string_ensemble_1:1, gm_string_ensemble_2:1]")
.note("<f#3 a#3 c#4 e#4 f#4 a#4 c#5 e#5>")
.fast(8)
.sometimes(x=>x.transpose(12).rev())
.room(2)
.gain(2)
.vib(3)
.bloat()

_synth_pad_0_cue_15: sound("[gm_viola:3, gm_pad_warm:1]")
.note("[f#5, a#5, c#5]")

_synth_pad_1_cue_15: stack(
  sound("gm_bassoon:3").note("b2"),
  sound("gm_piano:14").note("d#3"),
  sound("gm_voice_oohs:1").note("f#3"),
  sound("gm_harmonica:1").note("b3"),
  sound("gm_synth_bass_1:2").note("d#4"),
  sound("gm_viola:1").note("f#4"),
  sound("supersaw").note("b4"),
  sound("gm_string_ensemble_1:1").note("d#5"),
  sound("gm_string_ensemble_2:1").note("f#5"),
  sound("sine").note("b5"),
  sound("brown")
)
.superimpose(x=>x.transpose(-12))
.room(3)
.chorus(1)
.vib(slider(1, 1, 10, 0.1))
.crush(slider(16, 1, 16, 1))


_synth_fx_0_cue_15: sound("<dog:1 dog:3 dog:5 dog:7 dog:9 dog:2 dog:4 [dog:6 dog:8]>")
.fast(8)
.gain(3)
// cue 16
setcpm(330/11)

let synth_lead_0_cue_16 = arrange(
  [4, n(run(11)).scale("<c4:major bb4:major [c3:mixolydian, c2:mixolydian] [c5:lydian, c4:lydian]>")],
  [4, n(run(11)).scale("<[g4:major, c4:major, c3:major] [f4:major, bb4:major, bb3:major] [g3:mixolydian, c3:mixolydian, c2:mixolydian] [g5:major, c5:major, c4:major]>")],
  [4, n(run(11)).scale("<c4:lydian bb4:major [c3:mixolydian, c2:mixolydian] [c5:major, c4:major]>")],
  [4, n(run(11)).scale("<[g4:major, c4:major, c3:major] [f4:major, bb4:major, bb3:major] [g3:mixolydian, c3:mixolydian, c2:mixolydian] [g5:bebop, c5:bebop, c4:bebop]>")]
)
.gain(0.1)
.add(note("0,12"))
.whenKey("CapsLock", x=>x.jux(rev))
.whenKey("Control:b", x=>x.jux(press))
.distort("1")
.room(1)

let synth_bass_0_cue_16 = note("<0 1 2 2>".pick(["[c3, e3]", "[bb2, d3]", "[c3, e3]@10 [e3, g3]"]))
.penv("<0 0.2>")
.phaser("0.5")
.distort("1")
.sound("supersaw")
.transpose("<0 -12>")

let synth_drums_0_cue_16 = sound(choose("bd:2", "akaimpc60_hh:1", "crow:2", "space:7", "woodblock:3"))
  .struct("x!2 ~!4 x ~!2 x ~")
  .iter(11)
  .degrade()
  .rarely(x=>x.ply(2)
)

let synth_drums_1_cue_16 = sound("bd sd [~ bd] sd")
.bank('RolandTR909')
.struct("x!2 ~!3 x!2 ~!2 x? ~")
.iter(11)
.degrade()
.often(x=>x.ply(2))
.jux(rev)
.crush("1")

let synth_perc_0_cue_16 = arrange(
  [8, sound("crow:1")],
  [8, sound("crow:1@10 space:1")],
  [8, synth_drums_0_cue_16],
  [8, stack(synth_drums_0_cue_16, synth_drums_1_cue_16)]
)
.gain(0.2)
 
let synth_fx_1_cue_16 = sound("hh:1")
.struct("x!2 x@2 x x@2 x@2 x!2")
.sometimes(x=>x.rev())
.rarely(x=>x.ply(4))
.gain("2")

let synth_vox_0_cue_16 = "Smash the box"
.speak("<en de es cn>/4", 1)
.rarely(x=>x.ply(2))
.degrade()

let synth_lead_1_cue_16 = note("<108 106 108 108>")
.sometimes(x=>x.add(note("4")))
.struct("x!2 x@2 x x!2 x@2 x ~")
.sometimes(x=>x.transpose("-7"))
.sound("[gm_telephone:10, gm_telephone:9, steinway:1]")
.whenKey("CapsLock", x=>x.jux(rev))
.whenKey("Control:b", x=>x.jux(press))
.transpose("<0 -12>/4")
.lpf(6000)
.lpq(10)
.room(0.5)

let cue_16 = arrange(
  [8, synth_bass_0_cue_16],
  [32, stack(
       synth_bass_0_cue_16, 
       synth_perc_0_cue_16
  )],
  [32, stack(
       synth_bass_0_cue_16, 
       synth_perc_0_cue_16, 
       synth_vox_0_cue_16, 
       synth_fx_1_cue_16
  )],
  [32, stack(
       synth_bass_0_cue_16, 
       synth_perc_0_cue_16, 
       synth_vox_0_cue_16, 
       synth_lead_1_cue_16, 
       synth_fx_1_cue_16,
       synth_lead_0_cue_16
  )],
  [8, synth_bass_0_cue_16],
  [8, stack(
      synth_bass_0_cue_16, 
      synth_perc_0_cue_16, 
      synth_fx_1_cue_16
    )],
  [8, stack(
     synth_bass_0_cue_16, 
      synth_lead_1_cue_16, 
     synth_vox_0_cue_16
  )],
  [16, stack(
       synth_bass_0_cue_16, 
       synth_vox_0_cue_16
  )],
  [8, synth_bass_0_cue_16.slow(2)],
  [4, sound("supersaw")
      .note("c1")
      .penv("1")],
  [8, synth_bass_0_cue_16.transpose("-12")],
  [4, sound("supersaw")
      .note("[c3, e3, g3]")
      .penv("1")
      .transpose("-12")],
  [8, sound("piano").struct("~")]
)
.gain(0.3)
.punchcard()
.color("<purple white [blue, white] brown [red, cyan]>")

arrange(
  [26, cue_1.cpm(68/3)],
  [32, cue_4.cpm(30/4)], 
  [32, cue_5.cpm(150/4)], 
  [7, cue_7.cpm(50/4)], 
  [3, cue_9.cpm(30/4)], 
  [1, cue_16.cpm(320/11)]
)
