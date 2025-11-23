const wishMessage = "di hari spesialmu ini, aku berdoa semoga kebahagiaan selalu menyertaimu. kamu itu orangnya lucu, ngangenin, terkadang suka keinget kamu waktu ketawa ";
        let typingIndex = 0;
        let isTyping = false;

        function nextPage(pageNumber) {
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            const targetPage = document.getElementById(`page-${pageNumber}`);
            if (targetPage) targetPage.classList.add('active');

            if (pageNumber === 3) {
                if (!isTyping) startTypingEffect();
            } else {
                typingIndex = 0; 
                isTyping = false;
                document.getElementById('typing-text').innerHTML = "";
            }
        }

        function startTypingEffect() {
            const textElement = document.getElementById('typing-text');
            textElement.innerHTML = ""; 
            typingIndex = 0;
            isTyping = true;
            function type() {
                if (typingIndex < wishMessage.length) {
                    textElement.innerHTML += wishMessage.charAt(typingIndex);
                    typingIndex++;
                    setTimeout(type, 50); 
                } else { isTyping = false; }
            }
            type();
        }

        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("fullImage");
        function openModal(element) { modal.style.display = "block"; modalImg.src = element.src; }
        function closeModal() { modal.style.display = "none"; }

        // Background Animation
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        let particlesArray;
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); });
        class Particle {
            constructor(x, y, dX, dY, size, color) { this.x = x; this.y = y; this.dX = dX; this.dY = dY; this.size = size; this.color = color; }
            draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false); ctx.fillStyle = this.color; ctx.fill(); }
            update() {
                if (this.x > canvas.width || this.x < 0) this.dX = -this.dX;
                if (this.y > canvas.height || this.y < 0) this.dY = -this.dY;
                this.x += this.dX; this.y += this.dY; this.draw();
            }
        }
        function init() {
            particlesArray = [];
            let n = (canvas.height * canvas.width) / 9000;
            for (let i=0; i<n; i++) {
                let size = (Math.random()*3)+1;
                let x = (Math.random()*((innerWidth-size*2)-(size*2))+size*2);
                let y = (Math.random()*((innerHeight-size*2)-(size*2))+size*2);
                particlesArray.push(new Particle(x, y, (Math.random()*1)-0.5, (Math.random()*1)-0.5, size, 'rgba(255,255,255,0.8)'));
            }
        }
        function animate() {
            requestAnimationFrame(animate); ctx.clearRect(0,0,innerWidth, innerHeight);
            for (let i=0; i<particlesArray.length; i++) particlesArray[i].update();
            connect();
        }
        function connect() {
            for (let a=0; a<particlesArray.length; a++) {
                for (let b=a; b<particlesArray.length; b++) {
                    let d = ((particlesArray[a].x - particlesArray[b].x)**2) + ((particlesArray[a].y - particlesArray[b].y)**2);
                    if (d < (canvas.width/7)*(canvas.height/7)) {
                        ctx.strokeStyle = 'rgba(255,255,255,' + (1 - (d/20000)) + ')';
                        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
                    }
                }
            }
        }
        init(); animate();