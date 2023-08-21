export const backtop = (container) => {
    // const container = proxy.$refs.mainbox;
    if (container) {
        scrollToTop(container)
    }

}


const scrollToTop = (el) => {
    if (!el) return;
    const duration = 1000; // 动画持续时间，单位为毫秒
    const start = el.scrollTop;
    const change = -start;
    let currentTime = 0;
    const increment = 20; // 每次动画更新的时间间隔，单位为毫秒
    function animateScroll() {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        el.scrollTop = val;
        if (currentTime < duration) {
            window.requestAnimationFrame(animateScroll);
        }
    }
    animateScroll();
}

const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return -c / 2 * (t * t * t - 2) + b;
}