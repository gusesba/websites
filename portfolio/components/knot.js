// Parametric trefoil tube. UV coordinates keep the copper filaments continuous through the knot.
const TAU = Math.PI * 2;
const normalize = (v) => v.map((n) => n / Math.hypot(...v));
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];

function geometry() {
  const vertices = [], indices = [];
  const segments = 270, sides = 48;
  for (let i = 0; i <= segments; i++) {
    const t = TAU * i / segments;
    const center = [Math.sin(t) + 2*Math.sin(2*t), Math.cos(t) - 2*Math.cos(2*t), -1.32*Math.sin(3*t)];
    const tangent = normalize([Math.cos(t) + 4*Math.cos(2*t), -Math.sin(t) + 4*Math.sin(2*t), -3.96*Math.cos(3*t)]);
    const u = normalize(cross(tangent, [0, 0, 1])), v = cross(tangent, u);
    for (let j = 0; j <= sides; j++) {
      const angle = TAU * j / sides;
      const normal = u.map((n, k) => n * Math.cos(angle) + v[k] * Math.sin(angle));
      vertices.push(...center.map((n, k) => n + 0.79 * normal[k]), ...normal, i/segments, j/sides);
      if (i < segments && j < sides) {
        const a = i*(sides+1) + j, b = a+sides+1;
        indices.push(a, b, a+1, b, b+1, a+1);
      }
    }
  }
  return [new Float32Array(vertices), new Uint16Array(indices)];
}

const vertexSource = `
  attribute vec3 position, normal;
  attribute vec2 uv;
  uniform vec2 rotation, scale;
  varying vec3 surface;
  varying vec2 grid;
  varying vec3 location;
  void main() {
    float a = rotation.x, b = rotation.y, c = -0.35;
    mat3 x = mat3(1.,0.,0., 0.,cos(a),sin(a), 0.,-sin(a),cos(a));
    mat3 y = mat3(cos(b),0.,-sin(b), 0.,1.,0., sin(b),0.,cos(b));
    mat3 z = mat3(cos(c),sin(c),0., -sin(c),cos(c),0., 0.,0.,1.);
    mat3 view = z*x*y;
    vec3 p = view * position;
    surface = view * normal;
    location = p;
    grid = uv;
    gl_Position = vec4(p.xy * scale, -p.z * .09, 1. - p.z*.022);
  }`;

const fragmentSource = `
  precision highp float;
  varying vec3 surface;
  varying vec2 grid;
  varying vec3 location;
  void main() {
    vec3 n = normalize(surface);
    float key = max(dot(n, normalize(vec3(-.56,.8,.5))), 0.);
    float edge = pow(1.-abs(n.z), 2.);
    float gleam = pow(max(dot(n,normalize(vec3(-.37,.63,.68))),0.), 9.);
    float bounce = pow(max(dot(n,normalize(vec3(.6,-.3,.9))),0.), 7.);
    float thread = .5+.5*cos(grid.x*6.2831853*237.);
    float weave = .5+.5*cos(grid.y*6.2831853*50.);
    float rib = smoothstep(.28,.98,thread);
    float depth = smoothstep(-2.8,1.4,location.z);
    vec3 copper = vec3(.89,.30,.10);
    vec3 base = vec3(.085,.026,.014) + copper*(.06+.32*key);
    vec3 filament = copper*(.29+.68*key) + vec3(1.,.64,.41)*(.66*gleam+.27*edge);
    vec3 color = mix(base,filament,rib) + vec3(.16,.07,.036)*bounce + vec3(.036,.017,.008)*weave;
    color *= .51+.49*depth;
    gl_FragColor = vec4(color,1.);
  }`;

export function createKnot(canvas) {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
  if (!gl) return null;
  const program = gl.createProgram();
  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]]) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); return null; }
  gl.useProgram(program);
  const [vertices, indices] = geometry();
  const vertexBuffer = gl.createBuffer(), indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  for (const [name, size, offset] of [['position',3,0], ['normal',3,12], ['uv',2,24]]) {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 32, offset);
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  gl.enable(gl.DEPTH_TEST);
  const rotation = gl.getUniformLocation(program, 'rotation'), scale = gl.getUniformLocation(program, 'scale');
  return {
    draw(pitch, yaw) {
      const { width, height } = canvas;
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniform2f(rotation, pitch, yaw);
      const size = Math.min(width, height) / 3.93;
      gl.uniform2f(scale, size / width, size / height);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    },
    dispose() {
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
    },
  };
}
