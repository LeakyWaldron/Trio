var freeaps_determineBasal;(()=>{var e={5546:(e,r,a)=>{var t=a(6880);function o(e,r){r||(r=0);var a=Math.pow(10,r);return Math.round(e*a)/a}function n(e,r){return"mmol/L"===r.out_units?o(e/18,1):Math.round(e)}var i="",s="",l="",m="",u="",d="",c="",g="",b="";function f(e,r){var a=[2,7,12,16,20,50,60,80,90,100,110,150,180,200],t=[0,0,.4,.7,.7,-.5,-.5,-.3,-.2,0,0,.5,.7,.7],o=a.length-1,n=a[0],i=t[0],s=a[o],l=t[o],m=1,u=1,d=1,c=n;if(n>e)m=(u=i)+((l=t[1])-u)/((s=a[1])-(d=n))*(e-d);else if(s<e)m=(u=i=t[o-1])+(l-u)/(s-(d=n=a[o-1]))*(e-d);else for(var g=0;g<=o;g++){if(i=t[g],(n=a[g])==e){m=i;break}if(n>e){m=u+(i-u)/(n-(d=c))*(e-d);break}u=i,c=n}return m*=e>100?r.higher_ISFrange_weight:e>40?r.lower_ISFrange_weight:r.delta_ISFrange_weight}function p(e,r,a){if(void 0===e.smb_delivery_ratio_bg_range||0===e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio set to fixed value "+e.smb_delivery_ratio),e.smb_delivery_ratio;var t=Math.min(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(r<=a)return console.error("SMB delivery ratio limited by minimum value "+t),t;var n=Math.max(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(r>=a+e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio limited by maximum value "+n),n;var i=t+(n-t)*(r-a)/e.smb_delivery_ratio_bg_range;return console.error("SMB delivery ratio set to interpolated value "+o(i,2)),i}e.exports=function(e,r,a,h,v,_,B,M,x,y){var S="";if(void 0!==v&&v){const r=v.ratio,a=h.curve,t=h.insulinPeakTime,n=h.useCustomPeakTime,i=h.autoseens_min,s=h.autosens_max,l=h.adjustmentFactor,m=h.enableChris,u=h.enableDynamicCR;var C=55,F=e.glucose;switch(a){case"rapid-acting":C=55;break;case"ultra-rapid":C=t<75&&1==n?120-t:70}1!=m&&1!=u||(r==i||r==s?(console.error("tdd: N/A"),0):S=1==h.useNewFormula?", TDD: "+o(1800*r/(h.sens*l*Math.log(F/C+1)),2)+" U, Formula: Logarithmic, AF: "+l:", TDD: "+o(277700*r/(h.sens*l*F),2)+" U, Formula: Original, AF: "+l)}var I={},w=new Date;if(y&&(w=y),void 0===h||void 0===h.current_basal)return I.error="Error: could not get current basal rate",I;var G=t(h.current_basal,h),O=G,T=new Date;y&&(T=y);var A,R=new Date(e.date),D=o((T-R)/60/1e3,1),U=e.glucose,j=e.noise;A=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var P=Math.min(e.delta,e.short_avgdelta),k=Math.min(e.short_avgdelta,e.long_avgdelta),q=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(U<=10||38===U||j>=3)&&(I.reason="CGM is calibrating, in ??? state, or noise is high");if(U>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n(U,h)+"+"+n(e.delta,h)+") for 5m w/ "+n(e.short_avgdelta,h)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),D>12||D<-5?I.reason="If current system time "+T+" is correct, then BG data is too old. The last BG data was read "+D+"m ago at "+R:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?I.reason="CGM was just calibrated":I.reason="CGM data is unchanged ("+n(U,h)+"+"+n(e.delta,h)+") for 5m w/ "+n(e.short_avgdelta,h)+" mg/dL ~15m change & "+n(e.long_avgdelta,h)+" mg/dL ~45m change"),U<=10||38===U||j>=3||D>12||D<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return r.rate>=O?(I.reason+=". Canceling high temp basal of "+r.rate,I.deliverAt=w,I.temp="absolute",I.duration=0,I.rate=0,I):0===r.rate&&r.duration>30?(I.reason+=". Shortening "+r.duration+"m long zero temp to 30m. ",I.deliverAt=w,I.temp="absolute",I.duration=30,I.rate=0,I):(I.reason+=". Temp "+r.rate+" <= current basal "+O+"U/hr; doing nothing. ",I);var E,W,z,L=h.max_iob;if(void 0!==h.min_bg&&(W=h.min_bg),void 0!==h.max_bg&&(z=h.max_bg),void 0===h.min_bg||void 0===h.max_bg)return I.error="Error: could not determine target_bg. ",I;E=(h.min_bg+h.max_bg)/2;var N=h.exercise_mode||h.high_temptarget_raises_sensitivity,Z=100,$=160;if(h.half_basal_exercise_target&&($=h.half_basal_exercise_target),N&&h.temptargetSet&&E>Z||h.low_temptarget_lowers_sensitivity&&h.temptargetSet&&E<Z){var H=$-Z;H+E-Z>0?(sensitivityRatio=H/(H+E-Z),sensitivityRatio=Math.min(sensitivityRatio,h.autosens_max),sensitivityRatio=o(sensitivityRatio,2)):sensitivityRatio=h.autosens_max,process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+E+"; ")}else void 0!==v&&v&&(sensitivityRatio=v.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(sensitivityRatio&&(O=h.current_basal*sensitivityRatio,(O=t(O,h))!==G?process.stderr.write("Adjusting basal from "+G+" to "+O+"; "):process.stderr.write("Basal unchanged: "+O+"; ")),h.temptargetSet);else if(void 0!==v&&v&&(h.sensitivity_raises_target&&v.ratio<1||h.resistance_lowers_target&&v.ratio>1)){W=o((W-60)/v.ratio)+60,z=o((z-60)/v.ratio)+60;var J=o((E-60)/v.ratio)+60;E===(J=Math.max(80,J))?process.stderr.write("target_bg unchanged: "+J+"; "):process.stderr.write("target_bg from "+E+" to "+J+"; "),E=J}var K=200,Q=200,V=200;if(e.noise>=2){var X=Math.max(1.1,h.noisyCGMTargetMultiplier);Math.min(250,h.maxRaw);K=o(Math.min(200,W*X)),Q=o(Math.min(200,E*X)),V=o(Math.min(200,z*X)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+E+" to "+Q+"; "),W=K,E=Q,z=V}var Y=W-.5*(W-40),ee=o(h.sens,1),re=h.sens;if(void 0!==v&&v&&((re=o(re=h.sens/sensitivityRatio,1))!==ee?process.stderr.write("ISF from "+n(ee,h)+" to "+n(re,h)):process.stderr.write("ISF unchanged: "+n(re,h)),i+="Autosens ratio: "+o(sensitivityRatio,2)+", ISF: "+n(ee,h)+"→"+n(re,h)),console.error("CR:"+h.carb_ratio),re=function(e,r,a,t,h,v,_,B){if(!a.use_autoisf)return console.error("autoISF disabled in Preferences"),e;var M=t.dura_p,x=t.delta_pl,y=t.delta_pn,S=t.r_squ,C=t.bg_acceleration,F=t.parabola_fit_a0,I=t.parabola_fit_a1,w=t.parabola_fit_a2,G=t.autoISF_duration,O=t.autoISF_average,T=a.autoisf_max,A=!1,R=1,D=1,U=1,j=r+10-O;if(!(h.mealCOB>0)||a.enableautoisf_with_COB){var P=t.pp_debug;if(d+="BG-accel: "+o(C,3)+", PF-minutes: "+M+", PF-corr: "+o(S,4)+", PF-nextDelta: "+n(y,a)+", PF-lastDelta: "+n(x,a)+", regular Delta: "+n(t.delta,a),console.error(P+d+" , Weights Accel/Brake: "+a.bgAccel_ISF_weight+" / "+a.bgBrake_ISF_weight),a.enable_BG_acceleration){var k=C;if(0!=t.parabola_fit_a2){var q=-I/2/w*5,E=o(F-q*q/25*w,1);(q=o(q,1))<0&&k<0?(b="saw max of "+n(E,a)+", about "+-q+" min ago",console.error("Parabolic fit "+b)):q<0&&k>0?(b="saw min of "+n(E,a)+", about "+-q+" min ago",console.error("Parabolic fit "+b)):q>0&&k<0?(b="predicts max of "+n(E,a)+", in about "+q+"min",console.error("Parabolic fit "+b)):q>0&&k>0&&(b="predicts min of "+n(E,a)+", in about "+q+" min",console.error("Parabolic fit "+b))}var W=S;if(W<=.9)b="acce_ISF by-passed, as correlation, "+o(W,3)+", is too low",console.error("Parabolic fit "+b),c+=", Parabolic Fit, "+b;else{c+=", Parabolic Fit, "+b+", lastΔ: "+n(x,a)+", nextΔ: "+n(y,a)+", Corr "+o(S,3)+", BG-Accel: "+o(k,2);var z=10*(W-.9),L=1;t.glucose<a.target_bg&&k>1&&(L=.5),U=1+k*L*(k<0?a.bgBrake_ISF_weight:a.bgAccel_ISF_weight)*z,console.error("Original result for acce_ISF: "+o(U,2)),1!=U&&(A=!0,c+=", acce-ISF Ratio: "+o(U,2))}}else console.error("autoISF BG accelertion adaption disabled in Preferences");var N=p(a,t.glucose,r);i+=", SMB Delivery Ratio:, "+o(N,2)+c+", autoISF";var Z=1+f(100-j,a);console.error("bg_ISF adaptation is "+o(Z,2)),Z<1&&U>1&&(g="bg-ISF adaptation lifted to "+o(Z*=U,2)+", as BG accelerates already",s="(lifted by "+o(U,2)+")",console.error(g));var $=1;if(Z<1)return($=Math.min(Z,U))<a.autoisf_min&&(g="final ISF factor "+o($,2)+" limited by autoisf_min "+a.autoisf_min,console.error(g),$=a.autoisf_min),s=" (lmtd.)",earlysens=Math.min(720,o(a.sens/Math.min(B,$),1)),console.error("early Return autoISF:  "+n(earlysens,a)),i+=", bg-ISF Ratio: "+o(Z,2)+s+", ISF: "+n(earlysens,a),earlysens;Z>1&&(A=!0,i+=", bg-ISF Ratio: "+o(Z,2));var H=t.delta;j>0?console.error("delta_ISF adaptation by-passed as average glucose < "+n(r+10,a)):t.short_avgdelta<0?console.error("delta_ISF adaptation by-passed as no rise or too short lived"):a.enableppisf_always||a.postmeal_ISF_duration>=(v-h.lastCarbTime)/1e3/3600?(R=1+Math.max(0,H*a.postmeal_ISF_weight),console.error("pp_ISF adaptation is "+o(R,2)),m=", pp-ISF Ratio: "+o(R,2),1!=R&&(A=!0)):(D=f(H,a),j>-20&&(D*=.5),D=1+D,console.error("delta_ISF adaptation is "+o(D,2)),u=", Δ-ISF Ratio: "+o(D,2),1!=D&&(A=!0));var J=1,K=a.autoisf_hourlychange;return h.mealCOB>0&&!a.enableautoisf_with_COB?console.error("dura_ISF by-passed; preferences disabled mealCOB of "+o(h.mealCOB,1)):G<10?console.error("dura_ISF by-passed; BG is only "+G+"m at level "+O):O<=r?console.error("dura_ISF by-passed; avg. glucose "+O+" below target "+n(r,a)):(J+=G/60*(K/r)*(O-r),A=!0,l=", Duration: "+G+", Avg: "+n(O,a)+", dura-ISF Ratio: "+o(J,2),console.error("dura_ISF  adaptation is "+o(J,2)+" because ISF "+e+" did not do it for "+o(G,1)+"m")),$=1,A?($=Math.max(J,Z,D,U,R),console.error("autoISF adaption ratios:"),console.error("  dura "+o(J,2)),console.error("  bg "+o(Z,2)),console.error("  delta "+o(D,2)),console.error("  pp "+o(R,2)),console.error("  accel "+o(U,2)),U<1&&(console.error("strongest ISF factor "+o($,2)+" weakened to "+o($*U,2)+" as bg decelerates already"),$*=U),$<a.autoisf_min?(console.error("final ISF factor "+o($,2)+" limited by autoisf_min "+a.autoisf_min),$=a.autoisf_min):$>T&&(console.error("final ISF factor "+o($,2)+" limited by autoisf_max "+T),$=T),$>=1&&(e=o(a.sens/Math.max($,B),1)),$<1&&(e=o(a.sens/Math.min($,B),1))):$=B,i+=m+u+l+", Ratio: "+o($,2)+", ISF: "+n(e,a),console.error("Inside autoISF: Ratio "+o($,2)+" resulting in "+n(e,a)),e}console.error("BG dependant autoISF by-passed; preferences disabled mealCOB of "+o(h.mealCOB,1))}(re,E,h,e,_,y,0,sensitivityRatio),void 0===a)return I.error="Error: iob_data undefined. ",I;var ae,te=a;if(a.length,a.length>1&&(a=te[0]),void 0===a.activity||void 0===a.iob)return I.error="Error: iob_data missing some property. ",I;var oe=((ae=void 0!==a.lastTemp?o((new Date(T).getTime()-a.lastTemp.date)/6e4):0)+r.duration)%30;if(console.error("currenttemp:"+r.rate+" lastTempAge:"+ae+"m, tempModulus:"+oe+"m"),I.temp="absolute",I.deliverAt=w,M&&r&&a.lastTemp&&r.rate!==a.lastTemp.rate&&ae>10&&r.duration)return I.reason="Warning: currenttemp rate "+r.rate+" != lastTemp rate "+a.lastTemp.rate+" from pumphistory; canceling temp",B.setTempBasal(0,0,h,I,r);if(r&&a.lastTemp&&r.duration>0){var ne=ae-a.lastTemp.duration;if(ne>5&&ae>10)return I.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+ne+"m ago; canceling temp",B.setTempBasal(0,0,h,I,r)}var ie=o(-a.activity*re*5,2),se=o(6*(P-ie));se<0&&(se=o(6*(k-ie)))<0&&(se=o(6*(e.long_avgdelta-ie)));var le=U,me=(le=a.iob>0?o(U-a.iob*re):o(U-a.iob*Math.min(re,h.sens)))+se;if(void 0===me||isNaN(me))return I.error="Error: could not calculate eventualBG. Sensitivity: "+re+" Deviation: "+se,I;var ue=function(e,r,a){return o(a+(e-r)/24,1)}(E,me,ie);I={temp:"absolute",bg:U,tick:A,eventualBG:me,insulinReq:0,reservoir:x,deliverAt:w,sensitivityRatio};var de=[],ce=[],ge=[],be=[];de.push(U),ce.push(U),be.push(U),ge.push(U);var fe=function(e,r,a,t){return r?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&t>100?(console.error("SMB disabled due to high temptarget of",t),!1):!0===a.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&a.mealCOB?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of",a.mealCOB),!0):!0===e.enableSMB_after_carbs&&a.carbs?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&t<100?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of",n(t,e)),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(h,M,_,E),pe=h.enableUAM,he=0,ve=0;he=o(P-ie,1);var _e=o(P-ie,1);csf=re/h.carb_ratio,console.error("profile.sens:"+n(h.sens,h)+", sens:"+n(re,h)+", CSF:"+o(csf,1));var Be=o(30*csf*5/60,1);he>Be&&(console.error("Limiting carb impact from "+he+" to "+Be+"mg/dL/5m (30g/h)"),he=Be);var Me=3;sensitivityRatio&&(Me/=sensitivityRatio);var xe=Me;if(_.carbs){Me=Math.max(Me,_.mealCOB/20);var ye=o((new Date(T).getTime()-_.lastCarbTime)/6e4),Se=(_.carbs-_.mealCOB)/_.carbs;xe=o(xe=Me+1.5*ye/60,1),console.error("Last carbs "+ye+" minutes ago; remainingCATime:"+xe+"hours; "+o(100*Se)+"% carbs absorbed")}var Ce=Math.max(0,he/5*60*xe/2)/csf,Fe=90,Ie=1;h.remainingCarbsCap&&(Fe=Math.min(90,h.remainingCarbsCap)),h.remainingCarbsFraction&&(Ie=Math.min(1,h.remainingCarbsFraction));var we=1-Ie,Ge=Math.max(0,_.mealCOB-Ce-_.carbs*we),Oe=(Ge=Math.min(Fe,Ge))*csf*5/60/(xe/2),Te=o(_.slopeFromMaxDeviation,2),Ae=o(_.slopeFromMinDeviation,2),Re=Math.min(Te,-Ae/3),De=0;0===he?ve=0:!0===h.floating_carbs?(ve=Math.min(60*xe/5/2,Math.max(0,_.carbs*csf/he)),De=Math.min(60*xe/5/2,Math.max(0,_.mealCOB*csf/he)),_.carbs>0&&(i+=", Floating Carbs:, CID: "+o(ve,1)+", MealCarbs: "+o(_.carbs,1)+", Not Floating:, CID: "+o(De,1)+", MealCOB: "+o(_.mealCOB,1),console.error("Floating Carbs CID: "+o(ve,1)+" / MealCarbs: "+o(_.carbs,1)+" vs. Not Floating:"+o(De,1)+" / MealCOB:"+o(_.mealCOB,1)))):ve=Math.min(60*xe/5/2,Math.max(0,_.mealCOB*csf/he)),console.error("Carb Impact:"+he+"mg/dL per 5m; CI Duration:"+o(5*ve/60*2,1)+"hours; remaining CI ("+xe/2+"h peak):",o(Oe,1)+"mg/dL per 5m");var Ue,je,Pe,ke,qe,Ee=999,We=999,ze=999,Le=U,Ne=999,Ze=999,$e=999,He=999,Je=me,Ke=U,Qe=U,Ve=0,Xe=[],Ye=[];try{te.forEach((function(e){var r=o(-e.activity*re*5,2),a=o(-e.iobWithZeroTemp.activity*re*5,2),t=he*(1-Math.min(1,ce.length/12));Je=ce[ce.length-1]+r+t;var n=be[be.length-1]+a,i=Math.max(0,Math.max(0,he)*(1-de.length/Math.max(2*ve,1))),s=Math.min(de.length,12*xe-de.length),l=Math.max(0,s/(xe/2*12)*Oe);i+l,Xe.push(o(l,0)),Ye.push(o(i,0)),COBpredBG=de[de.length-1]+r+Math.min(0,t)+i+l;var m=Math.max(0,_e+ge.length*Re),u=Math.max(0,_e*(1-ge.length/Math.max(36,1))),d=Math.min(m,u);d>0&&(Ve=o(5*(ge.length+1)/60,1)),UAMpredBG=ge[ge.length-1]+r+Math.min(0,t)+d,ce.length<48&&ce.push(Je),de.length<48&&de.push(COBpredBG),ge.length<48&&ge.push(UAMpredBG),be.length<48&&be.push(n),COBpredBG<Ne&&(Ne=o(COBpredBG)),UAMpredBG<Ze&&(Ze=o(UAMpredBG)),Je<$e&&($e=o(Je)),n<He&&(He=o(n));ce.length>18&&Je<Ee&&(Ee=o(Je)),Je>Ke&&(Ke=Je),(ve||Oe>0)&&de.length>18&&COBpredBG<We&&(We=o(COBpredBG)),(ve||Oe>0)&&COBpredBG>Ke&&(Qe=COBpredBG),pe&&ge.length>12&&UAMpredBG<ze&&(ze=o(UAMpredBG)),pe&&UAMpredBG>Ke&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}_.mealCOB&&(console.error("predCIs (mg/dL/5m):"+Ye.join(" ")),console.error("remainingCIs:      "+Xe.join(" "))),I.predBGs={},ce.forEach((function(e,r,a){a[r]=o(Math.min(401,Math.max(39,e)))}));for(var er=ce.length-1;er>12&&ce[er-1]===ce[er];er--)ce.pop();for(I.predBGs.IOB=ce,Pe=o(ce[ce.length-1]),be.forEach((function(e,r,a){a[r]=o(Math.min(401,Math.max(39,e)))})),er=be.length-1;er>6&&!(be[er-1]>=be[er]||be[er]<=E);er--)be.pop();if(I.predBGs.ZT=be,o(be[be.length-1]),_.mealCOB>0&&(he>0||Oe>0)){for(de.forEach((function(e,r,a){a[r]=o(Math.min(401,Math.max(39,e)))})),er=de.length-1;er>12&&de[er-1]===de[er];er--)de.pop();I.predBGs.COB=de,ke=o(de[de.length-1]),me=Math.max(me,o(de[de.length-1]))}if(he>0||Oe>0){if(pe){for(ge.forEach((function(e,r,a){a[r]=o(Math.min(401,Math.max(39,e)))})),er=ge.length-1;er>12&&ge[er-1]===ge[er];er--)ge.pop();I.predBGs.UAM=ge,qe=o(ge[ge.length-1]),ge[ge.length-1]&&(me=Math.max(me,o(ge[ge.length-1])))}I.eventualBG=me}console.error("UAM Impact:"+_e+"mg/dL per 5m; UAM Duration:"+Ve+"hours"),Ee=Math.max(39,Ee),We=Math.max(39,We),ze=Math.max(39,ze),Ue=o(Ee);var rr=_.mealCOB/_.carbs;je=o(ze<999&&We<999?(1-rr)*UAMpredBG+rr*COBpredBG:We<999?(Je+COBpredBG)/2:ze<999?(Je+UAMpredBG)/2:Je),He>je&&(je=He),Le=o(Le=ve||Oe>0?pe?rr*Ne+(1-rr)*Ze:Ne:pe?Ze:$e);var ar=ze;if(He<Y)ar=(ze+He)/2;else if(He<E){var tr=(He-Y)/(E-Y);ar=(ze+(ze*tr+He*(1-tr)))/2}else He>ze&&(ar=(ze+He)/2);if(ar=o(ar),_.carbs)if(!pe&&We<999)Ue=o(Math.max(Ee,We));else if(We<999){var or=rr*We+(1-rr)*ar;Ue=o(Math.max(Ee,We,or))}else Ue=pe?ar:Le;else pe&&(Ue=o(Math.max(Ee,ar)));Ue=Math.min(Ue,je),process.stderr.write("minPredBG: "+Ue+" minIOBPredBG: "+Ee+" minZTGuardBG: "+He),We<999&&process.stderr.write(" minCOBPredBG: "+We),ze<999&&process.stderr.write(" minUAMPredBG: "+ze),console.error(" avgPredBG:"+je+" COB/Carbs:"+_.mealCOB+"/"+_.carbs),Qe>U&&(Ue=Math.min(Ue,Qe)),I.COB=_.mealCOB,I.IOB=a.iob,I.BGI=n(ie,h),I.deviation=n(se,h),I.ISF=n(re,h),I.CR=o(h.carb_ratio,2),I.target_bg=n(E,h),I.reason=i+", COB: "+I.COB+", Dev: "+I.deviation+", BGI: "+I.BGI+", CR: "+I.CR+", Target: "+I.target_bg+", minPredBG "+n(Ue,h)+", minGuardBG "+n(Le,h)+", IOBpredBG "+n(Pe,h)+S,ke>0&&(I.reason+=", COBpredBG "+n(ke,h)),qe>0&&(I.reason+=", UAMpredBG "+n(qe,h)),I.reason+="; ";var nr=le;nr<40&&(nr=Math.min(Le,nr));var ir,sr=Y-nr,lr=240,mr=240;if(_.mealCOB>0&&(he>0||Oe>0)){for(er=0;er<de.length;er++)if(de[er]<W){lr=5*er;break}for(er=0;er<de.length;er++)if(de[er]<Y){mr=5*er;break}}else{for(er=0;er<ce.length;er++)if(ce[er]<W){lr=5*er;break}for(er=0;er<ce.length;er++)if(ce[er]<Y){mr=5*er;break}}fe&&Le<Y&&(console.error("minGuardBG "+n(Le,h)+" projected below "+n(Y,h)+" - disabling SMB"),fe=!1),void 0===h.maxDelta_bg_threshold&&(ir=.2),void 0!==h.maxDelta_bg_threshold&&(ir=Math.min(h.maxDelta_bg_threshold,.4)),q>ir*U&&(console.error("maxDelta "+n(q,h)+" > "+100*ir+"% of BG "+n(U,h)+" - disabling SMB"),I.reason+="maxDelta "+n(q,h)+" > "+100*ir+"% of BG "+n(U,h)+" - SMB disabled!, ",fe=!1),console.error("BG projected to remain above "+n(W,h)+" for "+lr+"minutes"),(mr<240||lr<60)&&console.error("BG projected to remain above "+n(Y,h)+" for "+mr+"minutes");var ur=mr,dr=h.current_basal*re*ur/60,cr=Math.max(0,_.mealCOB-.25*_.carbs),gr=(sr-dr)/csf-cr;dr=o(dr),gr=o(gr),console.error("naive_eventualBG:"+le+" bgUndershoot:"+sr+" zeroTempDuration:"+ur+" zeroTempEffect:"+dr+" carbsReq:"+gr),gr>=h.carbsReqThreshold&&mr<=45&&(I.carbsReq=gr,I.reason+=gr+" add'l carbs req w/in "+mr+"m; ");var br=0;if(U<Y&&a.iob<20*-h.current_basal/60&&P>0&&P>ue)I.reason+="IOB "+a.iob+" < "+o(20*-h.current_basal/60,2),I.reason+=" and minDelta "+n(P,h)+" > expectedDelta "+n(ue,h)+"; ";else if(U<Y||Le<Y)return I.reason+="minGuardBG "+n(Le,h)+"<"+n(Y,h),br=o(60*((sr=E-Le)/re)/h.current_basal),br=30*o(br/30),br=Math.min(120,Math.max(30,br)),B.setTempBasal(0,br,h,I,r);if(h.skip_neutral_temps&&I.deliverAt.getMinutes()>=55)return I.reason+="; Canceling temp at "+I.deliverAt.getMinutes()+"m past the hour. ",B.setTempBasal(0,0,h,I,r);var fr=0,pr=O;if(me<W){if(I.reason+="Eventual BG "+n(me,h)+" < "+n(W,h),P>ue&&P>0&&!gr)return le<40?(I.reason+=", naive_eventualBG < 40. ",B.setTempBasal(0,30,h,I,r)):(e.delta>P?I.reason+=", but Delta "+n(A,h)+" > expectedDelta "+n(ue,h):I.reason+=", but Min. Delta "+P.toFixed(2)+" > Exp. Delta "+n(ue,h),r.duration>15&&t(O,h)===t(r.rate,h)?(I.reason+=", temp "+r.rate+" ~ req "+O+"U/hr. ",I):(I.reason+="; setting current basal of "+O+" as temp. ",B.setTempBasal(O,30,h,I,r)));fr=o(fr=2*Math.min(0,(me-E)/re),2);var hr=Math.min(0,(le-E)/re);if(hr=o(hr,2),P<0&&P>ue)fr=o(fr*(P/ue),2);if(pr=t(pr=O+2*fr,h),r.duration*(r.rate-O)/60<Math.min(fr,hr)-.3*O)return I.reason+=", "+r.duration+"m@"+r.rate.toFixed(2)+" is a lot less than needed. ",B.setTempBasal(pr,30,h,I,r);if(void 0!==r.rate&&r.duration>5&&pr>=.8*r.rate)return I.reason+=", temp "+r.rate+" ~< req "+pr+"U/hr. ",I;if(pr<=0){if((br=o(60*((sr=E-le)/re)/h.current_basal))<0?br=0:(br=30*o(br/30),br=Math.min(120,Math.max(0,br))),br>0)return I.reason+=", setting "+br+"m zero temp. ",B.setTempBasal(pr,br,h,I,r)}else I.reason+=", setting "+pr+"U/hr. ";return B.setTempBasal(pr,30,h,I,r)}if(P<ue&&(!M||!fe))return e.delta<P?I.reason+="Eventual BG "+n(me,h)+" > "+n(W,h)+" but Delta "+n(A,h)+" < Exp. Delta "+n(ue,h):I.reason+="Eventual BG "+n(me,h)+" > "+n(W,h)+" but Min. Delta "+P.toFixed(2)+" < Exp. Delta "+n(ue,h),r.duration>15&&t(O,h)===t(r.rate,h)?(I.reason+=", temp "+r.rate+" ~ req "+O+"U/hr. ",I):(I.reason+="; setting current basal of "+O+" as temp. ",B.setTempBasal(O,30,h,I,r));if(Math.min(me,Ue)<z&&(!M||!fe))return I.reason+=n(me,h)+"-"+n(Ue,h)+" in range: no temp required",r.duration>15&&t(O,h)===t(r.rate,h)?(I.reason+=", temp "+r.rate+" ~ req "+O+"U/hr. ",I):(I.reason+="; setting current basal of "+O+" as temp. ",B.setTempBasal(O,30,h,I,r));if(me>=z&&(I.reason+="Eventual BG "+n(me,h)+" >= "+n(z,h)+", "),a.iob>L)return I.reason+="IOB "+o(a.iob,2)+" > max_iob "+L,r.duration>15&&t(O,h)===t(r.rate,h)?(I.reason+=", temp "+r.rate+" ~ req "+O+"U/hr. ",I):(I.reason+="; setting current basal of "+O+" as temp. ",B.setTempBasal(O,30,h,I,r));(fr=o((Math.min(Ue,me)-E)/re,2))>L-a.iob&&(I.reason+="max_iob "+L+", ",fr=L-a.iob),pr=t(pr=O+2*fr,h),fr=o(fr,3),I.insulinReq=fr;var vr=o((new Date(T).getTime()-a.lastBolusTime)/6e4,1);if(M&&fe&&U>Y){var _r=o(_.mealCOB/h.carb_ratio,3);if(h.use_autoisf)Br=h.smb_max_range_extension;else{console.error("autoISF disabled, SMB range extension disabled");var Br=1}Br>1&&console.error("SMB max range extended from default by factor "+Br);var Mr=0;void 0===h.maxSMBBasalMinutes?(Mr=o(Br*h.current_basal*30/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m")):a.iob>_r&&a.iob>0?(console.error("IOB",a.iob,"> COB",_.mealCOB+"; mealInsulinReq =",_r),h.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes:",h.maxUAMSMBBasalMinutes,"profile.current_basal:",h.current_basal),Mr=o(Br*h.current_basal*h.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),Mr=o(30*h.current_basal/60,1))):(console.error("profile.maxSMBBasalMinutes:",h.maxSMBBasalMinutes,"profile.current_basal:",h.current_basal),Mr=o(Br*h.current_basal*h.maxSMBBasalMinutes/60,1));var xr=h.bolus_increment,yr=1/xr;if(h.use_autoisf)var Sr=p(h,U,E);else console.error("autoISF disabled, don't adjust SMB Delivery Ratio"),Sr=.5;Sr>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o(Sr,2));var Cr=Math.min(fr*Sr,Mr);Cr=Math.floor(Cr*yr)/yr,br=o(60*((E-(le+Ee)/2)/re)/h.current_basal),fr>0&&Cr<xr&&(br=0);var Fr=0;br<=0?br=0:br>=30?(br=30*o(br/30),br=Math.min(60,Math.max(0,br))):(Fr=o(O*br/30,2),br=30),I.reason+=" insulinReq "+fr,Cr>=Mr&&(I.reason+="; maxBolus "+Mr),br>0&&(I.reason+="; setting "+br+"m low temp of "+Fr+"U/h"),I.reason+=". ";var Ir=3;h.SMBInterval&&(Ir=Math.min(10,Math.max(1,h.SMBInterval)));var wr=o(Ir-vr,0),Gr=o(60*(Ir-vr),0)%60;if(console.error("naive_eventualBG",le+",",br+"m "+Fr+"U/h temp needed; last bolus",vr+"m ago; maxBolus: "+Mr),vr>Ir?Cr>0&&(I.units=Cr,I.reason+="Microbolusing "+Cr+"U. "):I.reason+="Waiting "+wr+"m "+Gr+"s to microbolus again. ",br>0)return I.rate=Fr,I.duration=br,I}var Or=B.getMaxSafeBasal(h);return pr>Or&&(I.reason+="adj. req. rate: "+pr+" to maxSafeBasal: "+Or+", ",pr=t(Or,h)),r.duration*(r.rate-O)/60>=2*fr?(I.reason+=r.duration+"m@"+r.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+pr+"U/hr. ",B.setTempBasal(pr,30,h,I,r)):void 0===r.duration||0===r.duration?(I.reason+="no temp, setting "+pr+"U/hr. ",B.setTempBasal(pr,30,h,I,r)):r.duration>5&&t(pr,h)<=t(r.rate,h)?(I.reason+="temp "+r.rate+" >~ req "+pr+"U/hr. ",I):(I.reason+="temp "+r.rate+"<"+pr+"U/hr. ",B.setTempBasal(pr,30,h,I,r))}},6880:(e,r,a)=>{var t=a(6654);e.exports=function(e,r){var a=20;void 0!==r&&"string"==typeof r.model&&(t(r.model,"54")||t(r.model,"23"))&&(a=40);return e<1?Math.round(e*a)/a:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,r,a)=>{var t=a(5639).Symbol;e.exports=t},9932:e=>{e.exports=function(e,r){for(var a=-1,t=null==e?0:e.length,o=Array(t);++a<t;)o[a]=r(e[a],a,e);return o}},9750:e=>{e.exports=function(e,r,a){return e==e&&(void 0!==a&&(e=e<=a?e:a),void 0!==r&&(e=e>=r?e:r)),e}},4239:(e,r,a)=>{var t=a(2705),o=a(9607),n=a(2333),i=t?t.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):n(e)}},531:(e,r,a)=>{var t=a(2705),o=a(9932),n=a(1469),i=a(3448),s=t?t.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(r){if("string"==typeof r)return r;if(n(r))return o(r,e)+"";if(i(r))return l?l.call(r):"";var a=r+"";return"0"==a&&1/r==-Infinity?"-0":a}},7561:(e,r,a)=>{var t=a(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,t(e)+1).replace(o,""):e}},1957:(e,r,a)=>{var t="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=t},9607:(e,r,a)=>{var t=a(2705),o=Object.prototype,n=o.hasOwnProperty,i=o.toString,s=t?t.toStringTag:void 0;e.exports=function(e){var r=n.call(e,s),a=e[s];try{e[s]=void 0;var t=!0}catch(e){}var o=i.call(e);return t&&(r?e[s]=a:delete e[s]),o}},2333:e=>{var r=Object.prototype.toString;e.exports=function(e){return r.call(e)}},5639:(e,r,a)=>{var t=a(1957),o="object"==typeof self&&self&&self.Object===Object&&self,n=t||o||Function("return this")();e.exports=n},7990:e=>{var r=/\s/;e.exports=function(e){for(var a=e.length;a--&&r.test(e.charAt(a)););return a}},6654:(e,r,a)=>{var t=a(9750),o=a(531),n=a(554),i=a(9833);e.exports=function(e,r,a){e=i(e),r=o(r);var s=e.length,l=a=void 0===a?s:t(n(a),0,s);return(a-=r.length)>=0&&e.slice(a,l)==r}},1469:e=>{var r=Array.isArray;e.exports=r},3218:e=>{e.exports=function(e){var r=typeof e;return null!=e&&("object"==r||"function"==r)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,r,a)=>{var t=a(4239),o=a(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==t(e)}},8601:(e,r,a)=>{var t=a(4841),o=1/0;e.exports=function(e){return e?(e=t(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,r,a)=>{var t=a(8601);e.exports=function(e){var r=t(e),a=r%1;return r==r?a?r-a:r:0}},4841:(e,r,a)=>{var t=a(7561),o=a(3218),n=a(3448),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,m=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var r="function"==typeof e.valueOf?e.valueOf():e;e=o(r)?r+"":r}if("string"!=typeof e)return 0===e?e:+e;e=t(e);var a=s.test(e);return a||l.test(e)?m(e.slice(2),a?2:8):i.test(e)?NaN:+e}},9833:(e,r,a)=>{var t=a(531);e.exports=function(e){return null==e?"":t(e)}}},r={};function a(t){var o=r[t];if(void 0!==o)return o.exports;var n=r[t]={exports:{}};return e[t](n,n.exports,a),n.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var t=a(5546);freeaps_determineBasal=t})();