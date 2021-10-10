enum NODE_TYPE {
  COMMENT = 8,
  TEXT_NODE = 3
}

class SkeletonClass {
  private target = document.body;
  private uselessElement = ['script'];
  private rectHeight = window.innerHeight;
  private targetTagList = ['div', 'p', 'span', 'li', 'a', 'header', 'footer'];
  private defaultBgColor = '#F6F8FA';
  private defaultColor = '#DCDCDC';
  constructor() {}

  generate() {
    this.target = document.querySelector('#root');
    document.body.style.background = '#fff';
    this.removeUselessElement(this.target);
    this.removeUselessNode(this.target);
    this.handleTextNode(this.target);
    this.renderSkeleton(this.target);
  }

  removeUselessElement(element: HTMLElement): void{
    if (!element.children.length) return;
    for (const child of element.children) {
      const { top } = child.getBoundingClientRect();
      if (
        this.isHideElement(child as HTMLElement)
        || top > this.rectHeight
        || this.uselessElement.includes(child.nodeName.toLowerCase())
      ) {
        child.remove();
        continue;
      }
      this.removeUselessElement(child as HTMLElement);
    }
  }

  removeUselessNode(element: ChildNode) {
    if (!element.childNodes.length) return;
    for (const node of element.childNodes) {
      if (node.nodeType === NODE_TYPE.COMMENT) {
        node.remove();
        continue;
      }
      this.removeUselessNode(node);
    }
  }

  handleTextNode(element: ChildNode) {
    if (
      element.childNodes.length <= 1
      && element.nodeName.toLowerCase() === 'span'
    ) {
      return;
    }
    element.childNodes.forEach(node => {
      if (
        node.nodeType === NODE_TYPE.TEXT_NODE
        && node.nodeValue.trim().length > 0
      ) {
        const span = document.createElement('span');
        span.innerText = node.nodeValue;
        node.parentNode.replaceChild(span, node);
      } else {
        this.handleTextNode(node);
      }
    })
  }

  renderSkeleton(element: HTMLElement) {
    Array.from(element.querySelectorAll(this.targetTagList.join(',')))
      .forEach(node => {
        const hasBg = 
          this.getComputeStyle(node, 'background-color') !== 'rgba(0, 0, 0, 0)'
          || this.getComputeStyle(node, 'background-image') !== 'none';
        if (hasBg) {
          this.renderBg(node as HTMLElement);
        }
        this.renderText(node);
      })
  }
  
  renderBg(element: HTMLElement) {
    element.style.background = this.defaultBgColor;
  }

  renderText(element: Element) {
    if (!this.isPureTextNode(element)) return;
    const rule = this.calculateRule(element);
    element.setAttribute('style', rule);
  }

  calculateRule(element: Element) {
    const style = this.getComputeStyle(element) as CSSStyleDeclaration;
    let rawLineHeight = style.lineHeight;
    if (!/\d/.test(rawLineHeight)) {
      const fontSizeNum = parseFloat(style.fontSize) || 14;
      rawLineHeight = `${fontSizeNum * 1.4}px`;
    }
    const lineHeight = parseFloat(rawLineHeight);
    const fontSize = parseFloat(style.fontSize);
    const textHeightRatio = fontSize / lineHeight    //字体占行高的比值
    const firstColorPoint = ((1 - textHeightRatio) / 2 * 100).toFixed(2) //渐变的第一个位置，小数点后两位四舍五入
    const secondColorPoint = (((1 - textHeightRatio) / 2 + textHeightRatio) * 100).toFixed(2); //渐变的第二个位置
    return `
      background-image: linear-gradient(
        transparent ${firstColorPoint}%, ${this.defaultColor} 0,
        ${this.defaultColor} ${secondColorPoint}%, transparent 0);
      color: transparent;
      background-size: 100% ${lineHeight}px;
      position: 'relative';
    `
  }

  isPureTextNode(element: Element): boolean {
    return element.childNodes
      && element.childNodes.length === 1
      && element.childNodes[0].nodeType === NODE_TYPE.TEXT_NODE
      && /\S/.test(element.childNodes[0].textContent)
  }

  isHideElement(element: HTMLElement): boolean {
    return (
      this.getComputeStyle(element, 'display') === 'none'
      || this.getComputeStyle(element, 'opacity') === '0'
      || this.getComputeStyle(element, 'visibility') === 'hidden'
      || element.hidden
    )
  }

  getComputeStyle(element: Element, name?: string): string | CSSStyleDeclaration {
    const style = window.getComputedStyle(element);
    return style[name] ? style[name] : style;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const skeleton = new SkeletonClass();
  skeleton.generate();
})