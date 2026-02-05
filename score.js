
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

let cue_9 = stack(piano_cue_9, bass_synth_cue_9, synth_fx_0_cue_9, synth_fx_1_cue_9, synth_fx_2_cue_9, synth_fx_3_cue_9, synth_fx_4_cue_9, synth_fx_5_cue_9)

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
