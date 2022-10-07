(function (doc, win) {
    const docEI = doc.documentElement;
    const resizeEvt = 'orientationchange' in window ? 'orientataionchange' : 'resize';
    const recalc = function () {
        const { clientWidth } = docEI;
        if (!clientWidth) return;
        // 100是字体大小，1536是开发时浏览器窗口的宽度，等比计算
        docEI.style.fontSize = `${100 * (clientWidth / 1536)}px`;
    }

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    console.log(docEI)
    doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window))
