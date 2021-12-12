import {throttleAndDebounce} from "./activeSidebarLink";
import {onMounted, ref} from "vue";

export const useAnchorActive = () => {
    const onScroll = throttleAndDebounce(setActiveAnchor,300)
    const current = ref(-1);
    function setActiveAnchor() {
        const navAnchors = getAnchors();
        const anchors = getHeaderAnchors(navAnchors);
        for (let i = 0; i < anchors.length; i++) {
            const anchor = anchors[i];
            current.value = isActiveAnchor(i,anchor,anchors[i + 1] ?? undefined)
            if (current.value >= 0) return current.value;
        }
    }
    onMounted(()=>{
        setActiveAnchor();
        window.addEventListener('scroll',onScroll);
    })
    return {
        current
    }
}

function getAnchors(){
    return [].slice.call(document.querySelectorAll('.anchor-link a.anchor-link-title'))
}

function getHeaderAnchors(anchors:HTMLAnchorElement[]):HTMLAnchorElement[]{
    // 获取所有的anchor的信息
    return [].slice.call(document.querySelectorAll('.header-anchor'))
        .filter((anchor:HTMLAnchorElement)=>anchors.some(myAnchor=>myAnchor.hash === anchor.hash));
}

function isActiveAnchor(index:number,anchor:HTMLAnchorElement,nextAnchor?:HTMLAnchorElement) {
    const scrollTop = window.scrollY + anchor.offsetHeight;
    const anchorTop = anchor.offsetTop;
    if (scrollTop < anchorTop){
        if (index === 0) return -1;
        return index - 1;
    }

    if (!nextAnchor || scrollTop < nextAnchor.offsetTop){
        // 下一个的值
        return index;
    }

    return -1;
}
