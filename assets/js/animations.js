// Setup canvas
const canvas = document.getElementById('physicsCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// List of logos
const logos = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg' },
];

// Ball objects to represent logos
const balls = [];
const gravity = 0.5;
const friction = 0.95;

// Create images and initialize balls
logos.forEach((logo, index) => {
  const img = new Image();
  img.src = logo.src;

  img.onload = () => {
    balls.push({
      img: img,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height / 2,
      radius: 40,
      dx: (Math.random() - 0.5) * 4,
      dy: 0,
      isDragging: false,
    });
  };
});

// Track mouse state
let mouse = { x: 0, y: 0, isDown: false };

// Mouse events for dragging
canvas.addEventListener('mousedown', (e) => {
  mouse.isDown = true;
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  // Check if a ball is clicked
  balls.forEach((ball) => {
    if (
      mouse.x > ball.x - ball.radius &&
      mouse.x < ball.x + ball.radius &&
      mouse.y > ball.y - ball.radius &&
      mouse.y < ball.y + ball.radius
    ) {
      ball.isDragging = true;
    }
  });
});

canvas.addEventListener('mousemove', (e) => {
  if (mouse.isDown) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
});

canvas.addEventListener('mouseup', () => {
  mouse.isDown = false;
  balls.forEach((ball) => (ball.isDragging = false));
});

// Physics update
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    if (!ball.isDragging) {
      // Apply gravity
      ball.dy += gravity;
      ball.dy *= friction;
      ball.y += ball.dy;

      // Horizontal motion
      ball.x += ball.dx;
      ball.dx *= friction;

      // Floor collision
      if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.dy = -ball.dy * friction;
      }

      // Wall collision
      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
      }
    } else {
      // Follow mouse
      ball.x = mouse.x;
      ball.y = mouse.y;
    }

    // Draw the logo
    ctx.beginPath();
    ctx.drawImage(ball.img, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
    ctx.closePath();
  });

  requestAnimationFrame(update);
}

// Start the simulation
update();

// Button to reset ball positions
document.getElementById('fallButton').addEventListener('click', () => {
  balls.forEach((ball) => {
    ball.y = Math.random() * canvas.height / 2;
    ball.dy = 0;
  });
});
