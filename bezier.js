function drawBezier() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // Xóa canvas trước khi vẽ
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Lấy tọa độ từ input
    let points = [];
    for (let i = 0; i < 6; i++) {
        let x = Number(document.getElementById(`p${i}x`).value);
        let y = Number(document.getElementById(`p${i}y`).value);
        points.push({ x, y });
    }

    // Vẽ đường nối các điểm điều khiển (đường nét đứt)
    ctx.strokeStyle = "black";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.setLineDash([]); // Reset về nét liền

    // Vẽ các điểm điều khiển
    ctx.fillStyle = "red";
    for (let p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Vẽ đường Bezier
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    let t, x, y;
    for (t = 0; t <= 1; t += 0.01) {
        x = (1 - t) ** 5 * points[0].x +
            5 * (1 - t) ** 4 * t * points[1].x +
            10 * (1 - t) ** 3 * t ** 2 * points[2].x +
            10 * (1 - t) ** 2 * t ** 3 * points[3].x +
            5 * (1 - t) * t ** 4 * points[4].x +
            t ** 5 * points[5].x;

        y = (1 - t) ** 5 * points[0].y +
            5 * (1 - t) ** 4 * t * points[1].y +
            10 * (1 - t) ** 3 * t ** 2 * points[2].y +
            10 * (1 - t) ** 2 * t ** 3 * points[3].y +
            5 * (1 - t) * t ** 4 * points[4].y +
            t ** 5 * points[5].y;

        ctx.lineTo(x, y);
    }

    ctx.stroke();
}

// Vẽ đường cong ban đầu
drawBezier();
