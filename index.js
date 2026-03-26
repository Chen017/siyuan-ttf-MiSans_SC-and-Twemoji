module.exports = class F extends require('siyuan').Plugin {
    t = 'MiSans and Twemoji: ';
    s = document.createElement('style');

    onload() {
        fetch('../plugins/' + this.name + '/style.css')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load CSS file`);
                }
                return response.text();
            })
            .then(css => {
                this.s.id = 'snippetCSS-' + this.name; // id 以 snippetCSS 开头的 style 会被添加到导出 PDF 中 https://github.com/siyuan-note/siyuan/commit/4318aa446369eaf4ea85982ba4919b5d47340552 https://github.com/siyuan-note/siyuan/commit/0361599aba79a200c410aa9de5873da4a52b2667
                this.s.textContent = css;
                document.head.appendChild(this.s);

                setTimeout(() => {
                    if (!document.fonts || typeof document.fonts.load !== 'function') return;
                    try {
                        // 预加载 MiSans 的四种变体
                        document.fonts.load('400 16px "MiSans"', '1');
                        document.fonts.load('700 16px "MiSans"', '2');
                        document.fonts.load('italic 400 16px "MiSans"', '3');
                        document.fonts.load('italic 700 16px "MiSans"', '4');
                    } catch (_) {}
                    console.log(this.t + 'loaded');
                }, 0);
            })
            .catch(error => {
                console.error(this.t + error);
            });
    }

    onunload() {
        this.s?.remove();
        console.log(this.t + 'unloaded');
    }

    uninstall() {
        this.s?.remove();
        console.log(this.t + 'uninstall');
    }
}
