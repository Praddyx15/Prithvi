// ===================================
// SILK BACKGROUND EFFECT
// WebGL shader-based animated background
// ===================================

class SilkBackground {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        this.options = {
            speed: options.speed || 5,
            scale: options.scale || 1,
            color: options.color || '#8B6F47', // Lighter brown for better contrast
            noiseIntensity: options.noiseIntensity || 1.5,
            rotation: options.rotation || 0,
            opacity: options.opacity || 0.4, // Add opacity control
            ...options
        };

        this.init();
    }

    hexToNormalizedRGB(hex) {
        hex = hex.replace('#', '');
        return [
            parseInt(hex.slice(0, 2), 16) / 255,
            parseInt(hex.slice(2, 4), 16) / 255,
            parseInt(hex.slice(4, 6), 16) / 255
        ];
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '0';
        this.canvas.style.opacity = this.options.opacity;
        this.container.style.position = 'relative';
        this.container.insertBefore(this.canvas, this.container.firstChild);

        // Setup Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create shader material
        const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vPosition = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

        const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      uniform float uTime;
      uniform vec3  uColor;
      uniform float uSpeed;
      uniform float uScale;
      uniform float uRotation;
      uniform float uNoiseIntensity;
      
      const float e = 2.71828182845904523536;
      
      float noise(vec2 texCoord) {
        float G = e;
        vec2  r = (G * sin(G * texCoord));
        return fract(r.x * r.y * (1.0 + texCoord.x));
      }
      
      vec2 rotateUvs(vec2 uv, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        mat2  rot = mat2(c, -s, s, c);
        return rot * uv;
      }
      
      void main() {
        float rnd        = noise(gl_FragCoord.xy);
        vec2  uv         = rotateUvs(vUv * uScale, uRotation);
        vec2  tex        = uv * uScale;
        float tOffset    = uSpeed * uTime;
        
        tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
        
        float pattern = 0.6 +
                        0.4 * sin(5.0 * (tex.x + tex.y +
                                         cos(3.0 * tex.x + 5.0 * tex.y) +
                                         0.02 * tOffset) +
                                 sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));
        
        vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
        col.a = 1.0;
        gl_FragColor = col;
      }
    `;

        this.uniforms = {
            uSpeed: { value: this.options.speed },
            uScale: { value: this.options.scale },
            uNoiseIntensity: { value: this.options.noiseIntensity },
            uColor: { value: new THREE.Color(...this.hexToNormalizedRGB(this.options.color)) },
            uRotation: { value: this.options.rotation },
            uTime: { value: 0 }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true
        });

        // Create plane
        const geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // Handle resize
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());

        // Start animation
        this.animate();
    }

    handleResize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;

        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.uniforms.uTime.value += 0.01;
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        window.removeEventListener('resize', this.handleResize);
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Auto-initialize silk backgrounds
function initSilkBackgrounds() {
    const elements = document.querySelectorAll('[data-silk-background]');

    elements.forEach(element => {
        const color = element.getAttribute('data-silk-color') || '#8B6F47';
        const speed = parseFloat(element.getAttribute('data-silk-speed')) || 5;
        const scale = parseFloat(element.getAttribute('data-silk-scale')) || 1;
        const opacity = parseFloat(element.getAttribute('data-silk-opacity')) || 0.4;

        // Set an ID if not present
        if (!element.id) {
            element.id = 'silk-' + Math.random().toString(36).substr(2, 9);
        }

        new SilkBackground(element.id, {
            color: color,
            speed: speed,
            scale: scale,
            opacity: opacity
        });
    });
}

// Load Three.js and initialize
if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSilkBackgrounds);
        } else {
            initSilkBackgrounds();
        }
    };
    document.head.appendChild(script);
} else {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSilkBackgrounds);
    } else {
        initSilkBackgrounds();
    }
}
