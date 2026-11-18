(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[504],{1702:()=>{},9504:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>f});var a=o(299),r=o(8891);o(1702);let i={"top-left":{anchor:[0,-.2],dir:[0,1]},"top-center":{anchor:[.5,-.2],dir:[0,1]},"top-right":{anchor:[1,-.2],dir:[0,1]},left:{anchor:[-.2,.5],dir:[1,0]},right:{anchor:[1.2,.5],dir:[-1,0]},"bottom-left":{anchor:[0,1.2],dir:[0,-1]},"bottom-center":{anchor:[.5,1.2],dir:[0,-1]},"bottom-right":{anchor:[1,1.2],dir:[0,-1]}},n=`#version 300 es
const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() {
  gl_Position = vec4(corners[gl_VertexID], 0.0, 1.0);
}`,l=`#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uScale;
uniform float uTime;
uniform vec2 uSource;
uniform vec2 uAim;
uniform float uReach;
uniform vec3 uColor;
uniform float uSpread;
uniform float uLength;
uniform float uFade;
uniform float uSaturation;
uniform float uPulsating;
uniform float uNoise;
uniform float uDistortion;
uniform float uDensity;
uniform float uSharpness;
uniform float uGlow;
uniform float uHaze;
uniform float uAtmosphere;
uniform float uIntensity;
uniform vec4 uShadow;
uniform vec4 uPulses[4];
uniform vec2 uIntro;
uniform float uLight;
uniform float uOpacity;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = p - i;
  vec2 w = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), w.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), w.x), w.y);
}

float shape(float strength, float width) {
  float edge = max(mix(0.5, 0.08, uSharpness), width);
  return mix(strength, smoothstep(0.62 - edge, 0.62 + edge, strength), uSharpness);
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y) / uScale;
  vec2 delta = coord - uSource;
  float distance = length(delta);
  vec2 dir = delta / max(distance, 1e-4);
  float cosAngle = dot(dir, uAim);
  float angle = cosAngle + uDistortion * sin(uTime * 2.0 + distance * 0.02) * 0.2;
  float slope = fwidth(angle);
  float depth = distance / uReach;

  float source = exp(-depth * depth * 9.0) * 0.9 + exp(-depth * 3.2) * 0.25;
  float glowLight = uGlow * source * smoothstep(-0.2, 0.6, cosAngle);
  float spread = pow(max(angle, 0.0), 1.0 / uSpread);
  float lengthFalloff = clamp(1.0 - distance / (uReach * uLength), 0.0, 1.0);
  float fadeFalloff = clamp(1.0 - distance / (uReach * uFade), 0.5, 1.0);
  float envelope = spread * lengthFalloff * fadeFalloff;
  float reveal = uIntensity * uIntro.y * (1.0 - smoothstep(uIntro.x - 0.35, uIntro.x, depth));
  if ((envelope * 1.6 + glowLight) * reveal < 0.0015) {
    fragColor = vec4(0.0);
    return;
  }

  float phaseA = angle * 36.2214 * uDensity + uTime * 1.5;
  float phaseB = -angle * 21.11349 * uDensity + uTime * 1.5;
  float phaseC = angle * 22.3991 * uDensity + uTime * 1.1;
  float phaseD = -angle * 18.0234 * uDensity + uTime * 1.1;
  float strengthA = clamp(0.75 + 0.15 * sin(phaseA) + 0.2 * cos(phaseB), 0.0, 1.0);
  float strengthB = clamp(0.75 + 0.15 * sin(phaseC) + 0.2 * cos(phaseD), 0.0, 1.0);
  float widthA = abs(0.15 * 36.2214 * cos(phaseA) + 0.2 * 21.11349 * sin(phaseB)) * uDensity * slope;
  float widthB = abs(0.15 * 22.3991 * cos(phaseC) + 0.2 * 18.0234 * sin(phaseD)) * uDensity * slope;
  float pulseA = uPulsating > 0.5 ? 0.8 + 0.2 * sin(uTime * 4.5) : 1.0;
  float pulseB = uPulsating > 0.5 ? 0.8 + 0.2 * sin(uTime * 3.3) : 1.0;
  float rayLight = envelope * (0.5 * shape(strengthA, widthA) * pulseA + 0.4 * shape(strengthB, widthB) * pulseB);

  if (uHaze > 0.0) {
    float around = atan(uAim.x * dir.y - uAim.y * dir.x, cosAngle);
    vec2 drift = vec2(around * 2.2 + uTime * 0.035, depth * 2.6 - uTime * 0.11);
    float fog = 0.65 * valueNoise(drift * vec2(3.0, 1.0)) + 0.35 * valueNoise(drift * vec2(7.0, 2.3) + 4.1);
    rayLight *= mix(1.0, 0.25 + 1.2 * fog, uHaze);
  }

  if (uShadow.z > 0.0) {
    vec2 toCursor = uShadow.xy - uSource;
    float cursorDistance = length(toCursor);
    float along = dot(delta, toCursor) / max(cursorDistance * cursorDistance, 1e-4);
    float side = abs(delta.x * toCursor.y - delta.y * toCursor.x) / max(cursorDistance, 1e-4);
    float trail = max(along - 1.0, 0.0);
    float width = uShadow.w * along + 0.22 * trail * cursorDistance;
    float behind = smoothstep(0.97, 1.25, along) * exp(-trail * 1.1);
    float shade = (1.0 - smoothstep(width * 0.3, width * 1.6, side)) * behind;
    rayLight *= 1.0 - uShadow.z * 0.62 * shade;
  }

  float boost = 0.0;
  for (int i = 0; i < 4; i++) {
    vec4 wave = uPulses[i];
    if (wave.z <= 0.0) continue;
    float x = (depth - wave.x) / wave.y;
    boost += wave.z * exp(-x * x);
  }
  float light = (rayLight * (1.0 + boost) + glowLight) * reveal;

  if (uNoise > 0.0) {
    float n = fract(sin(dot(coord * 0.02 + uTime * 0.1, vec2(12.9898, 78.233))) * 43758.5453123);
    light *= 1.0 - uNoise + uNoise * n;
  }

  float near = clamp(1.2 - distance / (uResolution.y / uScale), 0.0, 1.0);
  vec3 tint = mix(vec3(0.9), vec3(0.1, 0.3, 0.5) + near * vec3(0.8, 0.6, 0.5), uAtmosphere);
  float gray = dot(tint, vec3(0.299, 0.587, 0.114));
  vec3 hue = max(mix(vec3(gray), tint, uSaturation), 0.0) * uColor;

  float grain = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0;
  if (uLight > 0.5) {
    vec3 color = hue * light;
    float energy = max(color.r, max(color.g, color.b));
    vec3 tone = clamp(1.0 - (1.0 - hue / max(max(hue.r, max(hue.g, hue.b)), 1e-4)) * 1.8, 0.0, 1.0);
    float warm = clamp((min(tone.r, tone.g) - tone.b) * 2.0, 0.0, 1.0);
    vec3 ink = tone * (mix(0.66, 0.94, warm) - 0.1 * smoothstep(0.4, 1.2, energy));
    float density = clamp(0.82 * (1.0 - exp(-1.5 * energy * energy)) * uOpacity + grain, 0.0, 1.0);
    fragColor = vec4(ink * density, density);
    return;
  }
  float level = light < 0.75 ? light : 0.75 + 0.25 * (1.0 - exp(-(light - 0.75) / 0.25));
  float top = max(hue.r, max(hue.g, hue.b));
  hue = mix(hue, vec3(top), smoothstep(0.8, 1.0, level) * 0.45);
  vec3 shown = clamp(hue * level, 0.0, 1.0) * level;
  fragColor = vec4(clamp(shown + grain, 0.0, level) * uOpacity, level * uOpacity);
}`,s=(e,t,o)=>Math.min(o,Math.max(t,e)),u=(e,t,o)=>{let a=e.createShader(t);return a?(e.shaderSource(a,o),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS))?a:(console.error(e.getShaderInfoLog(a)),e.deleteShader(a),null):null},h=e=>{let t=s(e,0,1);return t*t*t*(t*(6*t-15)+10)},f=({raysOrigin:e="top-center",raysColor:t="#ffffff",raysSpeed:o=1,lightSpread:f=.5,rayLength:c=3,rayDensity:d=1,tilt:m=0,raySharpness:p=.35,glow:g=.6,haze:v=.25,atmosphere:x=1,intensity:w=1,pulsating:y=!1,fadeDistance:S=1,saturation:M=1,followMouse:A=!0,mouseInfluence:b=.1,cursorShadow:L=!0,clickPulse:E=!0,noiseAmount:C=0,distortion:R=0,intro:P=!0,lightMode:D=!1,opacity:T=1,maxDevicePixelRatio:I=2,className:F="",style:_})=>{let N=(0,r.useRef)(null),B=(0,r.useRef)(null),z=(0,r.useRef)(null),[O,k]=(0,r.useState)(0),H={origin:i[e]||i["top-center"],color:(e=>{let t=String(e||"").trim(),o=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);if(o){let e=3===o[1].length?o[1].replace(/./g,e=>e+e):o[1];return[0,2,4].map(t=>parseInt(e.slice(t,t+2),16)/255)}let a=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(t);return a?[a[1],a[2],a[3]].map(e=>s(parseFloat(e)/255,0,1)):null})(t)||[1,1,1],speed:Math.max(0,o),spread:Math.max(.001,f),length:Math.max(.01,c),density:s(d,.1,6),tilt:s(m,-90,90)*Math.PI/180,sharpness:s(p,0,1),glow:Math.max(0,g),haze:s(v,0,1),atmosphere:s(x,0,1),intensity:Math.max(0,w),pulsating:y,fade:Math.max(.01,S),saturation:Math.max(0,M),follow:A,influence:s(b,0,1),cursorShadow:L,clickPulse:E,noise:s(C,0,1),distortion:R,intro:P,light:D,opacity:s(T,0,1),maxRatio:s(I,.5,3)},U=(0,r.useRef)(H);return U.current=H,(0,r.useEffect)(()=>{z.current?.()}),(0,r.useEffect)(()=>{let e=N.current,t=B.current;if(!e||!t)return;let o=t.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"}),a=o?(e=>{let t=u(e,e.VERTEX_SHADER,n),o=u(e,e.FRAGMENT_SHADER,l),a=t&&o?e.createProgram():null;if(!t||!o||!a)return t&&e.deleteShader(t),o&&e.deleteShader(o),null;if(e.attachShader(a,t),e.attachShader(a,o),e.linkProgram(a),e.deleteShader(t),e.deleteShader(o),!e.getProgramParameter(a,e.LINK_STATUS))return console.error(e.getProgramInfoLog(a)),e.deleteProgram(a),null;let r={},i=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let t=0;t<i;t++){let o=e.getActiveUniform(a,t);o&&(r[o.name.replace(/\[0\]$/,"")]=e.getUniformLocation(a,o.name))}return{program:a,uniforms:r}})(o):null;if(!o||!a)return;let r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,i=o.createVertexArray(),f={width:1,height:1,ratio:1},c={x:.5,y:.5,inside:!1,seen:!1},d={x:.5,y:.5},m={x:.5,y:.5,presence:0},p=[],g=new Float32Array(16),v=0,x=U.current.intro&&!r&&0===O?0:1,w=0,y=0,S=!0,M="hidden"!==document.visibilityState,A=!1,b=!1,L=()=>{b=!0,C()},E=n=>{if(w=0,b){let o,a,r,i,n,l,u,h;b=!1,o=U.current,r=Math.max(1,(a=e.getBoundingClientRect()).width),i=Math.max(1,a.height),n=Math.max(s(.35+.3*(o.density*(.35+.65*o.sharpness)),.5,2),+(o.noise>0)),l=Math.min(window.devicePixelRatio||1,o.maxRatio,n,Math.sqrt(24e5/(r*i))),u=Math.max(1,Math.round(r*l)),h=Math.max(1,Math.round(i*l)),(t.width!==u||t.height!==h)&&(t.width=u,t.height=h),f.width=r,f.height=i,f.ratio=u/r}if(A)return;let l=U.current,u=s((n-y)/1e3||0,0,.05);y=Math.max(y,n),v+=u*l.speed*(r?.35:1),x<1&&(x=Math.min(1,x+u/1.8));let L=1-Math.exp(-u/.2),C=l.follow&&c.seen?c.x:.5,R=l.follow&&c.seen?c.y:.5;d.x+=(C-d.x)*L,d.y+=(R-d.y)*L;let P=1-Math.exp(-u/.08);m.x+=(c.x-m.x)*P,m.y+=(c.y-m.y)*P;let D=c.inside&&l.cursorShadow&&!r;m.presence+=(!!D-m.presence)*(1-Math.exp(-u/(D?.25:.5)));for(let e=p.length-1;e>=0;e--)p[e].age+=u,p[e].age>=2&&p.splice(e,1);g.fill(0),p.forEach((e,t)=>{let o=e.age;g[4*t]=.05+1.05*o,g[4*t+1]=.14+.14*o,g[4*t+2]=.9*h(o/.15)*(1-h(o/2))});let T=f.width,I=f.height,F=l.origin.anchor[0]*T,_=l.origin.anchor[1]*I,N=Math.cos(l.tilt),B=Math.sin(l.tilt),z=l.origin.dir[0]*N-l.origin.dir[1]*B,O=l.origin.dir[0]*B+l.origin.dir[1]*N;if(l.follow&&l.influence>0){let e=d.x*T-F,t=d.y*I-_,o=Math.hypot(e,t)||1,a=z+(e/o-z)*l.influence,r=O+(t/o-O)*l.influence,i=Math.hypot(a,r)||1;z=a/i,O=r/i}let k=1-Math.pow(1-x,3);o.viewport(0,0,t.width,t.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.useProgram(a.program),o.bindVertexArray(i);let H=a.uniforms;o.uniform2f(H.uResolution,t.width,t.height),o.uniform1f(H.uScale,f.ratio),o.uniform1f(H.uTime,v),o.uniform2f(H.uSource,F,_),o.uniform2f(H.uAim,z,O),o.uniform1f(H.uReach,Math.max(T,I)),o.uniform3f(H.uColor,l.color[0],l.color[1],l.color[2]),o.uniform1f(H.uSpread,l.spread),o.uniform1f(H.uLength,l.length),o.uniform1f(H.uFade,l.fade),o.uniform1f(H.uSaturation,l.saturation),o.uniform1f(H.uPulsating,+!!l.pulsating),o.uniform1f(H.uNoise,l.noise),o.uniform1f(H.uDistortion,l.distortion),o.uniform1f(H.uDensity,l.density),o.uniform1f(H.uSharpness,l.sharpness),o.uniform1f(H.uGlow,l.glow),o.uniform1f(H.uHaze,l.haze),o.uniform1f(H.uAtmosphere,l.atmosphere),o.uniform1f(H.uIntensity,l.intensity),o.uniform4f(H.uShadow,m.x*T,m.y*I,m.presence,16),o.uniform4fv(H.uPulses,g),o.uniform2f(H.uIntro,2.6*k,h(x/.5)),o.uniform1f(H.uLight,+!!l.light),o.uniform1f(H.uOpacity,l.opacity),o.drawArrays(o.TRIANGLES,0,3);let V=Math.abs(d.x-C)>1e-4||Math.abs(d.y-R)>1e-4||m.presence>.001&&Math.abs(m.x-c.x)+Math.abs(m.y-c.y)>1e-4||Math.abs(!!D-m.presence)>.001||p.length>0;(l.speed>0||x<1||V)&&S&&M&&(w=requestAnimationFrame(E))},C=()=>{!w&&!A&&S&&M&&(y=performance.now(),w=requestAnimationFrame(E))};z.current=()=>{L(),C()};let R=t=>{let o=e.getBoundingClientRect();return{x:(t.clientX-o.left)/Math.max(1,o.width),y:(t.clientY-o.top)/Math.max(1,o.height),inside:t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom}},P=e=>{let t=R(e);!c.inside&&t.inside&&(m.x=t.x,m.y=t.y),c.x=t.x,c.y=t.y,c.inside=t.inside,c.seen=!0,C()},D=e=>{let t=U.current;R(e).inside&&t.clickPulse&&!r&&(p.push({age:0}),p.length>4&&p.shift(),C())},T=()=>{c.inside=!1,C()},I=e=>{"mouse"!==e.pointerType&&T()};window.addEventListener("pointermove",P,{passive:!0}),window.addEventListener("pointerdown",D,{passive:!0}),window.addEventListener("pointerup",I,{passive:!0}),window.addEventListener("pointercancel",I,{passive:!0}),document.documentElement.addEventListener("pointerleave",T);let F=e=>{e.preventDefault(),A=!0,cancelAnimationFrame(w),w=0},_=()=>k(e=>e+1);t.addEventListener("webglcontextlost",F),t.addEventListener("webglcontextrestored",_);let H=new ResizeObserver(()=>{L(),C()});H.observe(e);let V=new IntersectionObserver(e=>{S=e.some(e=>e.isIntersecting),C()});V.observe(e);let G=()=>{M="hidden"!==document.visibilityState,C()};return document.addEventListener("visibilitychange",G),L(),C(),()=>{cancelAnimationFrame(w),z.current=null,H.disconnect(),V.disconnect(),window.removeEventListener("pointermove",P),window.removeEventListener("pointerdown",D),window.removeEventListener("pointerup",I),window.removeEventListener("pointercancel",I),document.documentElement.removeEventListener("pointerleave",T),document.removeEventListener("visibilitychange",G),t.removeEventListener("webglcontextlost",F),t.removeEventListener("webglcontextrestored",_),o.isContextLost()||(o.deleteVertexArray(i),o.deleteProgram(a.program))}},[O]),(0,a.jsx)("div",{ref:N,className:`light-rays${F?` ${F}`:""}`,style:_,children:(0,a.jsx)("canvas",{ref:B,className:"light-rays__canvas","aria-hidden":"true"})})}}}]);